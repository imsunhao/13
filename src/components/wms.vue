<template>
  <el-row
    v-else
    v-loading="loading"
    element-loading-text="拼命加载中">
    <error-comp v-if="error" :title="'asdgsd'"></error-comp>
    <h1>Hello App!
      <button @click="signOut">退出系统</button>
    </h1>
  </el-row>
</template>

<script>
  import { speckText } from '../config/Tools';
  import Vue from 'vue';
  import App from '../main';

  import {
    Input,
    InputNumber,
    Radio,
    RadioButton,
    Switch,
    Select,
    Option,
    Button,
    Table,
    TableColumn,
    Popover,
    Tooltip,
    Tag,
    Icon,
    Col,
    Rate,
  } from 'element-ui';

  Vue.use(Input);
  Vue.use(InputNumber);
  Vue.use(Radio);
  Vue.use(RadioButton);
  Vue.use(Switch);
  Vue.use(Select);
  Vue.use(Option);
  Vue.use(Button);
  Vue.use(Table);
  Vue.use(TableColumn);
  Vue.use(Popover);
  Vue.use(Tooltip);
  Vue.use(Icon);
  Vue.use(Col);
  Vue.use(Rate);

  export default {
    name: 'wms',
    beforeRouteEnter (to, from, next) {
      if (to.matched.some(record => record.meta.requiresAuth)) {
        let nickname = App.user.nickname;
        if (typeof nickname === 'undefined' || nickname === '') {
          App.p('/users/Login', {}, {
            s: response => {
              App.f(0, response.body.data);
              speckText(`欢迎回来! ${App.user.role}-${App.user.nickname}!`);
              next();
            },
            e: () => {
              next({path: '/login/1'});
            },
            show: true,
            type: 'warning',
          });
        } else {
          speckText(`欢迎 ${App.user.role}-${App.user.nickname}!`);
          setTimeout(() => {
            console.log('页面加载完成!\n等待上一个页面动画完成中...');
            next();
          }, 1500);
        }
      } else {
        next();
      }
    },
    data () {
      return {
        loading: false,
        error: false,
        ws: '',
      };
    },
    methods: {
      signOut () {
        this.$http.post('/users/logout')
        .then(response => {
          if (response.body.status < 10000) {
            this.$router.push({path: '/login/1'});
            console.log('用户退出！');
          }
        });
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  
  /* 设置 router-view 动画特效*/
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  
  .slide-fade-leave-active {
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  
  .slide-fade-enter {
    transform: translateX(10px);
    opacity: 0;
  }
  
  .slide-fade-leave-to {
    transform: translateX(-10px);
    opacity: 0;
  }
  
</style>
