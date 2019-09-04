import styles from './index.css';
import React from 'react';

function SimpleLayout(props) {
  return (
    <div  className={styles.normal}>
      <div className={styles.centerHeader}>
        <div className={styles.centerHeaderLogo}></div>
        <div className={styles.login} onClick={props.login}>登录</div>
        <div className={styles.phone}>+86 010-5826 4568</div>
      </div>
      {props.children}
    </div>
  );
}

export default SimpleLayout;
