import styles from './index.css';
import React from 'react';
import router from 'umi/router';

function ArticleLayout(props) {
  return (
    <div className={styles.normal}>
      <header className="main-header center">
        <div className="header-upper">
          <div className="auto-container clearfix">
            <div className="logo left">
              <a onClick={() => router.push('/')} className="pc"><img src={require("@/assets/logo_w.png")}  alt="Ecology"/></a>
              <a onClick={() => router.push('/')} className="h5"><img src={require("@/assets/logo.png")} alt="Ecology"/></a>
            </div>

            <div className="right clearfix">
              <div className="login  right">
                {props.user ? props.user.nickName : '登录'}
              </div>
              <div className="tel right pc">
                +86 010-5826 4568
              </div>
            </div>

          </div>
        </div>

      </header>
      {props.children}
    </div>
  );
}

export default ArticleLayout;
