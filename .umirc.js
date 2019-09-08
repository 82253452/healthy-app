// ref: https://umijs.org/config/
export default {
  base: 'http://localhost:8080',
  treeShaking: true,
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
      target: 'http://localhost:8080',
      changeOrigin: true,
    },
    '/article/*': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    },
    '/comment/*': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    },
    '/address/*': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    },
    '/classify/*': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    },
    '/shop/*': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    },
    '/user/*': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    },
    '/privilege/*': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    },
  },
};
