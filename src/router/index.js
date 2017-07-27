import Vue from 'vue';
import Router from 'vue-router';
import Resource from 'vue-resource';

import LoadingComp from '@/components/0_static/LoadingComp.vue';
import ErrorComp from '@/components/0_static/ErrorComp.vue';
import {time} from '../config/Loading';

Vue.use(Router);
Vue.use(Resource);

const Route = () => ({
  component: import('@/components/Route.vue'),
  loading: LoadingComp,
  error: ErrorComp,
  delay: time.delay,
  timeout: time.timeout,
});

const Login = () => ({
  component: import('@/components/Login.vue'),
  loading: LoadingComp,
  error: ErrorComp,
  delay: time.delay,
  timeout: time.timeout,
});

const Main = () => ({
  component: import('@/components/wms.vue'),
  loading: LoadingComp,
  error: ErrorComp,
  delay: time.delay,
  timeout: time.timeout,
});

export default new Router({
  routes: [
    {
      path: '/',
      component: Route,
    },
    {
      path: '/login/:code/:place',
      component: Login,
    },
    {
      path: '/wms',
      component: Main,
      meta: { requiresAuth: true },
    },
  ],
});
