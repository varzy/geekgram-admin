import Vue from 'vue';
import VueRouter from 'vue-router';
import _import from './importer';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Index',
    component: _import('Index')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
