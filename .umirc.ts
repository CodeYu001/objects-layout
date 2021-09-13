import { defineConfig } from 'umi';
import { Logo } from './src/configs';

export default defineConfig({
  antd: {},
  dva: {},

  theme: {
    '@primary-color': '#25b864',
  },

  nodeModulesTransform: {
    type: 'none',
  },

  links: [
    {
      rel: 'icon',
      href: Logo,
      type: 'image/x-icon',
    },
  ],
  hash: true,

  routes: [
    {
      path: '/',
      component: '@/layouts/main',
      routes: [
        { path: '/', redirect: '/index' },
        {
          path: '/search/:searchKey',
          component: '@/pages/search',
          title: '彼岸阁 - 记录美好生活',
        },
        {
          path: '/classify/:idClassify/:current',
          component: '@/pages/classify',
          title: '彼岸阁 - 记录美好生活',
        },
        {
          path: '/classify/:idClassify',
          component: '@/pages/classify',
          title: '彼岸阁 - 记录美好生活',
        },
        {
          path: '/search/:searchKey/:current',
          component: '@/pages/search',
          title: '彼岸阁 - 记录美好生活',
        },
        {
          path: '/index',
          component: '@/pages/index',
          title: '彼岸阁 - 记录美好生活',
        },
        {
          path: '/index/:current',
          component: '@/pages/index',
          title: '彼岸阁 - 记录美好生活',
        },
        {
          path: '/detail/:id',
          component: '@/pages/detail',
          title: '彼岸阁 - 详情页',
        },
        {
          path: '/contact',
          component: '@/pages/contact',
          title: '联络方式 - 彼岸阁',
        },
        {
          path: '/badRequest',
          component: '@/pages/badRequest',
          title: '非法参数 - 彼岸阁',
        },
        { component: '@/pages/404', title: '页面不存在耶' },
      ],
    },
  ],
});
