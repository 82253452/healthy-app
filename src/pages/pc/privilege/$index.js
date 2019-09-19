import styles from './index.css';
import back from '@/assets/back.png';
import home from '@/assets/home.png';
import React, { useEffect, useState } from 'react';
import { getAddressyFir, getAddressySec } from '@/api/address';
import { getList,receive } from '@/api/privilege';
import { getClassify } from '@/api/classify';
import { getShopIndex } from '@/api/shop';
import router from 'umi/router';
import privilege from '@/assets/prililege.png'
import Mask from '@/component/alert/model'
import Message from '@/component/alert/message'
import Scrollbar from '@/component/scrollBar';
export default function(props) {
  const [isloding, setIsloding] = useState(true);
  const [classify, setClassify] = useState([]);
  const [addressFir, setAddressFir] = useState([]);
  const [addressSec, setAddressSec] = useState([]);
  const [shops, setShops] = useState([]);
  const [shopsParam, setShopsParam] = useState({pageSize:5,pageNum:1});
  const [addressActive, setAddressActive] = useState(null);
  const [addressId, setAddressId] = useState(null);
  const [classifyActive, setClassifyActive] = useState(null);
  const [phoneClassifyActive, setPhoneClassifyActive] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    getClassify().then(data => data && data.data && setClassify(data.data));
    getAddressyFir().then(data => {
      data && data.data && setAddressFir(data.data);
    });
    setIsloding(false);
  }, []);
  useEffect(() => {
    setShops([])
    let classifyId = props.match.params.index
    classifyId=(classifyActive===null?classifyId:
        (classifyActive===-1?'':classify[classifyActive]['id'])
    )
    setShopsParam({...shopsParam,...{classifyId},...{addressId}})
  }, [classifyActive,addressId]);

  useEffect(() => {
    getShopIndex(shopsParam).then(data => {
        data.data&&!data.data.length&&setHasMore(false)
        data && data.data && setShops([...shops, ...data.data])
    });
  }, [shopsParam,  classify, props.match.params.index]);

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
  function reveivePrivilege(id,status) {
    Mask.dom.remove()
    !status&&receive(id)
    !status&&Message.open("领取成功")
  }
  const goBack = () => {
    window.history.go(-1);
  };
  const goHome = () => {
    window.location.href = '/';
  };
  function getRates(value) {
    const render = []
    for(let i=0;i<value;i++){
      render.push(<i className={'iconfont icon-star'} style={{color:'#49acf3'}}></i>)
    }
    return render
  }
  function getPrivilege() {
    getList().then(data=>{
      if(data.data['status']){Message.open('您已经领取过了');return}
      Mask.success({render:<div>
          <img style={{width:'40rem',height:'20rem'}} src={data.data['1']}/>
          <div style={{color:'red',padding:'1rem',marginTop:'3rem'}}>享受平台所有签约商户会员权益</div>
          <div onClick={()=>reveivePrivilege(1,data.data['status'])}  style={{color:'red',padding:'1rem',margin:'auto',marginTop:'2rem',border:'1px solid red',borderRadius:'3rem' ,width:'10rem'}}>{data.data['status']?'关闭':'立即领取'}</div>
        </div>,modelStyle:{width:'50rem',height:'35rem',borderRadius:'2rem'}})
    })
  }

  function loadData() {
    setShopsParam({...shopsParam,pageNum:shopsParam.pageNum+1})
  }

  return (
    <div className={styles.container}>
      <div onClick={goBack} className={styles.phoneHeader}>
        <div className={styles.phoneHeaderBack}>
          <img className={styles.phoneHeaderBackImg} src={back}/>
        </div>
        分享健康 分享美丽
        <div  onClick={goHome} className={styles.phoneHeaderHome}>
          <img className={styles.phoneHeaderHomeImg} src={home}/>
        </div>
      </div>
      <div className={styles.conHeader}>
        <div className={styles.classHeaterDiv}>
          <div className={styles.classHeader} onClick={()=>setPhoneClassifyActive(false)}>
            <span>分类</span>
            <i className={'iconfont '+(phoneClassifyActive?'icon-right':'icon-bottom')+' ' + styles.classHeaderRightIcon}></i>
          </div>
          <div className={styles.classHeader} onClick={()=>setPhoneClassifyActive(true)}>
            <span>地点</span>
            <i className={'iconfont '+(!phoneClassifyActive?'icon-right':'icon-bottom')+' ' + styles.classHeaderRightIcon}></i>
          </div>
        </div>
        <div className={styles.classInfoDiv}>
          <div className={styles.classInfo +' '+ (!phoneClassifyActive?styles.phoneClassShow:styles.phoneClassHide)}>
            <a className={styles.classButton} onClick={()=>setClassifyActive(-1)}>不限</a>
            {
              classify.map(add => (<a key={add.id}
                                      onClick={() => classifyClick(add.id, classify.indexOf(add))}
                                      className={styles.classButton + ' ' + (classify.indexOf(add) === classifyActive && styles.classActive)}>{add.name}</a>))
            }
          </div>
          <div className={styles.addressInfo +' '+ (phoneClassifyActive?styles.phoneClassShow:styles.phoneClassHide)}>
              <a onClick={()=>{setAddressActive(null);setAddressSec([]);setAddressId(null)}} className={styles.classButton + ' ' + styles.classButtonLeft}>不限</a>
              <div className={styles.addressAdd}>
                <div className={styles.hotAddress}>
                  {
                    addressFir.map(address => (
                      <a key={address.id}
                         className={styles.addressButton + ' ' + (addressFir.indexOf(address) === addressActive ? styles.active:'')}
                         onClick={() => changeAddress(address.id, addressFir.indexOf(address))}>{address.name}</a>))
                  }
                </div>
                <div className={styles.addressChild}>
                  {
                    addressSec.map(address => (
                      <a onClick={()=>setAddressId(address.id)} key={address.id}
                         className={styles.addressButton + ' ' + styles.active}>{address.name}</a>))
                  }
                </div>
              </div>
            </div>
        </div>
      </div>
      <div className={styles.advertise} onClick={getPrivilege}>
        <img className={styles.adImg} src={privilege}/>
      </div>
      <div className={styles.list}>
        <Scrollbar
          loadData={loadData}
          hasMore={hasMore}
        >
          {
            shops.map(shop => (
              <div key={shop.id} className={styles.block}>
                <img className={styles.shopImg} src={shop.image}/>
                <div className={styles.shopInfo}>
                  <div className={styles.shopInfoTop}>
                    <div className={styles.shopText}>
                      <div style={{fontSize:'2rem'}}>{shop.name}</div>
                      <div style={{paddingTop:'1rem'}}>
                        {getRates(shop.rate)}
                        {shop.rate} 分</div>
                      <div style={{paddingTop:'1rem'}}>{shop.classifyName} {shop.address} {shop.phone}</div>
                      <div style={{paddingTop:'1rem'}}>人均 ￥{shop.percapita}</div>
                    </div>
                    <div className={styles.shopButtonDiv}>
                      <div className={styles.shopButton}>首次免费体检</div>
                      <div className={styles.shopButton}>提价体检</div>
                      <div className={styles.shopButton}>折扣特权</div>
                    </div>
                  </div>
                  <div className={styles.shopContext}>
                    {/*<div>面部祛痘买它就对</div>*/}
                    {/*<div>66 门市价188 已售5460</div>*/}
                    <div className={styles.shopMore} onClick={() => toCoupon(shop.id)}>查看更多优惠</div>
                  </div>
                </div>
              </div>
            ))
          }
        </Scrollbar>
      </div>
    </div>
  );
}
