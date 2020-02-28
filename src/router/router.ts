import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';

// @FIXME: 详见讨论 <https://github.com/vuejs/vue-router/issues/2881>
// 由于 ElementUI 中“可能”使用了 vue-router 中的 push 方法，比如面包屑导航栏，因此我们无法处理所有的异常，只能使
// 用这种临时方案
// 除了这种解决方案，也可以将 vue-router 降级为 3.0.7 版本
const originalPush = Router.prototype.push;
// @ts-ignore
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  // @ts-ignore
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
