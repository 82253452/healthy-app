import styles from './index.css';
import { useEffect, useState } from 'react';
import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.min.css';
import headerImg from '@/assets/header_img.png';
import router from 'umi/router';
import { getClassify } from '@/api/classify';
import { getArticles } from '@/api/article';
import { getShopIndex } from '@/api/shop';

export default function() {
  const [count, setCount] = useState(0);
  const [classifys, setClassifys] = useState([]);
  const [page, setPage] = useState({ pageSize: 10, pageNum: 1 });
  const [articles, setArticles] = useState([]);
  const [swiper, setSwiper] = useState(null);
  const [shopSwiper, setshopSwiper] = useState(null);
  const [shopsParam, setShopsParam] = useState({pageSize:10,pageNum:1});
  const [shops, setShops] = useState([]);
  useEffect(() => {
    getClassify().then(data=>data&&data.data&&setClassifys(data.data))
    if (/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))) {
      try {
        console.log('222')
        if (/Android|Windows Phone|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
          console.log('收集端')
          new Swiper('.swiper-container1', {
            slidesPerView: 1,
            spaceBetween:0,
          })
          return
        } else{

        }
      } catch (e) {
        console.log('catch');
      }
    }
    setshopSwiper(new Swiper('.swiper-container1', {
      slidesPerView: 5,
      spaceBetween:0,
    }))
   setSwiper(new Swiper('.container2', {
      slidesPerView: 4,
      spaceBetween:0,
      pagination: {  //分页器
        el: '.swiper-pagination'
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    }))
  }, []);

  useEffect(() => {
    getArticles(page).then(data => data && (data.data && setArticles(data.data)));
  }, [page]);
  useEffect(() => {
    getShopIndex(shopsParam).then(data => data && data.data && setShops(data.data));
  }, [shopsParam]);
  useEffect(() => {
    shopSwiper&&shopSwiper.updateSlides();
  }, [shops]);

  useEffect(() => {
    swiper&&swiper.updateSlides();
  }, [articles]);

  return (
    <div className={styles.normasl}>
      <div className={styles.headerText}>
        <img src='http://pxczv9bs6.bkt.clouddn.com/a2675268-ac87-41a9-bdeb-773481d2e719'/>
      </div>
      <div className={styles.swiper}>
        <div className="swiper-container swiper-container1">
          <div className="swiper-wrapper">
            {shops.map(shop=><div onClick={()=>router.push(`/pc/coupon/${shop.id}`)} className="swiper-slide"> <img style={{height:'10rem'}} src={shop.image}/></div>)}
          </div>
        </div>
      </div>
      <div className={styles.shareText}>
        <img src='http://pxczv9bs6.bkt.clouddn.com/824f324e-c0b6-485c-810e-25df8a0895b4'/>
      </div>
      <div className={styles.headerHav}>
        {classifys.map(classify=> <div onClick={()=>setPage({...page,...{classifyId:classify.id}})} className={styles.button+' '+(page.classifyId===classify.id?styles.buttonActive:'')}>{classify.name}</div>)}
      </div>
      <span className={styles.more} onClick={()=>router.push('/pc/article')}>更多 》》》</span>
      <div className={styles.swiper}>
        <div className="swiper-container container2">
            <div className="swiper-wrapper">
              {articles.map(article=><div onClick={()=>router.push(`/pc/info/${article.id}`)} key={article.id}  className="swiper-slide"> <img style={{height:'10rem'}} src={article.image}/></div>)}
            </div>
          <div className="swiper-pagination"></div>
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </div>
      </div>
      <div className={styles.startShare} onClick={()=>router.push('/pc/push')}>开始分享</div>
      <div className={styles.nb}>
        <img src='http://pxczv9bs6.bkt.clouddn.com/ee38f5d8-5926-461f-86bb-4132f55b6c37'/>
      </div>
    </div>
  );
}
