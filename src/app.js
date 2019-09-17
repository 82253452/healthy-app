import { isMobile, UrlSearch } from '@/utils/utils';
import { login } from '@/api/user';

export function render(oldRender) {
  const code = UrlSearch('code');
  const appId = UrlSearch('appid');
  alert(code)
  alert(appId)
  alert(!!code && !!appId)
  if (!!code && !!appId) {
    login({ code: code, appId: appId }).then(data=>{
      alert(data.data.token)
     data.data&&data.data.token&&localStorage.setItem('TOKEN', data.data.token);
    });
  }else{
    localStorage.getItem('TOKEN')|| (isMobile() && (window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4ff80217b55375b5&redirect_uri=https%3A%2F%2Fzhihuizhan.net&response_type=code&scope=snsapi_userinfo&state=STATE&component_appid=wx45a4a88f12821319&connect_redirect=1#wechat_redirect'))
  }
  oldRender();
}


