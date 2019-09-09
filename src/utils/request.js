/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import router from 'umi/router';
import {isMobile} from '@/utils/utils'

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/**
 * 异常处理程序
 */

const errorHandler = error => {
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    console.error(errorText);
    console.error(status);
    console.error(url);
  }

  return response;
};
/**
 * 配置request请求时的默认参数
 */

const request = extend({
  errorHandler,
  // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

// 中间件，对请求前、响应后做处理
request.use(async (ctx, next) => {
  const { req } = ctx;
  const { url, options } = req;
  ctx.req.url = `${process.env.apiUrl}${url}`;
  ctx.req.options = {
    ...options,
    headers: {
      'TOKEN': localStorage.getItem('TOKEN'),
    },
  };
  await next();

  const { res } = ctx;
  const { success = false, code = 0 } = res; // 假设返回结果为 : { success: false, errorCode: 'B001' }
  if (!success) {
    if (code === 100) {
      const item = localStorage.getItem('TOKEN');
      if (!item) {
        if (isMobile()) {
          window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4ff80217b55375b5&redirect_uri=https%3A%2F%2Fzhihuizhan.net&response_type=code&scope=snsapi_userinfo&state=STATE&component_appid=wx45a4a88f12821319&connect_redirect=1#wechat_redirect';
          // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx91fad2501e704f40&redirect_uri=http://admin.wokanjian.com.cn/admin&response_type=code&scope=snsapi_base&state=STATE&component_appid=wxaef3251ba28a0c89#wechat_redirect';
          // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=https%3A%2F%2Fhealthy.zhihuizhan.net%2Findex.html&response_type=code&scope=snsapi_base&state=STATE&component_appid=wx2b1b9aa4f2e422c4#wechat_redirect';
        } else {
          // router.push('/pc/login')
          localStorage.setItem('TOKEN', 'eyJhbGciOiJIUzM4NCJ9.eyJuaWNrTmFtZSI6IumJtOWuojUwMTgiLCJvbGRVc2VySWQiOiIxIiwibW9iaWxlIjoiMTIzMTIzIiwiYXZhdGFyIjoiMTIzIiwidXNlcklkIjoiMSIsImp0aSI6IjJiYjQ4ZDJhN2U5ZTRhMmFhMWE2ZTQzMjUyMzM5NDAzIiwiZXhwIjoxODgyNjE2Mjc2LCJpYXQiOjE1NjY5OTcwNzYsIm5iZiI6MTU2Njk5NzA3Nn0.KsRyNZm9ryO0V7vQL9pZSh9b1D4OYyhdxIFccJuaC4aT-wteW6A0UIRp1D5mtb7F');
        }
        // window.location.href='https://open.weixin.qq.com/connect/qrconnect?appid=wx91fad2501e704f40&redirect_uri=ttp://admin.wokanjian.com.cn/admin&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect';
      }
    }
    // 对异常情况做对应处理
  }
});
export default request;
