import styles from './index.css';
import React from 'react';
import router from 'umi/router';

function SimpleLayout(props) {
  return (
    <div className={styles.normal}>
      <div className={styles.centertop}>
      <div className={styles.centerHeader}>
        <div onClick={() => router.push('/')} className={styles.headerLogo}>
        <img src={require('@/assets/n_logoh5.png')} alt="" />

        </div>
        <div className={styles.login} onClick={props.login}>{props.user ? props.user.nickName : '登录'}</div>
        <div className={styles.phone}>+86 010-5826 4568</div>
      </div>
    </div>
      { props.children }
      
    </div >
  );
}

export default SimpleLayout;
