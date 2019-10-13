import styles from './index.css';
import React from 'react';
import router from 'umi/router';

function SimpleLayout(props) {
  return (
    <div className={styles.normal}>
      <header className="main-header center">
        <div className="header-upper">
          <div className="auto-container clearfix">
            <div className="logo left">
              <a href="index.html" className="pc"><img src={require("@/assets/logo_w.png")}  alt="Ecology"/></a>
              <a href="index.html" className="h5"><img src={require("@/assets/logo.png")} alt="Ecology"/></a>
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
      <footer className="main-footer">
        <div className="auto-container pc ">
          <div className="row clearfix">
            <div className="col-md-2">
              <h3 className="ti">特权服务</h3>
              <ul className="navlist">
                <li><a href="#">美容</a></li>
                <li><a href="#">塑形</a></li>
                <li><a href="#">美甲</a></li>
                <li><a href="#">细胞</a></li>
                <li><a href="#">体检</a></li>
              </ul>
            </div>
            <div className="col-md-2">
              <h3 className="ti">分享</h3>
              <ul className="navlist">
                <li><a href="#">美容</a></li>
                <li><a href="#">塑形</a></li>
                <li><a href="#">美甲</a></li>
                <li><a href="#">细胞</a></li>
                <li><a href="#">体检</a></li>
              </ul>
            </div>
            <div className="col-md-8">
              <div className="row clearfix">

                <div className="col-md-6">

                  <h3 className="ti">分享</h3>
                  <div className="imglist">
                    <img src={require("@/assets/icon07.jpg")} alt=""/>
                    <img src={require("@/assets/icon08.jpg")} alt=""/>
                  </div>
                </div>
                <div className="col-md-6">

                  <h3 className="ti">联系我们</h3>
                  <div className="navlist">
                    <p>企业邮箱：yang@revering.cn</p>
                    <p>联系电话：+86 010-5826 4568</p>
                    <p><img src={require("@/assets/icon09.png")} alt=""/></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img src={require("@/assets/img003_01.jpg")} className="h5" alt=""/>
      </footer>
    </div>
  );
}

export default SimpleLayout;
