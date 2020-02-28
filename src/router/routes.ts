import { RouteConfig } from 'vue-router';
import Home from '@/views/layouts/Home.vue';
import _import from './importer';

interface ICustomRouteConfig extends RouteConfig {
  children?: ICustomRouteConfig[];
  meta?: {
    title?: string;
    icon?: string;
  };
}

const routes: ICustomRouteConfig[] = [
  {
    path: '/',
    name: 'Index',
    redirect: { name: 'DashboardIndex' }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    redirect: { name: 'DashboardIndex' },
    component: Home,
    children: [
      {
        path: 'index',
        name: 'DashboardIndex',
        component: _import('dashboard/Index'),
        meta: { title: '仪表盘' }
      }
    ]
  },
  {
    path: '/post',
    name: 'Post',
    redirect: { name: 'PostIndex' },
    component: Home,
    children: [
      {
        path: 'index',
        name: 'PostIndex',
        component: _import('post/Index'),
        meta: { title: '帖子管理' }
      }
    ]
  },
  {
    path: '/category',
    name: 'Category',
    redirect: { name: 'CategoryIndex' },
    component: Home,
    children: [
      {
        path: 'index',
        name: 'CategoryIndex',
        component: _import('category/Index'),
        meta: { title: '分类管理' }
      }
    ]
  },
  {
    path: '/tag',
    name: 'Tag',
    redirect: { name: 'TagIndex' },
    component: Home,
    children: [
      {
        path: 'index',
        name: 'TagIndex',
        component: _import('tag/Index'),
        meta: { title: '标签管理' }
      }
    ]
  }
];

export default routes;
