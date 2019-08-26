import styles from './index.css';
import back from '@/assets/back.png';
import home from '@/assets/home.png';

export default function() {
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
          <div className={styles.classHeader}>
            分类
            <i className={'iconfont icon-right ' + styles.classHeaderRightIcon}></i>
          </div>
          <div className={styles.classHeader}>
            地点
            <i className={'iconfont icon-right ' + styles.classHeaderRightIcon}></i>
          </div>
        </div>
       <div className={styles.classInfoDiv}>
         <div className={styles.classInfo}>
           <a className={styles.classButton}>不限</a>
           <a className={styles.classButton}>美发</a>
           <a className={styles.classButton}>美发</a>
           <a className={styles.classButton}>美发</a>
           <a className={styles.classButton}>美发</a>
         </div>

         <div className={styles.addressInfo}>
           <a className={styles.classButton + ' ' + styles.classButtonLeft}>不限</a>
           <div className={styles.addressAdd}>
             <div className={styles.hotAddress}>
               <a className={styles.addressButton}>热门商区</a>
               <a className={styles.addressButton}>热门商区2</a>
             </div>
             <div className={styles.addressChild}>
               <a className={styles.addressButton}>国贸1</a>
               <a className={styles.addressButton}>国贸1</a>
               <a className={styles.addressButton}>国贸</a>
               <a className={styles.addressButton}>国贸</a>
             </div>
           </div>
         </div>
       </div>
      </div>
      <div className={styles.advertise}>
        <img className={styles.adImg} src='http://www.goisoda.cn/d/file/2018-04-11/1523415683326223.jpg'/>
      </div>
      <div className={styles.list}>
        <div className={styles.block}>
          <img className={styles.shopImg} src='http://www.goisoda.cn/d/file/2018-04-11/1523415683326223.jpg'/>
          <div className={styles.shopInfo}>
            <div className={styles.shopInfoTop}>
              <div className={styles.shopText}>
                <div>医学美容店店名</div>
                <div>****** 5 分</div>
                <div>医学美容器 医学美容器 医学美容器医学美容器 医学美容器</div>
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
              <div className={styles.shopMore}>查看更多优惠</div>
            </div>
          </div>
        </div>
        <div className={styles.block}>
          <img className={styles.shopImg} src='http://www.goisoda.cn/d/file/2018-04-11/1523415683326223.jpg'/>
          <div className={styles.shopInfo}>
            <div className={styles.shopInfoTop}>
              <div className={styles.shopText}>
                <div>医学美容店店名</div>
                <div>****** 5 分</div>
                <div>医学美容器 医学美容器 医学美容器医学美容器 医学美容器</div>
                <div>人均 &148</div>
              </div>
              <div className={styles.shopButtonDiv}>
                <div className={styles.shopButton}>首次免费体检</div>
                <div className={styles.shopButton}>提价体检</div>
                <div className={styles.shopButton}>折扣特权</div>
              </div>
            </div>
            <div className={styles.shopContext}>
              <div>面部祛痘买它就对了 店长推荐</div>
              <div>66 门市价188 已售5460</div>
              <div className={styles.shopMore}>查看更多优惠</div>
            </div>
          </div>
        </div>
        <div className={styles.block}>
          <img className={styles.shopImg} src='http://www.goisoda.cn/d/file/2018-04-11/1523415683326223.jpg'/>
          <div className={styles.shopInfo}>
            <div className={styles.shopInfoTop}>
              <div className={styles.shopText}>
                <div>医学美容店店名</div>
                <div>****** 5 分</div>
                <div>医学美容器 医学美容器 医学美容器医学美容器 医学美容器</div>
                <div>人均 &148</div>
              </div>
              <div className={styles.shopButtonDiv}>
                <div className={styles.shopButton}>首次免费体检</div>
                <div className={styles.shopButton}>提价体检</div>
                <div className={styles.shopButton}>折扣特权</div>
              </div>
            </div>
            <div className={styles.shopContext}>
              <div>面部祛痘买它就对了 店长推荐</div>
              <div>66 门市价188 已售5460</div>
              <div className={styles.shopMore}>查看更多优惠</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
