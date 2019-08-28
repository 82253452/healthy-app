
// ref: https://umijs.org/config/
export default {
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
  proxy:{
    '/common/*':{
      target: 'http://localhost:8080',
      changeOrigin: true
    },
    '/article/*':{
      target: 'http://localhost:8080',
      changeOrigin: true
    },
    '/comment/*':{
      target: 'http://localhost:8080',
      changeOrigin: true
    }
  }
}
