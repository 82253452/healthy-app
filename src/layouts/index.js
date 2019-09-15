import styles from './index.css';
import SimpleLayout from './simpleLayout';
import CenterLayout from './centerLayout';
import React, { useEffect, useState } from 'react';
import router from 'umi/router';
import { getUserInfo } from '@/api/user';
import { isLogin, isMobile } from '@/utils/utils';

function BasicLayout(props) {
  const [user, setUser] = useState({});
  useEffect(() => {
    getUserInfo().then(data => setUser(data.data));
  }, []);

  function login() {
    console.log(isLogin())
    isLogin() && router.push('/pc/center');
    isLogin() ||isMobile() || router.push('/pc/center');
  }

  if (props.location.pathname === '/pc/login') {
    return <SimpleLayout user={user} login={login}>{props.children}</SimpleLayout>;
  }
  if (props.location.pathname === '/pc/center') {
    return <CenterLayout user={user} login={login}>{props.children}</CenterLayout>;
  }
  return (
    <div className={styles.normal}>
      <div className={styles.header}>
        <div onClick={() => router.push('/')} className={styles.headerLogo}></div>
        <div className={styles.login} onClick={login}>{user ? user.nickName : '登录'}</div>
        <div className={styles.phone}>+86 010-5826 4568</div>
      </div>
      {props.children}
    </div>
  );
}

export default BasicLayout;
