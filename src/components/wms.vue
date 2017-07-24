<template>
  <div class="data">
    <h2>尚赫保健品有限公司</h2>
    <el-form labelWidth="70px"
             ref="form"
             label-position="right"
             class="demo-table-expand">
      <el-form-item label="订单号">
        <el-tag type="success">{{ data.bh }}</el-tag>
      </el-form-item>
      <el-form-item label="发货方式">
        <span> 佳怡尚赫沈阳仓 </span>
      </el-form-item>
      <el-form-item label="收货地址">
        <span>{{ data.dz }}</span>
      </el-form-item>
      <el-form-item label="收货人">
        <span>{{ data.lxr }}</span>
      </el-form-item>
      <el-form-item label="联系电话">
        <span>{{ data.tel == null ? '暂无' : data.tel }}</span>
      </el-form-item>
      <el-form-item label="整箱详情">
        <el-table
          :data="table1"
          row-key="hpbh"
          border>
          <el-table-column
            label="范围"
            min-width="160px"
            align="center">
            <template scope="s">
              第{{s.row.fw1}}箱{{s.row.fw2 == s.row.fw1 ? '' : '-第' + s.row.fw2 + '箱'}}
            </template>
          </el-table-column>
          <el-table-column
            label="商品名称"
            min-width="200px"
            align="center"
            prop="mc">
          </el-table-column>
          <el-table-column
            label="箱数"
            min-width="80px"
            align="center"
            prop="sl">
          </el-table-column>
          <el-table-column
            label="商品编号"
            min-width="100px"
            align="center"
            prop="hpbh">
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="整箱数量">
        <span>共 {{data.zxs}} 箱</span>
      </el-form-item>
      <el-form-item label="散箱详情">
        <el-table
          :data="table2"
          row-key="hpbh"
          border>
          <el-table-column
            label="箱号"
            min-width="80px"
            align="center">
            <template scope="s">
              第{{s.row.fw1}}箱
            </template>
          </el-table-column>
          <el-table-column
            label="商品名称"
            min-width="200px"
            align="center"
            prop="mc">
          </el-table-column>
          <el-table-column
            label="装箱量"
            min-width="80px"
            align="center"
            prop="sl">
          </el-table-column>
          <el-table-column
            label="商品编号"
            min-width="100px"
            align="center"
            prop="hpbh">
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="散箱数量">
        <span>共 {{data.sxs}} 箱</span>
      </el-form-item>
      <el-form-item label="合计数量">
        <span>共 {{ data.sxs + data.zxs }} 箱</span>
      </el-form-item>
      <el-form-item label="友情提示">
        <span>请您仔细查看货物外包装是否完好，并核对实际件数及产品数量。</span>
      </el-form-item>
      <el-form-item label="联系我们">
        <el-button type="text" @click="dialogVisible=true">对货品有疑问？</el-button>
      </el-form-item>
      <div class="wifi">
        <transition name="wifi" mode="out-in">
          <div v-if="!PJ" :key="1" class="pingjia pingjia-ok">
            <el-form-item label="评价我们">
              <el-rate
                v-model="pj"
                :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                show-text>
              </el-rate>
            </el-form-item>
            <el-form-item label="留言我们">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 2}"
                placeholder="请输入内容"
                v-model="tqm">
              </el-input>
            </el-form-item>
            <el-button class="submit" type="primary" @click="PJ=!PJ" :loading="loading">提交</el-button>
          </div>
          <div v-if="PJ" :key="2" class="pingjia pingjia-no">
            <el-button class="submit" type="success" @click="PJ=!PJ">感谢您的评价！</el-button>
          </div>
        </transition>
      </div>
    </el-form>
    <el-dialog
      :modal="false"
      title="我们的联系方式"
      size="large"
      :visible.sync="dialogVisible">
      <el-form labelWidth="80px"
               ref="form"
               label-position="right">
        <el-form-item label="客服电话1">
          <a href="tel:024-25955420"> 024-25955420 </a>
        </el-form-item>
        <el-form-item label="客服电话2">
          <a href="tel:024-25955423"> 024-25955423 </a>
        </el-form-item>
        <el-form-item label="客服电话3">
          <a href="tel:024-25955310"> 024-25955310 </a>
        </el-form-item>
        <el-form-item label="客服电话4">
          <a href="tel:024-25955312"> 024-25955312 </a>
        </el-form-item>
        <el-form-item label="配送微信">
          <span>shsyrdc</span>
          <img src="../assets/erweima.jpg" width="80%" alt="shsyrdc">
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import Vue from 'vue';
  import App from '../main';
  import {mapState} from 'vuex';

  import {
    Input,
    Button,
    Table,
    TableColumn,
    Tag,
    Icon,
    Rate,
    Dialog,
  } from 'element-ui';

  Vue.use(Input);
  Vue.use(Button);
  Vue.use(Table);
  Vue.use(TableColumn);
  Vue.use(Tag);
  Vue.use(Icon);
  Vue.use(Rate);
  Vue.use(Dialog);

  function check (step, item) {
    for (let i of step) {
      if (i.hpbh === item.hpbh) {
        return i;
      }
    }
    return false;
  }

  export default {
    beforeRouteEnter (to, from, next) {
      if (!App.data || App.data === null) {
        next({path: '/login/0'});
      } else next();
    },
    name: 'wms',
    data () {
      return {
        PJ: false,
        dialogVisible: false,
        loading: false,
        'id': 1231,
        'pj': 3,
        'tqm': '',
      };
    },
    computed: {
      ...mapState(['data', 'user']),
      table1 () {
        let step = [];
        for (let item of this.data.zxData) {
          let i = check(step, item);
          if (i) {
            i.sl++;
            i.fw2++;
          } else {
            let json = JSON.stringify(item);
            json = JSON.parse(json);
            json.fw1 = item.xh;
            json.fw2 = item.xh;
            json.sl = 1;
            step.push(json);
          }
        }
        return step;
      },
      table2 () {
        let step = [];
        for (let item of this.data.sxData) {
          let json = JSON.stringify(item);
          json = JSON.parse(json);
          json.fw1 = item.xh;
          step.push(json);
        }
        return step;
      },
    },
    mounted () {
      this.PJ = this.data.pj;
      this.clickFun();
    },
    methods: {
      clickFun () {
        this.getDom().forEach(div => {
          div.parentElement.parentElement.classList['add']('table_form');
        });
      },
      getDom () {
        return Array.from(this.$refs.form.$el.querySelectorAll('.el-table'));
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .data {
    background-color: #fbfdff;
    h2 {
      text-align: center;
    }

    .demo-table-expand {
      width: 90%;
      margin: 0 auto;
      .el-form-item {
        margin-bottom: 5px;
      }
    }

    .el-rate {
      margin-top: 8px;
    }
    .wifi {
      height: 141px;
      overflow: hidden;

      .pingjia {
        .submit {
          margin-left: 20%;
          width: 60%;
          margin-bottom: 5px;
        }
      }
      .pingjia-ok {
      }
      .pingjia-no {
        .submit {
          margin-left: 20%;
          width: 60%;
          margin-bottom: 56px;
          margin-top: 56px;
        }
      }
    }
  }

  .wifi-enter-active, .wifi-leave-active {
    transition: .5s;
  }

  .wifi-enter-active {
    opacity: 0;
  }

  .wifi-leave-active {
    opacity: 1;
  }

  .wifi-enter-to, .wifi-leave-to {
    animation: wifi-enter .5s forwards;
    transform-origin:100%;
    opacity: 1;
  }

  .wifi-leave-to {
    animation: wifi-leave .5s forwards;
    transform-origin:100% 100%;
    opacity: 0;
  }

  @keyframes wifi-enter {
    0% {
      transform: rotate(-90deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes wifi-leave {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(90deg);
    }
  }


</style>
