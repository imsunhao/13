<template>
  <el-row class="login">
    <ul :class="[{ loading: loading }, 'bg-bubbles']">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
    <div class="container">
      <transition name="fade" mode="out-in">
        <div v-if="show" class="inner">
          <h1>尚赫装箱明细表</h1>
          <p class="version"><span>--</span>乐速科技<span>--</span></p>
          <div class="form">
            <transition name="wifi">
              <div class="warning" v-if="errorTip">
                <i class="el-icon-circle-cross"></i>
                <div class="folt">
                  <p>未能获取到单号信息</p>
                  <p>请关闭本页</p>
                  <p>再次扫描二维码</p>
                </div>
              </div>
            </transition>
            <transition name="wifi">
              <el-form
                v-if="wifi"
                key="main"
                :model="form"
                ref="ref_form"
                :rules="rule.form">
                <el-form-item prop="Code">
                  <input v-model="form.Code" placeholder="CODE" tabindex="2" autocomplete="off">
                </el-form-item>
                <button id="login-button" @click.prevent="login" :disabled="!show" tabindex="3">登陆</button>
              </el-form>
            </transition>
          </div>
        </div>
      </transition>
    </div>
  </el-row>
</template>

<script>
  import {mapState} from 'vuex';
  import {speckText, publicMethods} from 'Tools';
  import CONFIG from '~';

  const {
    Validate,
    MutationsMethods,
  } = CONFIG('Login');

  export default {
    name: 'login',
    beforeRouteUpdate (to, from, next) {
      this.checkUser();
    },
    data () {
      return {
        wifi: false,
        errorTip: false,
        rule: Validate,
        loading: false,
        show: false,
        form: {
          id: '',
          Code: '',
        },
      };
    },
    computed: {
      ...mapState(['http', 'user']),
    },
    mounted () {
      this.checkUser();
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'checkUser()',
    },
    methods: {
      login () {
        this.$refs['ref_form'].validate(valid => {
          if (valid) {
            let loading = this.$loading({
              text: '登陆中...',
              customClass: 'loginLoading',
              fullscreen: true,
            });
            this.p('/GetCkLst', {
              ...this.form,
            }, {
              s: response => {
                this.f(1, response.data);
                this.f(2, this.form);
                this.$router.push({path: '/wms'});
                this.loading = true;
                this.show = false;
                setTimeout(() => {
                  this.wifi = false;
                }, 500);
              },
              show: true,
              loading,
            });
          } else {
            return false;
          }
        });
      },
      checkUser () {
        if (this.$route.params.code !== '0') {
          this.init();
        } else {
          this.show = true;
          setTimeout(() => {
            this.errorTip = true;
          }, 500);
          speckText('未能获取到单号信息,请关闭本页，再次扫描二维码！');
        }
      },
      init () {
        this.show = true;
        setTimeout(() => {
          this.wifi = true;
        }, 500);
        this.form.id = this.$route.params.code;
        speckText('欢迎使用乐速科技WMS 4.0');
        this.f(0, {
          ...this.http,
          url: this.http.projectName[this.$route.params.place],
        });
        this.f(1, {});
      },
      ...MutationsMethods,
      ...publicMethods(),
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-weight: 300;
  }

  body {
    font-family: 'Source Sans Pro', sans-serif;
    color: white;
    font-weight: 300;
    ::-webkit-input-placeholder {
      /* WebKit browsers */
      font-family: 'Source Sans Pro', sans-serif;
      color: white;
      font-weight: 300;
    }
    :-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      font-family: 'Source Sans Pro', sans-serif;
      color: white;
      opacity: 1;
      font-weight: 300;
    }
    ::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      font-family: 'Source Sans Pro', sans-serif;
      color: white;
      opacity: 1;
      font-weight: 300;
    }
    :-ms-input-placeholder {
      /* Internet Explorer 10+ */
      font-family: 'Source Sans Pro', sans-serif;
      color: white;
      font-weight: 300;
    }
  }

  .login {
    height: 100vh;
    background: #50a3a2;
    background: linear-gradient(to bottom right, #50a3a2 0%, #53e3a6 100%);
  }

  .login.form-success .container h1 {
    -webkit-transform: translateY(85px);
    -ms-transform: translateY(85px);
    transform: translateY(85px);
  }

  .container {
    opacity: 0.8;
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    margin-top: -200px;
    overflow: hidden;
    perspective: 2000px;

    padding: 80px 0;
    height: 400px;
    text-align: center;

    .inner {
      max-width: 600px;
      margin: 0 auto;
      h1 {
        font-size: 40px;
        -webkit-transition-duration: 1s;
        transition-duration: 1s;
        -webkit-transition-timing-function: ease-in-put;
        transition-timing-function: ease-in-put;
        font-weight: 200;
      }

      button {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        outline: 0;
        background-color: white;
        border: 0;
        padding: 10px 15px;
        color: #53e3a6;
        border-radius: 3px;
        width: 250px;
        cursor: pointer;
        font-size: 18px;
        -webkit-transition-duration: 0.25s;
        transition-duration: 0.25s;
      }
      button:hover {
        background-color: #f5f7f9;
      }
    }
  }

  .form {
    width: 360px;
    margin: 0 auto;
    padding: 20px 0;
    position: relative;
    z-index: 2;
    min-height: 190px;
    input {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      outline: 0;
      border: 1px solid rgba(255, 255, 255, 0.4);
      background-color: rgba(255, 255, 255, 0.2);
      width: 250px;
      border-radius: 3px;
      padding: 10px 15px;
      margin: 0 auto 10px auto;
      display: block;
      text-align: center;
      font-size: 18px;
      color: white;
      -webkit-transition-duration: 0.25s;
      transition-duration: 0.25s;
      font-weight: 300;
    }
    input:hover {
      background-color: rgba(255, 255, 255, 0.4);
    }
    input:focus {
      background-color: white;
      width: 300px;
      color: #53e3a6;
    }
    .is-error {
      input {
        border: 1px solid rgba(238, 53, 42, 0.4);
        background-color: rgba(238, 53, 42, 0.2);
      }
      input:focus {
        border: 1px solid rgba(238, 53, 42, 0.4);
        background-color: rgba(238, 53, 42, 0.2);
      }
    }

    .warning{
      position: relative;
      i{
        left: calc(50% - 6rem);
        top: 50%;
        transform: translate(-50%,-50%);
        position: absolute;
        font-size: 1.5rem;
        color: #d35e56;
      }
    }
  }

  .bg-bubbles {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    li {
    /*border-radius: 50%;*/
    background-image: none;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    position: absolute;
    list-style: none;
    display: block;
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.15);
    transition: 1s;
    transition-timing-function: linear;
    &:nth-child(2n) {
      bottom: -200px;
      animation: square 25s infinite;

    }
    &:nth-child(2n+1) {
      top: -200px;
      animation: square2 25s infinite;
    }
    &:nth-child(1) {
      left: 10%;
    }
    &:nth-child(2) {
      left: 20%;
      width: 80px;
      height: 80px;
      -webkit-animation-delay: 2s;
      animation-delay: 2s;
      -webkit-animation-duration: 17s;
      animation-duration: 17s;
    }
    &:nth-child(3) {
      left: 25%;
      -webkit-animation-delay: 4s;
      animation-delay: 4s;
    }
    &:nth-child(4) {
      left: 40%;
      width: 60px;
      height: 60px;
      -webkit-animation-duration: 22s;
      animation-duration: 22s;
      background-color: rgba(255, 255, 255, 0.25);
    }
    &:nth-child(5) {
      left: 70%;
    }
    &:nth-child(6) {
      left: 80%;
      width: 120px;
      height: 120px;
      -webkit-animation-delay: 3s;
      animation-delay: 3s;
      background-color: rgba(255, 255, 255, 0.2);
    }
    &:nth-child(7) {
      left: 32%;
      width: 160px;
      height: 160px;
      -webkit-animation-delay: 7s;
      animation-delay: 7s;
    }
    &:nth-child(8) {
      left: 55%;
      width: 20px;
      height: 20px;
      -webkit-animation-delay: 15s;
      animation-delay: 15s;
      -webkit-animation-duration: 40s;
      animation-duration: 40s;
    }
    &:nth-child(9) {
      left: 25%;
      width: 10px;
      height: 10px;
      -webkit-animation-delay: 2s;
      animation-delay: 2s;
      -webkit-animation-duration: 40s;
      animation-duration: 40s;
      background-color: rgba(255, 255, 255, 0.3);
    }
    &:nth-child(10) {
      left: 90%;
      width: 160px;
      height: 160px;
      -webkit-animation-delay: 11s;
      animation-delay: 11s;
    }
  }
  }

  .login .loading li {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    animation: none;
    &:nth-child(7) {
      animation: loading 1.5s forwards;
      /*background-image: url('../assets/logo.png');*/
    }
  }

  @keyframes loading {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.5);
    }
    80% {
      opacity: 0;
      border-radius: 50%;
      transform: translate(-50%, -50%) scale(0.01);
    }
    100% {
      opacity: 1;
      border-radius: 50%;
      transform: translate(-50%, -50%) scale(10);
    }
  }

  @keyframes square2 {
    0% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
    50% {
      -webkit-transform: translateY(1200px) rotate(600deg);
      transform: translateY(1200px) rotate(600deg);
    }
    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
  }

  @keyframes square {
    0% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
    50% {
      -webkit-transform: translateY(-1200px) rotate(600deg);
      transform: translateY(-1200px) rotate(600deg);
    }
    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
  }

  .fade-enter-active {
    transition: opacity .5s
  }

  .fade-enter /* .fade-leave-active in <2.1.8 */
  {
    opacity: 0
  }

  .fade-enter-to /* .fade-leave-active in <2.1.8 */
  {
    opacity: 1
  }

  .fade-leave-active {
    transition: 1s;
    transform-origin: bottom;
  }

  .fade-leave-to {
    animation: fade-leave 1.5s forwards;
  }

  .wifi-enter-active, .wifi-leave-active {
    position: absolute;
    width: 360px;
    transition: 2s;
  }

  .wifi-enter-active {
    opacity: 0;
  }

  .wifi-leave-active {
    opacity: 1;
  }

  .wifi-enter-to, .wifi-leave-to {
    animation: wifi-enter 1.5s forwards;
    opacity: 1;
  }

  .wifi-leave-to {
    animation: wifi-leave 1.5s forwards;
    opacity: 0;
  }

  @keyframes wifi-enter {
    0% {
      transform: rotateY(-180deg);
    }
    60% {
      transform: rotateY(1120deg);
    }
    70% {
      transform: rotateY(1060deg);
    }
    80% {
      transform: rotateY(1100deg);
    }
    90% {
      transform: rotateY(1075deg);
    }
    100% {
      transform: rotateY(1080deg);
    }
  }

  @keyframes wifi-leave {
    0% {
      transform: rotateY(0deg);
    }
    60% {
      transform: rotateY(1300deg);
    }
    70% {
      transform: rotateY(1240deg);
    }
    80% {
      transform: rotateY(1280deg);
    }
    90% {
      transform: rotateY(1255deg);
    }
    100% {
      transform: rotateY(1260deg);
    }
  }

  @keyframes fade-leave {
    0% {
      transform: rotateX(0deg) translateY(0px);
    }
    80% {
      transform: rotateX(60deg) translateY(0px);
    }
    100% {
      transform: rotateX(60deg) translateY(-600px);
    }
  }

  .version {
    color: #e4e4e4;
    font-size: 1em;
    text-align: center;
    margin-top: 15px;
    span {
      margin: 0 5px;
    }
  }

</style>
