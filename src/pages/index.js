
import React, { useEffect, useState } from 'react';
import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.min.css';
import headerImg from '@/assets/header_img.png';
import router from 'umi/router';
import { getClassify } from '@/api/classify';
import { getArticles } from '@/api/article';
import { getShopIndex } from '@/api/shop';
import { isMobile } from '@/utils/utils';
import styles from  './index.css';
export default function () {
  const [count, setCount] = useState(0);
  const [classifys, setClassifys] = useState([]);
  const [page, setPage] = useState({ pageSize: 10, pageNum: 1 });
  const [articles, setArticles] = useState([]);
  const [swiper, setSwiper] = useState(null);
  const [shopSwiper, setshopSwiper] = useState(null);
  const [swiper01,setSwiper01] = useState(null);
  // const [shopsParam, setShopsParam] = useState({ pageSize: 10, pageNum: 1 });
  // const [shops, setShops] = useState([]);
  useEffect(() => {
    if (isMobile()) {
      // setshopSwiper(new Swiper('.swiper-container1', {
      //   slidesPerView: 3,
      //   spaceBetween:0,
      // }))
      // setSwiper(new Swiper('.container2', {
      //   slidesPerView: 3,
      //   spaceBetween:0,
      //   pagination: {  //分页器
      //     el: '.swiper-pagination'
      //   },
      //   navigation: {
      //     nextEl: '.swiper-button-next',
      //     prevEl: '.swiper-button-prev',
      //   },
      // }))

      // return;
    }
    getClassify().then(data =>
    {
      data && data.data && setClassifys(data.data)
      shopSwiper && shopSwiper.updateSlides();
    });
    // setshopSwiper(new Swiper('.swiper-container1', {
    //   slidesPerView: 5,
    //   spaceBetween:0,
    // }))
    setSwiper(new Swiper('.swiper-container', {
      slidesPerView: 4,
      spaceBetween: 70,
      paginationClickable :true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    }))
  }, [shopSwiper]);

  useEffect(() => {
    getArticles(page).then(data => data && (data.data && setArticles(data.data)));
  }, [page]);
  // useEffect(() => {
  //   getShopIndex(shopsParam).then(data => data && data.data && setShops(data.data));
  // }, [shopsParam]);
  // useEffect(() => {
  //   shopSwiper && shopSwiper.updateSlides();
  // }, [shopSwiper, shops]);

  useEffect(() => {
    swiper && swiper.updateSlides();
  }, [articles, swiper]);

  return (
    <div>
      <section className={`${styles.pages1} page`}>
        <div className="container">
          <div className="row">
            <div className={styles.pageBox}>
              <img src={require("@/assets/icon01.png")} alt=""/>
            </div>
            <h1 className="title">
              <img src={require("@/assets/icon02.png")} alt=""/>
            </h1>
            <ul className={`${styles.list} clearfix`}>
              {classifys.filter(classify=>classify.type===1).map(classify => <li><a onClick={() => router.push(`/pc/privilege/${classify.id}`)}><img src={classify.image} alt=""/></a></li>)}
              <li className="h5"><a onClick={() => router.push(`/pc/privilege/-1`)}><img src={require("@/assets/imglist06.png")} alt="" /></a></li>
            </ul>
          </div>
        </div>
      </section>
      <section className={`${styles.pages2} page`}>
        <div className="auto-container">
          <div className={`${styles.box}`}>
            <h1 className="title">
              <img src={require("@/assets/icon03_01.png")} className="pc " alt=""/>
                <img src={require("@/assets/icon03_h5.png")} className="h5" alt=""/>
            </h1>
            <div className={`${styles.menuList} pc`}>
              {classifys.filter(classify=>classify.type===2).map(classify => <span onClick={() => setPage({ ...page, ...{ classifyId: classify.id } })}
                                              className={styles.button + ' ' + (page.classifyId === classify.id ? styles.buttonActive : '')}>{classify.name}</span>)}
              <a  onClick={() => router.push('/pc/article/-1')} className="more">更多>>></a>
            </div>

            <div className={`swiper-container pc `}>
              <div className={`${styles.list} swiper-wrapper`}>
                {articles.map(article => <div className={`${styles.item} swiper-slide`}>
                  <a onClick={() => router.push(`/pc/info/${article.id}`)}>
                    <div className={styles.imgBox}
                         style={{background: `url(${article.type===1?article.image:(article.video+"?vframe/jpg/offset/1")}) no-repeat center center / cover`}}>
                      <img src={require("@/assets/icon06.png")}  className={`${styles.icon} ${article.type===1&&'hide'}`} alt=""/>
                    </div>
                    <h2>{article.title&&(article.title.length>5?article.title.substring(0,5):article.title)}</h2>
                    <p dangerouslySetInnerHTML={{__html:article.context&&article.context.length>5?article.context.substring(0,5):article.context}}></p>
                  </a>
                </div>)}
              </div>
              <div className="swiper-button-next" style={{backgroundImage:`url(${require('@/assets/icon05.png')})`,zIndex:'9999'}}></div>
              <div className="swiper-button-prev" style={{backgroundImage:`url(${require('@/assets/icon04.png')})`}}></div>
            </div>
            {/*这里是h5部分 *********注意这里是分类不是内容*/}
            <ul className={`${styles.h5List} clearfix h5`}>
              {classifys.filter(classify=>classify.type===2).map(classify => <li><a onClick={() => router.push(`/pc/article/${classify.id}`)}><img src={classify.image} alt=""/></a></li>)}
              <li><a onClick={() => router.push(`/pc/article/-1`)}><img src={require("@/assets/share_icon01.png")} alt=""/></a></li>
            </ul>
            <a  onClick={() => router.push('/pc/push')}  className={styles.h5More}>开始分享</a>
          </div>
        </div>
      </section>

      <section className={`${styles.pages3} page`}>
        <div className="cn">
          <img src={require("@/assets/img001.png")} className="pc" alt=""/>
            <img src={require("@/assets/img002.png")} className="h5" alt=""/>
        </div>
      </section>

      <section className={`${styles.pages4} page pc`}>

        <h1 className="title">
          <img src={require("@/assets/pctitle01.png")} className="pc" alt=""/>
            <img src={require("@/assets/h5title01.png")} className="h5" alt=""/>
        </h1>
        <div  className={`${styles.cn}`}>
          <img src={require("@/assets/my02.png")} className="pc" alt=""/>
            <img src={require("@/assets/h5my02.png")} className="h5" alt=""/>
        </div>
      </section>

      <section className={`${styles.pages5} page pc`}>

        <h1 className="title">
          <img src={require("@/assets/pctitle02.png")} className="pc" alt=""/>
            <img src={require("@/assets/h5title02.png")} className="h5" alt=""/>
        </h1>
        <div  className={`${styles.cn}`}>
          <img src={require("@/assets/my03.png")} className="pc" alt=""/>
            <img src={require("@/assets/h5my03.png")} className="h5" alt=""/>
        </div>
      </section>
    </div>
  );
}
