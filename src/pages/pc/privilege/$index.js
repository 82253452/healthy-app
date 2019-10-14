import styles from './index.css';
import back from '@/assets/back.png';
import home from '@/assets/home.png';
import React, { useEffect, useState } from 'react';
import { getAddressyFir, getAddressySec } from '@/api/address';
import { getList, receive } from '@/api/privilege';
import { getClassify } from '@/api/classify';
import { getShopIndex } from '@/api/shop';
import router from 'umi/router';
import privilege from '@/assets/prililege.png'
import Mask from '@/component/alert/model'
import Message from '@/component/alert/message'
import Scrollbar from '@/component/scrollBar';
import { useList, useSetState, useUpdateEffect } from 'react-use';
import { Actions } from 'react-use/lib/useList';
export default function (props) {
  const [isloding, setIsloding] = useState(true);
  const [classify, setClassify] = useState([]);
  const [addressFir, setAddressFir] = useState([]);
  const [addressSec, setAddressSec] = useState([]);
  const [shops, shopsActions] = useList();
  const [shopsParam, setShopsParam] = useSetState({ pageSize: 5, pageNum: 1 });
  const [addressActive, setAddressActive] = useState(null);
  const [addressId, setAddressId] = useState(null);
  const [classifyActive, setClassifyActive] = useState(null);
  const [phoneClassifyActive, setPhoneClassifyActive] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    getClassify().then(data => {
      data && data.data && setClassify(data.data)
      data.data.forEach(d=>{
        (d.id==props.match.params.index)&&setClassifyActive(data.data.indexOf(d))
      })
    });
    getAddressyFir().then(data => {
      data && data.data && setAddressFir(data.data);
    });
    setIsloding(false);
  }, [props.match.params.index]);
  useUpdateEffect(() => {
    let classifyId = props.match.params.index
    classifyId = (classifyActive === null ? classifyId :
      (classifyActive === -1 ? '' : classify[classifyActive]['id'])
    )
    classifyId==-1&&(classifyId='')
    setShopsParam({ ...{ classifyId }, ...{ addressId } })
  }, [classifyActive, addressId, props.match.params.index]);

  useUpdateEffect(() => {
    console.log(shopsParam)
    getShopIndex(shopsParam).then(data => {
      data.data && !data.data.length && setHasMore(false)
      data && data.data && (shopsParam.pageNum ===1?shopsActions.set(data.data):shopsActions.push(data.data))
    });
  }, [shopsParam, props.match.params.index]);

  function changeAddress(id, index) {
    setAddressActive(index);
    getAddressySec(id).then(data => data && data.data && setAddressSec(data.data));
  }

  function classifyClick(id, index) {
    setClassifyActive(index);
  }

  function toCoupon(id) {
    router.push('/pc/coupon/' + id);
  }
  function reveivePrivilege(id, status) {
    Mask.dom.remove()
    !status && receive(id)
    !status && Message.open("领取成功")
  }
  const goBack = () => {
    window.history.go(-1);
  };
  const goHome = () => {
    window.location.href = '/';
  };
  function getRates(value) {
    const render = []
    for (let i = 0; i < value; i++) {
      render.push(<i>★</i>)
    }
    return render
  }
  function getPrivilege() {
    getList().then(data => {
      if (data.data['status']) { Message.open('您已经领取过了'); return }
      Mask.success({
        render: <div>
          <img style={{ width: '40rem', height: '20rem' }} src={data.data['1']} />
          <div style={{ color: 'red', padding: '1rem', marginTop: '3rem' }}>享受平台所有签约商户会员权益</div>
          <div onClick={() => reveivePrivilege(1, data.data['status'])} style={{ color: 'red', padding: '1rem', margin: 'auto', marginTop: '2rem', border: '1px solid red', borderRadius: '3rem', width: '10rem' }}>{data.data['status'] ? '关闭' : '立即领取'}</div>
        </div>, modelStyle: { width: '50rem', height: '35rem', borderRadius: '2rem' }
      })
    })
  }

  function loadData() {
    setShopsParam({ ...shopsParam, pageNum: shopsParam.pageNum + 1 })
  }

  return (
    <section className="body clearfix">
      {/*pc*/}
      <div className="auto-container pc">
        <div className={`${styles.filterBox} ${styles.boxBg} m_t20`}>
          <div className={`${styles.classify} clearfix ${styles.lBox}`}>
            <div className={`${styles.name}`}>
              <span>分类:</span>
            </div>
            <div className={`${styles.list}`}>
              <ul className="clearfix">
                <li className={styles.item+ ' ' + ((classifyActive===null||classifyActive===-1) && styles.active)} onClick={() => setClassifyActive(-1)}><span>不限</span></li>
                {
                  classify.map(add => ( <li key={add.id} onClick={() => classifyClick(add.id, classify.indexOf(add))} className={classify.indexOf(add) === classifyActive && styles.active}><span>{add.name}</span></li>))
                }
              </ul>
            </div>
          </div>
          <div className={`${styles.regionBox} ${styles.lBox} clearfix`}>
            <div className={`${styles.name}`}>
              <span>地区:</span>
            </div>
            <div className={`${styles.list}`}>
              <ul className="clearfix">
                <li  onClick={() => { setAddressActive(null); setAddressSec([]); setAddressId(null) }}><span>不限</span></li>
                {
                  addressFir.map(address => (
                    <li key={address.id}
                       className={styles.item + ' ' + (addressFir.indexOf(address) === addressActive ? styles.active : '')}
                       onClick={() => changeAddress(address.id, addressFir.indexOf(address))}><span>{address.name}</span></li>))
                }
              </ul>
              <div className={`${addressSec&&addressSec.length&&styles.childrenBox}`}>
                {
                  addressSec.map(address => (
                    <a onClick={() => setAddressId(address.id)} key={address.id}
                       className={styles.item + ' ' + styles.classActive}><span>{address.name}</span></a>))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*pc end*/}
      {/*h5*/}
      <div className={`container h5 ${styles.boxBg}`}>
        <div className={`${styles.h5filterBox} row`}>
          <div className={`${styles.navtop} clearfix`}>
            <span className={`${phoneClassifyActive?'':styles.active} clearfix`} onClick={() => setPhoneClassifyActive(false)}>分类<i></i></span>
            <span  className={`${phoneClassifyActive?styles.active:''} clearfix`} onClick={() => setPhoneClassifyActive(true)}>地区 <i></i></span>
          </div>
          <div className={`${styles.classify} ${phoneClassifyActive?'hide':''}`}>
            <div className={`${styles.list}`}>
              <ul className="clearfix">
                <li className={styles.item+ ' ' + ((classifyActive===null||classifyActive===-1) && styles.active)} onClick={() => setClassifyActive(-1)}><span>不限</span></li>
                {
                  classify.map(add => ( <li key={add.id} onClick={() => classifyClick(add.id, classify.indexOf(add))} className={classify.indexOf(add) === classifyActive && styles.active}><span>{add.name}</span></li>))
                }
              </ul>
            </div>
          </div>
          <div className={`${styles.regionBox} ${phoneClassifyActive?'':'hide'}`}>
            <div className="list clearfix">
              <ul>
                <li  onClick={() => { setAddressActive(null); setAddressSec([]); setAddressId(null) }}><span>不限</span></li>
                {
                  addressFir.map(address => (
                    <li key={address.id}
                        className={styles.item + ' ' + (addressFir.indexOf(address) === addressActive ? styles.active : '')}
                        onClick={() => changeAddress(address.id, addressFir.indexOf(address))}><span>{address.name}</span></li>))
                }
              </ul>
              <div className={`${styles.childrenBox}`}>
                {
                  addressSec.map(address => (
                    <a onClick={() => setAddressId(address.id)} key={address.id}
                       className={styles.item + ' ' + styles.classActive}><span>{address.name}</span></a>))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*h5 end*/}
      <div className={`ReceiveVIP ${styles.boxBg} m_t20 container`}>
        <div className="" onClick={getPrivilege}>
          <img src={require("@/assets/vipimg.jpg")} alt=""/>
        </div>
      </div>
      <div className={` ${styles.sortBox} container ${styles.boxBg} m_t20`}>
        <a onClick={()=>setShopsParam({sortColumn:'create_time',sortWay:'desc'})}>最新</a>
        |
        <a onClick={()=>setShopsParam({sortColumn:'commontsNum',sortWay:'desc'})}>好评</a>
      </div>
      <div className={`auto-container ${styles.psListBox} clearfix`} style={{paddingBottom:'22px'}}>
        {
          shops.map(shop => (
            <div className={`col-md-12 ${styles.boxBg} m_t20 clearfix`}>
              <a>
                <div className="img left">
                  <img src={shop.image} alt=""/>
                </div>
                <div className={`${styles.ri}`}>
                  <div className={`${styles.cn}`}>
                    <div className={`${styles.top} clearfix`}>
                      <div className="row">
                        <div className="col-md-10">
                          <div className={` ${styles.ti}`}>{shop.name}</div>
                          <div className={` ${styles.score}`}><span className="Star font_c">{getRates(shop.rate)}</span> <span
                            className="font_c">{shop.rate}分 {shop.commontsNum}人评价</span></div>
                          <p>{shop.classifyName} {shop.address} 联系电话： {shop.phone}</p>
                          <p>人均¥{shop.percapita}</p>
                        </div>
                        <div className={`col-md-2 ${styles.iconlist} pc`}>
                          <span>首次免费体验</span>
                          <span>特价体验</span>
                          <span>折扣特权</span>
                        </div>
                      </div>
                    </div>
                    <ul className={`${styles.list}`}>
                      {/*<li>*/}
                      {/*  <p>面部祛痘买它就对了（店长推荐）</p>*/}
                      {/*  <p><span className="font_c">¥66 </span> 门市价¥188 已售5460</p>*/}
                      {/*</li>*/}
                      {/*<li>*/}
                      {/*  <p>面部祛痘买它就对了（店长推荐）</p>*/}
                      {/*  <p><span className="font_c">¥66 </span> 门市价¥188 已售5460</p>*/}
                      {/*</li>*/}
                      <span className={`${styles.more}`} onClick={() => toCoupon(shop.id)}>查看更多优惠</span>
                    </ul>
                  </div>
                </div>
              </a>
            </div>
          ))
        }
      </div>
    </section>
  );
}
