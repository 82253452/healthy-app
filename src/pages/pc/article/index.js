import styles from './index.css';
import back from '../../../assets/back.png';
import home from '../../../assets/home.png';
import like from '../../../assets/like.png';
import { useEffect, useState } from 'react';
import { getArticles } from '@/api/article';
import Link from 'umi/link';

export default function() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState({ pageSize: 10, pageNum: 1 });


  useEffect(() => {
    getArticles(page).then(data => data && data.data ? setArticles([...articles, ...data.data]) : console.log('无数据'));
  }, [page]);

  const goBack = () => {
    window.history.go(-1);
  };
  const goHome = () => {
    window.location.href = '/';
  };

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
        <div className={styles.class}>美容</div>
        <div className={styles.class}>塑性</div>
        <div className={styles.class}>美甲</div>
        <div className={styles.class}>细胞</div>
        <div className={styles.class}>体检</div>
      </div>
      <Link to='/pc/article/comment'>
        <div className={styles.share}>
          开始分享
        </div>
      </Link>
      <div className={styles.list}>
        {articles.map(article =>
          (
            <div className={styles.block}>
              <Link key={article.id} to={'/pc/info/' + article.id}>
                <div className={styles.headerImg}><img className={styles.img}
                                                       src={article.image}/>
                </div>
                <div className={styles.blockInfo}>
                  <div
                    className={styles.text}>{article.title && (article.title.length >= 20 ? article.title.substring(0, 20) : article.title)}</div>
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
              </Link>
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
