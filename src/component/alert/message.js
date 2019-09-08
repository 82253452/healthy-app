// mask.js
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.css';

export default {
  dom: null, //被append的元素

  open (title) {
    this.close();

    this.dom = document.createElement('div');

    // JSX代码
    const JSXdom = (
      <div className={styles.message}>
        {title}
      </div>
    );

    ReactDOM.render(JSXdom, this.dom);
    document.body.appendChild(this.dom);
    setTimeout(()=>{
      this.close();
    },3000)
  },

  close () {
    this.dom && this.dom.remove();
  }
}
