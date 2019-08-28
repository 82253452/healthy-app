import styles from './index.css';
import Link from 'umi/link';
import { useState } from 'react';
import QiniuUpload from '@/component/qiniu';

export default function() {
  const [count, setCount] = useState(0);
  const test = () => {
    console.log(222);
  };
  const onSuccess=(res)=>{
    console.log("http://images.fast4ward.cn/"+res.key)
  }
  return (
    <div className={styles.normal}>
      <Link to="/pc/article">Go to list page</Link>
      <QiniuUpload onSuccess={onSuccess}>
        <div className={styles.upload}>+</div>
      </QiniuUpload>
    </div>
  );
}
