import { defineConfig } from '@umijs/max';

export default defineConfig({
  outputPath: '../custom_components/bookmark/www/',
  base: '',
  publicPath: '/bookmark-www/',
  history: {
    type: 'hash',
  },
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  routes: [
    {
      name: '首页',
      path: '/',
      component: './Home',
    }
  ],
  npmClient: 'pnpm',
});

