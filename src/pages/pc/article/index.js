import styles from './index.css';
import back from '../../../assets/back.png';
import home from '../../../assets/home.png';
import like from '../../../assets/like.png';
import { useEffect, useState } from 'react';
import { getArticles } from '@/api/article';
import { getClassify } from '@/api/classify';
import router from 'umi/router';

export default function() {
  const [articles, setArticles] = useState([]);
  const [classifys, setClassifys] = useState([]);
  const [page, setPage] = useState({ pageSize: 10, pageNum: 1 });

  useEffect(() => {
    getClassify().then(data=>data&&data.data&&setClassifys(data.data))
  }, []);
  useEffect(() => {
    getArticles(page).then(data => data && (data.data ? setArticles([...articles, ...data.data]) : console.log('无数据')));
  }, [page]);

  const goBack = () => {
    window.history.go(-1);
  };
  const goHome = () => {
    window.location.href = '/';
  };

  function toInfo(id) {
    router.push(`/pc/info/${id}`);
  }
  function toShare() {
    router.push(`/pc/privilege`);
  }

  return (
    <div className={styles.container}>
      <div className={styles.phoneHeader}>
        <div onClick={goBack} className={styles.phoneHeaderBack}>
          <img className={styles.phoneHeaderBackImg} src={back}/>
        </div>
        分享健康 分享美丽
        <div onClick={goHome} className={styles.phoneHeaderHome}>
          <img className={styles.phoneHeaderHomeImg} src={home}/>
        </div>
      </div>
      <div className={styles.column}>
        {classifys.map(c=> <div key={c.id} onClick={()=>{setPage({...page,classifyId:c.id});setArticles([])}} className={styles.class+' '+(page.classifyId===c.id?styles.classActive:'')}>{c.name}</div>)}
      </div>
        <div className={styles.share} onClick={()=>toShare()}>
          开始分享
        </div>
      <div className={styles.list}>
        {articles.map(article =>
          (
            <div className={styles.block} onClick={() => toInfo(article.id)}>
              <div className={styles.headerImg}><img className={styles.img}
                                                     src={article.image}/>
              </div>
              <div className={styles.blockInfo}>
                <div
                  className={styles.text}>{article.title && (article.title.length >= 20 ? article.title.substring(0, 18) : article.title)}</div>
                <div className={styles.userInfo}>
                  <div className={styles.userImg}><img className={styles.userImgAvatar}
                                                       src={article.avatar}/>
                  </div>
                  <div className={styles.userNick}>{article.nickName}</div>
                  <div className={styles.num}>{article.praiseNum}</div>
                  <i className={'iconfont icon-like1 ' + styles.praise}></i>
                  {/*<div className={styles.praise}>心</div>*/}
                </div>
              </div>
            </div>
          ),
        )}
      </div>
      <div className={styles.phoneFooter}>
        <div className={styles.footerTrans}>
          <div className={styles.footerAdd}>
            +
          </div>
        </div>
      </div>
    </div>
  );
}
