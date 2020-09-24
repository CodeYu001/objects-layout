import { defineConfig } from 'umi';

export default defineConfig({
  antd: {},
  dva: {},

  theme: {
    '@primary-color': '#EC5658',
  },

  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/search/:searchKey', component: '@/pages/search' },
    { component: '@/pages/404', title: '页面不存在耶' },
  ],
});
