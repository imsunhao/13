import Vue from 'vue';
Vue.config.productionTip = true;

import VueX from 'vuex';
Vue.use(VueX);
import VueXConfig from './config/VueX';

import {
  Form,
  FormItem,
  MessageBox,
  Loading,
  Row,
  Notification,
  Message,
} from 'element-ui';

Vue.use(Form);
Vue.use(Row);
Vue.use(FormItem);
Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

import { sync } from 'vuex-router-sync';
import App from './App.vue';
import router from './router';
const store = new VueX.Store(VueXConfig);
sync(store, router);

import Mutations from './config/Mutations/M_APP';
import { MutationsMethods } from './config/Mutations';
import { publicMethods } from './config/Tools';

export default new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App},
  computed: {
    ...VueX.mapState(['http', 'user', 'data']),
  },
  methods: {
    ...MutationsMethods(Mutations),
    ...publicMethods(),
  },
});
