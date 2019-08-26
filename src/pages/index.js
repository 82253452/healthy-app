import styles from './index.css';
import Link from 'umi/link';
import { useState } from 'react';
export default function() {
  const [count, setCount] = useState(0);
  const test = () => {
    console.log(222);
  };
  return (
    <div className={styles.normal}>
      <div className={styles.welcome}/>
      <ul className={styles.list}>
        <li onClick={test}>To get started, edit
        </li>
        <Link to="/pc/login">Go to list page</Link>
      </ul>
    </div>
  );
}
