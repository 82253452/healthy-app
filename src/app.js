import { UrlSearch } from '@/utils/utils';
import { login } from '@/api/user';

export function render(oldRender) {
  const code = UrlSearch('code');
  const appId = UrlSearch('appid');
  if (code && appId) {
    login({ code: code, appId: appId }).then(data=>{
     data.data&&data.data.token&&localStorage.setItem('TOKEN', data.data.token);
    });
  }
  // let isMobile = false;
  // if (/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))) {
  //   try {
  //     if (/Android|Windows Phone|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
  //       console.log('手机端网址');
  //       isMobile = true;
  //     } else if (/iPad/i.test(navigator.userAgent)) {
  //       console.log('pad网址');
  //     } else {
  //       console.log('PC端网址');
  //     }
  //   } catch (e) {
  //     console.log('catch');
  //   }
  // }
  // const item = localStorage.getItem('TOKEN');
  // if (!item) {
  //   if(isMobile){
  //     // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx91fad2501e704f40&redirect_uri=http://admin.wokanjian.com.cn/admin&response_type=code&scope=snsapi_base&state=STATE&component_appid=wxaef3251ba28a0c89#wechat_redirect';
  //     window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=https%3A%2F%2Fhealthy.zhihuizhan.net%2Findex.html&response_type=code&scope=snsapi_base&state=STATE&component_appid=wx2b1b9aa4f2e422c4#wechat_redirect';
  //
  //   }else{
  //     // window.location.href='https://open.weixin.qq.com/connect/qrconnect?appid=wx91fad2501e704f40&redirect_uri=ttp://admin.wokanjian.com.cn/admin&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect';
  //   }
  //   localStorage.setItem('TOKEN', 'eyJhbGciOiJIUzM4NCJ9.eyJuaWNrTmFtZSI6IumJtOWuojUwMTgiLCJvbGRVc2VySWQiOiIxIiwibW9iaWxlIjoiMTIzMTIzIiwiYXZhdGFyIjoiMTIzIiwidXNlcklkIjoiMSIsImp0aSI6IjJiYjQ4ZDJhN2U5ZTRhMmFhMWE2ZTQzMjUyMzM5NDAzIiwiZXhwIjoxODgyNjE2Mjc2LCJpYXQiOjE1NjY5OTcwNzYsIm5iZiI6MTU2Njk5NzA3Nn0.KsRyNZm9ryO0V7vQL9pZSh9b1D4OYyhdxIFccJuaC4aT-wteW6A0UIRp1D5mtb7F');
// }
  oldRender();
}


