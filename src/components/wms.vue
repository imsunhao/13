<template>
  <div class="data">
    <h2>尚赫保健品有限公司</h2>
    <el-form labelWidth="70px"
             ref="form"
             label-position="right"
             class="demo-table-expand">
      <el-form-item label="订单号">
        <span>{{ data.bh }}</span>
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
      <el-form-item label="整箱">
        <el-table
          :data="table1"
          row-key="hpbh"
          border>
          <el-table-column
            label="商品编号"
            min-width="100px"
            align="center"
            prop="hpbh">
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
            label="范围"
            min-width="160px"
            align="center">
            <template scope="s">
              第{{s.row.fw1}}箱{{s.row.fw2==s.row.fw1?'':'-第'+s.row.fw2+'箱'}}
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="散箱">
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
      <el-form-item label="合计">
        <span>共{{ data.sxs + data.zxs }}箱，其中整箱（共{{data.zxs}}箱）散箱（共{{data.sxs}}箱）</span>
      </el-form-item>
      <el-form-item label="评价我们">
        <el-rate
          v-model="pj"
          show-text>
        </el-rate>
      </el-form-item>
      <el-form-item label="联系我们">

      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import Vue from 'vue';
  import App from '../main';
  import { mapState } from 'vuex';

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
  Vue.use(Tag);
  Vue.use(Icon);
  Vue.use(Col);
  Vue.use(Rate);

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
      console.log(App.data);
      if (!App.data || App.data === null) {
        next({path: '/login/0'});
      } else next();
    },
    name: 'wms',
    data () {
      return {
        'id': 1231,
        'pj': 3,
        'tqm': 3321,
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
      console.log(this.$refs.form.$el.querySelectorAll('.el-table'));
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

  }

</style>
