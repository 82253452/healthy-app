import styles from './index.css';
import SimpleLayout from './simpleLayout'
import CenterLayout from './centerLayout'
import React from 'react';
function BasicLayout(props) {
  if (props.location.pathname === '/pc/login') {
    return <SimpleLayout>{ props.children }</SimpleLayout>
  }
  if (props.location.pathname === '/pc/center') {
    return <CenterLayout>{ props.children }</CenterLayout>
  }
  return (
    <div className={styles.normal}>
      <div className={styles.header}>
        <div className={styles.headerLogo}></div>
        <div className={styles.login}>登录</div>
        <div className={styles.phone}>+86 010-5826 4568</div>
      </div>
      {props.children}
    </div>
  );
}

export default BasicLayout;
