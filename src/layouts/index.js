import styles from './index.css';
import SimpleLayout from './simpleLayout';
import CenterLayout from './centerLayout';
import React, { useEffect, useState } from 'react';
import router from 'umi/router';
import { getUserInfo } from '@/api/user';
import { isLogin, isMobile } from '@/utils/utils';
import { getClassify } from '@/api/classify';

function BasicLayout(props) {
  const [user, setUser] = useState({});
  const [classifys, setClassifys] = useState([]);

  useEffect(() => {
    getUserInfo().then(data => setUser(data.data));
    getClassify().then(data => data && data.data && setClassifys(data.data));

  }, []);

  function login() {
    console.log(isLogin())
    isLogin() && router.push('/pc/center');
    isLogin() || isMobile() || router.push('/pc/center');
  }

  if (props.location.pathname === '/pc/login') {
    return <SimpleLayout user={user} login={login}>{props.children}</SimpleLayout>;
  }
  if (props.location.pathname === '/pc/center') {
    return <CenterLayout user={user} login={login}>{props.children}</CenterLayout>;
  }
  return (
    <div className={styles.normal}>
      <div className={styles.top}>
        <div className={styles.header}>
          <div onClick={() => router.push('/')} className={styles.headerLogo}>
            <img src={require('@/assets/n_logo.png')} alt="" />
          </div>
          <div className={styles.login} onClick={login}>{user ? user.nickName : '登录'}</div>
          <div className={styles.phone}>+86 010-5826 4568</div>
        </div>
      </div>
      {props.children}
      <div className={styles.footer +" " +styles.pc}>
        <div style={{ width: '110rem', margin: 'auto' }}>
          <div className={styles.footerBlock}>
            <div className={styles.blockHeader}>特权服务</div>
            {classifys.map(classify => <div className={styles.blockText}>{classify.name}</div>)}
          </div>
          <div className={styles.footerBlock} style={{ width: '6rem' }}>
            <div className={styles.blockHeader}>分享</div>
            {classifys.map(classify => <div className={styles.blockText}>{classify.name}</div>)}
          </div>
          <div className={styles.footerBlock}>
            <div className={styles.blockHeader}>微信公众号</div>
            <img src='http://pxczv9bs6.bkt.clouddn.com/425b3fea-63e6-4d8a-b098-049c20792586' />
          </div>
          <div className={styles.footerBlock} style={{ width: '15rem' }}>
            <div className={styles.blockHeader}>联系我们</div>
            <div className={styles.blockText}>企业邮箱：<span style={{ color: '#49acf3' }}>yang@revering.cn</span></div>
            <div className={styles.blockText}>企业电话：<span style={{ color: '#49acf3' }}>+86 010-5826 4568</span></div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default BasicLayout;
