import styles from './index.css';
import SimpleLayout from './simpleLayout'
import CenterLayout from './centerLayout'
import React from 'react';
import router from 'umi/router';
function BasicLayout(props) {
  function login() {
    router.push('/pc/center')
  }
  if (props.location.pathname === '/pc/login') {
    return <SimpleLayout login={login}>{ props.children }</SimpleLayout>
  }
  if (props.location.pathname === '/pc/center') {
    return <CenterLayout>{ props.children }</CenterLayout>
  }
  return (
    <div className={styles.normal}>
      <div className={styles.header}>
        <div onClick={()=>router.push('/')} className={styles.headerLogo}></div>
        <div className={styles.login} onClick={login}>登录</div>
        <div className={styles.phone}>+86 010-5826 4568</div>
      </div>
      {props.children}
    </div>
  );
}

export default BasicLayout;
