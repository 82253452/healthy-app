import styles from './index.css';
import back from '@/assets/back.png';
import home from '@/assets/home.png';
import { useEffect, useState } from 'react';
import { getAddressyFir, getAddressySec } from '@/api/address';
import { getClassify } from '@/api/classify';
import { getShopIndex } from '@/api/shop';
import router from 'umi/router';

export default function() {
  const [isloding, setIsloding] = useState(true);
  const [classify, setClassify] = useState([]);
  const [addressFir, setAddressFir] = useState([]);
  const [addressSec, setAddressSec] = useState([]);
  const [shops, setShops] = useState([]);
  const [addressActive, setAddressActive] = useState(0);
  const [classifyActive, setClassifyActive] = useState(0);
  const [phoneClassifyActive, setPhoneClassifyActive] = useState(false);

  useEffect(() => {
    getClassify().then(data => data && data.data && setClassify(data.data));
    getShopIndex().then(data => data && data.data && setShops(data.data));
    getAddressyFir().then(data => {
      data && data.data && setAddressFir(data.data);
    });
    changeAddress(1, 0);
    setIsloding(false);
  }, []);

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

  return (
    <div className={styles.container}>
      <div className={styles.phoneHeader}>
        <div className={styles.phoneHeaderBack}>
          <img className={styles.phoneHeaderBackImg} src={back}/>
        </div>
        分享健康 分享美丽
        <div className={styles.phoneHeaderHome}>
          <img className={styles.phoneHeaderHomeImg} src={home}/>
        </div>
      </div>
      <div className={styles.conHeader}>
        <div className={styles.classHeaterDiv}>
          <div className={styles.classHeader} onClick={()=>setPhoneClassifyActive(false)}>
            <spam>分类</spam>
            <i className={'iconfont '+(phoneClassifyActive?'icon-right':'icon-bottom')+' ' + styles.classHeaderRightIcon}></i>
          </div>
          <div className={styles.classHeader} onClick={()=>setPhoneClassifyActive(true)}>
            <spam>地点</spam>
            <i className={'iconfont '+(!phoneClassifyActive?'icon-right':'icon-bottom')+' ' + styles.classHeaderRightIcon}></i>
          </div>
        </div>
        <div className={styles.classInfoDiv}>
          <div className={styles.classInfo +' '+ (!phoneClassifyActive?styles.phoneClassShow:styles.phoneClassHide)}>
            <a className={styles.classButton}>不限</a>
            {
              classify.map(add => (<a key={add.id}
                                      onClick={() => classifyClick(add.id, classify.indexOf(add))}
                                      className={styles.classButton + ' ' + (classify.indexOf(add) === classifyActive && styles.classActive)}>{add.name}</a>))
            }
          </div>
          <div className={styles.addressInfo +' '+ (phoneClassifyActive?styles.phoneClassShow:styles.phoneClassHide)}>
              <a className={styles.classButton + ' ' + styles.classButtonLeft}>不限</a>
              <div className={styles.addressAdd}>
                <div className={styles.hotAddress}>
                  {
                    addressFir.map(address => (
                      <a key={address.id}
                         className={styles.addressButton + ' ' + (addressFir.indexOf(address) === addressActive && styles.active)}
                         onClick={() => changeAddress(address.id, addressFir.indexOf(address))}>{address.name}</a>))
                  }
                </div>
                <div className={styles.addressChild}>
                  {
                    addressSec.map(address => (
                      <a key={address.id}
                         className={styles.addressButton + ' ' + styles.active}>{address.name}</a>))
                  }
                </div>
              </div>
            </div>
        </div>
      </div>
      <div className={styles.advertise}>
        <img className={styles.adImg} src='http://www.goisoda.cn/d/file/2018-04-11/1523415683326223.jpg'/>
      </div>
      <div className={styles.list}>
        {
          shops.map(shop => (
            <div key={shop.id} className={styles.block}>
              <img className={styles.shopImg} src={shop.image}/>
              <div className={styles.shopInfo}>
                <div className={styles.shopInfoTop}>
                  <div className={styles.shopText}>
                    <div>{shop.name}</div>
                    <div>****** 5 分</div>
                    <div>{shop.classifyName} {shop.address} {shop.phone}</div>
                    <div>人均 &148</div>
                  </div>
                  <div className={styles.shopButtonDiv}>
                    <div className={styles.shopButton}>首次免费体检</div>
                    <div className={styles.shopButton}>提价体检</div>
                    <div className={styles.shopButton}>折扣特权</div>
                  </div>
                </div>
                <div className={styles.shopContext}>
                  <div>面部祛痘买它就对</div>
                  <div>66 门市价188 已售5460</div>
                  <div className={styles.shopMore} onClick={() => toCoupon(shop.id)}>查看更多优惠</div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
