import { isMobile, UrlSearch } from '@/utils/utils';
import { login } from '@/api/user';

export function render(oldRender) {
  localStorage.setItem('TOKEN', 'eyJhbGciOiJIUzM4NCJ9.eyJuaWNrTmFtZSI6InlwIiwib3BlbklkIjoib1ZUeXM1cE5ROEkwQnBuZXVWcVRoWm5oeWdDbyIsIm1vYmlsZSI6IiIsImF2YXRhciI6Imh0dHA6Ly90aGlyZHd4LnFsb2dvLmNuL21tb3Blbi92aV8zMi9RMGo0VHdHVGZUTGliT28yM3RTYTh0VVV4TGU5dW9CYVZoakNOZ0x6TGdaSHp1OUtHdFMyY2t1UTFGZmhaNTBHVkNJUVpuYlVFWENQUzRkZndYbmNiblEvMTMyIiwidXNlcklkIjoiMTAiLCJqdGkiOiI0Mzc0OGQ0OGU5NGU0NGVjYjMyNjA5NTFmYTkyZWEwZiIsImV4cCI6MzMxMjU3MjE5MTksImlhdCI6MTU2ODgxMzExOSwibmJmIjoxNTY4ODEzMTE5fQ.P8pIpn33xqgS_3I-7dNj1c8LgQPPv2d27QNS2p6I6tLjlr-SKDCCPLFzkt8-e49P');
  const code = UrlSearch('code');
  const appId = UrlSearch('appid');
  if (!!code && !!appId) {
    login({ code: code, appId: appId }).then(data=>{
     data.data&&data.data.token&&localStorage.setItem('TOKEN', data.data.token);
    });
  }else{
    localStorage.getItem('TOKEN')|| (isMobile() && (window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4ff80217b55375b5&redirect_uri=https%3A%2F%2Fzhihuizhan.net&response_type=code&scope=snsapi_userinfo&state=STATE&component_appid=wx45a4a88f12821319&connect_redirect=1#wechat_redirect'))
  }
  oldRender();
}


