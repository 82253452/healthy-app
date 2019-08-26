import styles from './info.css';

export default function() {
  return (
    <div className={styles.container}>
      <div className={styles.commentPlus}>
        +
      </div>
      <div className={styles.commentContext}>
        <input className={styles.commontInputTitle} placeholder='输入标题'/>
        <textarea rows='25' className={styles.commontInputText} placeholder='添加正文'></textarea>
        <div className={styles.share}>发布分享</div>
      </div>
    </div>
  );
}
