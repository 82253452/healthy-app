// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  "define": {
    "process.env.apiUrl": 'https://zhihuizhan.net/api',
  },
  history: 'hash',
  hash: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: false,
      dva: false,
      dynamicImport: false,
      title: 'my-app',
      dll: false,

      routes: {
        exclude: [
          /components\//,
        ],
      },
    }],
  ],
  proxy: {
    '/common/*': {
      target: 'https://zhihuizhan.net/api',
      changeOrigin: true,
    },
    '/article/*': {
      target: 'https://zhihuizhan.net/api',
      changeOrigin: true,
    },
    '/comment/*': {
      target: 'https://zhihuizhan.net/api',
      changeOrigin: true,
    },
    '/address/*': {
      target: 'https://zhihuizhan.net/api',
      changeOrigin: true,
    },
    '/classify/*': {
      target: 'https://zhihuizhan.net/api',
      changeOrigin: true,
    },
    '/shop/*': {
      target: 'https://zhihuizhan.net/api',
      changeOrigin: true,
    },
    '/user/*': {
      target: 'https://zhihuizhan.net/api',
      changeOrigin: true,
    },
    '/privilege/*': {
      target: 'https://zhihuizhan.net/api',
      changeOrigin: true,
    },
  },
};
