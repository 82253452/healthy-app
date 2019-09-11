import styles from './index.css';
import { useEffect, useState } from 'react';
import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.min.css';
import headerImg from '@/assets/header_img.png';
import router from 'umi/router';
import { getClassify } from '@/api/classify';
import { getArticles } from '@/api/article';
import { getShopIndex } from '@/api/shop';
import { isMobile } from '@/utils/utils';

export default function() {
  const [count, setCount] = useState(0);
  const [classifys, setClassifys] = useState([]);
  const [page, setPage] = useState({ pageSize: 10, pageNum: 1 });
  const [articles, setArticles] = useState([]);
  const [swiper, setSwiper] = useState(null);
  const [shopSwiper, setshopSwiper] = useState(null);
  const [shopsParam, setShopsParam] = useState({ pageSize: 10, pageNum: 1 });
  const [shops, setShops] = useState([]);
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
    getClassify().then(data => data && data.data && setClassifys(data.data));
    // setshopSwiper(new Swiper('.swiper-container1', {
    //   slidesPerView: 5,
    //   spaceBetween:0,
    // }))
    setSwiper(new Swiper('.swiper-container1', {
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
    setshopSwiper(new Swiper('.container3', {
      slidesPerView: 3,
      pagination: {  //分页器
        el: '.swiper-pagination3',
      },
    }));
  }, []);

  useEffect(() => {
    getArticles(page).then(data => data && (data.data && setArticles(data.data)));
  }, [page]);
  useEffect(() => {
    getShopIndex(shopsParam).then(data => data && data.data && setShops(data.data));
  }, [shopsParam]);
  useEffect(() => {
    shopSwiper && shopSwiper.updateSlides();
  }, [shopSwiper, shops]);

  useEffect(() => {
    swiper && swiper.updateSlides();
  }, [articles, swiper]);

  return (
    <div className={styles.normasl}>
      <div className={styles.pc}>
        <div className={styles.headerText}>
          <img className={styles.headerTextImg}
               src='http://pxczv9bs6.bkt.clouddn.com/4b2bde58-8bab-4b46-bb9e-12e658445ca9'/>
          <div style={{ marginTop: '15rem' }}><img style={{ width: '202px', height: '76px' }}
                                                   src='http://pxczv9bs6.bkt.clouddn.com/4c57d5b6-5a2e-4b85-afc9-11c0575709bb'/>
          </div>
          <div className={styles.privilege}>
            <div>
              <div className={styles.privilegeListDiv}>
                {classifys.map(classify => <div className={styles.privilegeList}>
                  <img src={classify.image}/>
                  <div>{classify.name}</div>
                </div>)}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.centerDiv}>
          <img src='http://pxczv9bs6.bkt.clouddn.com/7c587ca9-160a-4c7e-af86-68b8d549f98e'/>
          <div>
            <div className={styles.headerHav}>
              {classifys.map(classify => <div onClick={() => setPage({ ...page, ...{ classifyId: classify.id } })}
                                              className={styles.button + ' ' + (page.classifyId === classify.id ? styles.buttonActive : '')}>{classify.name}</div>)}
            </div>
            <span className={styles.more} onClick={() => router.push('/pc/article')}>更多 &nbsp;&nbsp; >>></span>
          </div>
          <div className={styles.swiper}>
            <div className="swiper-container swiper-container1">
              <div className="swiper-wrapper">
                {articles.map(article => <div key={article.id} className="swiper-slide"><img
                  className={styles.swiperImg} onClick={() => router.push(`/pc/info/${article.id}`)}
                  src={article.image}/></div>)}
              </div>
              <div className="swiper-pagination"></div>
              <div className="swiper-button-prev"></div>
              <div className="swiper-button-next"></div>
            </div>
            <div className={styles.startShare} onClick={() => router.push('/pc/push')}>开始分享</div>
          </div>
        </div>
        <div>
          <img src='http://pxczv9bs6.bkt.clouddn.com/ba71a77a-142a-4328-8151-2b4741a27a9e'/>
          <div><img style={{ padding: '5rem' }}
                    src='http://pxczv9bs6.bkt.clouddn.com/8abd3257-9514-43dc-a511-17f9bb3ad314'/></div>
          <img src='http://pxczv9bs6.bkt.clouddn.com/607740bd-dbdd-48cc-8277-6e480a32de4d'/>
          <div><img style={{ paddingTop: '5rem' }}
                    src='http://pxczv9bs6.bkt.clouddn.com/c1dbbf88-9dd1-4bed-a117-875ab1cf5056'/></div>
          <img style={{ marginTop: '10rem' }}
               src='http://pxczv9bs6.bkt.clouddn.com/40564633-3368-4334-823e-2a3dc9c56721'/>
        </div>
        <div className={styles.footer}>
          <div style={{ width: '110rem', margin: 'auto' }}>
            <div className={styles.footerBlock}>
              <div className={styles.blockHeader}>特权服务</div>
              {classifys.map(classify => <div className={styles.blockText}>{classify.name}</div>)}
            </div>
            <div className={styles.footerBlock} style={{ width: '6rem' }}>
              <div className={styles.blockHeader}>分享</div>
              {classifys.map(classify => <div className={styles.blockText}>{classify.name}</div>)}
            </div>
            <div className={styles.footerBlock}>
              <div className={styles.blockHeader}>微信公众号</div>
              <img src='http://pxczv9bs6.bkt.clouddn.com/425b3fea-63e6-4d8a-b098-049c20792586'/>
            </div>
            <div className={styles.footerBlock} style={{ width: '15rem' }}>
              <div className={styles.blockHeader}>联系我们</div>
              <div className={styles.blockText}>企业邮箱：<span style={{ color: '#49acf3' }}>yang@revering.cn</span></div>
              <div className={styles.blockText}>企业电话：<span style={{ color: '#49acf3' }}>+86 010-5826 4568</span></div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.phone}>
        <div>
          <div className={styles.headerText}>
            <img className={styles.headerTextImg}
                 src='http://pxczv9bs6.bkt.clouddn.com/4b2bde58-8bab-4b46-bb9e-12e658445ca9'/>
            <div style={{ marginTop: '2rem' }}><img style={{ width: '7rem', height: '3rem' }}
                                                    src='http://pxczv9bs6.bkt.clouddn.com/4c57d5b6-5a2e-4b85-afc9-11c0575709bb'/>
            </div>
            {/*{classifys.map(classify=><div className={styles.privilegeList}>*/}
            {/*  <img src={classify.image}/>*/}
            {/*  <div>{classify.name}</div>*/}
            {/*</div> )}*/}
            <div className={styles.swiper}>
              <div className="swiper-container container3">
                <div className="swiper-wrapper">
                  {classifys.map(classify => <div onClick={() => {
                    router.push('/pc/privilege');
                  }} key={classify.id} className={styles.privilegeList + ' swiper-slide'}>
                    <img style={{ width: '10rem' }} src={classify.image}/>
                    <div>{classify.name}</div>
                  </div>)}
                </div>
                <div className="swiper-pagination3"></div>
              </div>
            </div>
            <img style={{ width: '20rem', marginTop: '5rem' }}
                 src='http://pxczv9bs6.bkt.clouddn.com/7c587ca9-160a-4c7e-af86-68b8d549f98e'/>
            <div>
              <div className={styles.headerHav}>
                {classifys.map(classify => <div onClick={() => setPage({ ...page, ...{ classifyId: classify.id } })}
                                                className={styles.button + ' ' + (page.classifyId === classify.id ? styles.buttonActive : '')}>{classify.name}</div>)}
              </div>
              <span className={styles.more} onClick={() => router.push('/pc/article')}>更多 >>></span>
            </div>
          </div>
          <div className={styles.centerDiv}>
            {articles.map((article, index) => index < 4 && <div key={article.id} className={styles.phoneImagesContent}>
              <img onClick={() => router.push(`/pc/info/${article.id}`)} style={{ width: '12rem', height: '14rem' }}
                   src={article.image}/>
              <div style={{
                textAlign: 'left',
                color: '#fff',
                padding: '1rem',
              }}>{article.title && (article.title.length > 5 ? article.title.substring(0, 5) : '')}</div>
            </div>)}
            <div className={styles.startShare} onClick={() => router.push('/pc/push')}>开始分享</div>
          </div>
          <div>
          </div>
          <img style={{ width: '100%' }} src='http://pxczv9bs6.bkt.clouddn.com/7f168ee4-12f6-4369-87fb-f91d34f2d0e8'/>
          <div><img style={{ padding: '5rem' }}
                    src='http://pxczv9bs6.bkt.clouddn.com/8abd3257-9514-43dc-a511-17f9bb3ad314'/></div>
          <img style={{ width: '100%' }} src='http://pxczv9bs6.bkt.clouddn.com/607740bd-dbdd-48cc-8277-6e480a32de4d'/>
          <img src='http://pxczv9bs6.bkt.clouddn.com/c1dbbf88-9dd1-4bed-a117-875ab1cf5056'/>
          <img style={{ marginTop: '10rem', width: '100%' }}
               src='http://pxczv9bs6.bkt.clouddn.com/40564633-3368-4334-823e-2a3dc9c56721'/>
          <div className={styles.footer}>
            <div style={{ margin: 'auto' }}>
              <div className={styles.footerBlock}>
                <div className={styles.blockHeader}>特权服务</div>
                {classifys.map(classify => <div className={styles.blockText}>{classify.name}</div>)}
              </div>
              <div className={styles.footerBlock} style={{ width: '3rem' }}>
                <div className={styles.blockHeader}>分享</div>
                {classifys.map(classify => <div className={styles.blockText}>{classify.name}</div>)}
              </div>
              <div className={styles.footerBlock}>
                <div className={styles.blockHeader}>微信公众号</div>
                <img src='http://pxczv9bs6.bkt.clouddn.com/425b3fea-63e6-4d8a-b098-049c20792586'/>
              </div>
              <div className={styles.footerBlock} style={{ width: '6rem' }}>
                <div className={styles.blockHeader}>联系我们</div>
                <div className={styles.blockText}>企业邮箱：<span style={{ color: '#49acf3' }}>yang@revering.cn</span></div>
                <div className={styles.blockText}>企业电话：<span style={{ color: '#49acf3' }}>+86 010-5826 4568</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
