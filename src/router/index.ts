import Vue from 'vue';
import VueRouter from 'vue-router';
import _import from './importer';
import Home from '@/views/layouts/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Index',
    component: _import('Index')
  },
  {
    path: '/dashboard',
    component: Home,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: _import('Index')
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
