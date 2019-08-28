export function render(oldRender) {
  let isMobile = false;
  if (/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))) {
    try {
      if (/Android|Windows Phone|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        console.log('手机端网址');
        isMobile = true;
      } else if (/iPad/i.test(navigator.userAgent)) {
        console.log('pad网址');
      } else {
        console.log('PC端网址');
      }
    } catch (e) {
      console.log('catch');
    }
  }
  const item = localStorage.getItem('TOKEN');
  if (!item) {
    if(isMobile){
      // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx91fad2501e704f40&redirect_uri=http://admin.wokanjian.com.cn/admin&response_type=code&scope=snsapi_base&state=STATE&component_appid=wxaef3251ba28a0c89#wechat_redirect';
    }else{
      // window.location.href='https://open.weixin.qq.com/connect/qrconnect?appid=wx91fad2501e704f40&redirect_uri=ttp://admin.wokanjian.com.cn/admin&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect';
    }
    localStorage.setItem('TOKEN', 'eyJhbGciOiJIUzM4NCJ9.eyJuaWNrTmFtZSI6IuWwj-m6pui2oyIsIm9sZFVzZXJJZCI6IjE3MDNDRTU5LTk4NjgtNDA2OC04MzIyLTM0MjZGQUE2OERDQyIsIm1vYmlsZSI6IjEyMzEyMyIsImF2YXRhciI6IjEyMyIsImp0aSI6Ijg4NjVmNTUxMDQ0NjQ1MDM4NjA4NDdiYWZhZjkzZjEyIiwiZXhwIjoxODgyMDAzODQyLCJpYXQiOjE1NjYzODQ2NDIsIm5iZiI6MTU2NjM4NDY0Mn0.O7lUWWWHabCJFpG33wZkAlGSBksPeNYfKJyJpncBQohsFi2D0bVLGnWBJUHzZPCX');
  }
  oldRender();
}

