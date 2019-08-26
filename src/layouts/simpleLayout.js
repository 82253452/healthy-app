import styles from './index.css';
import React from 'react';
function SimpleLayout(props) {
  return (
    <div  className={styles.normal}>
      {props.children}
    </div>
  );
}

export default SimpleLayout;
