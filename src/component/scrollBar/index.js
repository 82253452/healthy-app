import React, { useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

export default function({children,loadData,hasMore}) {
  const [isLoding, setIsLoding] = useState(false);
  function loadFunc(e) {
    console.log(hasMore)
    if(!hasMore){
      console.log('无数据')
      return
    }
    if(isLoding){
      console.log('加载中')
      return
    }
    if (e.target.scrollHeight-e.target.scrollTop-e.target.offsetHeight<80) {
      setIsLoding(true)
      loadData && loadData()
    }
  }

  return (
    <Scrollbars
      onScroll={loadFunc}
    >
      {children}
    </Scrollbars>
  )
}
