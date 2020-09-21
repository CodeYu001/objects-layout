import { defineConfig } from 'umi';

export default defineConfig({
  antd: {},
  dva: {},
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { component: '@/pages/404', title: '页面不存在耶' },
  ],
});
