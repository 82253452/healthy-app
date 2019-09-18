import styles from './index.css';
import select from '../../../assets/select.png';
import qrcode from '../../../assets/qrcode.jpg';
import { useState, useEffect } from 'react';
import router from 'umi/router';

export default function() {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    console.log('effect')

  }, [isLogin]);
  function successLogin() {
    localStorage.setItem('TOKEN', 'eyJhbGciOiJIUzM4NCJ9.eyJuaWNrTmFtZSI6InlwIiwib3BlbklkIjoib1ZUeXM1cE5ROEkwQnBuZXVWcVRoWm5oeWdDbyIsIm1vYmlsZSI6IiIsImF2YXRhciI6Imh0dHA6Ly90aGlyZHd4LnFsb2dvLmNuL21tb3Blbi92aV8zMi9RMGo0VHdHVGZUTGliT28yM3RTYTh0VVV4TGU5dW9CYVZoakNOZ0x6TGdaSHp1OUtHdFMyY2t1UTFGZmhaNTBHVkNJUVpuYlVFWENQUzRkZndYbmNiblEvMTMyIiwidXNlcklkIjoiOSIsImp0aSI6ImU5MTk4MzVjNjUyNzQyMmRiNGFjYmRjNGI1YmZkNTBlIiwiZXhwIjozMzEyNTcyMDkxOCwiaWF0IjoxNTY4ODEyMTE4LCJuYmYiOjE1Njg4MTIxMTh9.KuABl_Afb-cqWeq0nhS2m6wMiamQVlO7UUJjY28dI4r-xxtaOg7MOOTWSzNcmvKf');
    router.push('/')
  }
  return (
    <div className={styles.container}>
      <div className={styles.close}></div>
      <div className={styles.logoHeader}></div>
      <div className={styles.header}>
        <div className={styles.lineLeft}></div>
        <div className={styles.headerText}>3秒登录 了解更多</div>
        <div className={styles.lineRight}></div>
      </div>
      <div>
        {/*<div className={styles.logoWeixin}></div>*/}
        <img onClick={successLogin} className={styles.logoWeixin} src={qrcode}/>
        <div className={styles.weixinText}>微信登录</div>
      </div>
      <div className={styles.footer}>
        <div className={styles.footerText}>
          <img src={select}/>
          勾选代表您同意《协和健康仰教授网络服务使用协议》&《协和健康隐私政策》
        </div>
      </div>
    </div>
  );
}
