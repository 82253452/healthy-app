import styles from './index.css';
import select from '../../../assets/select.png';

export default function() {
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
        <div className={styles.logoWeixin}></div>
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
