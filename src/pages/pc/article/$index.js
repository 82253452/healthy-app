import styles from './index.css';
import back from '../../../assets/back.png';
import home from '../../../assets/home.png';
import { useEffect, useState } from 'react';
import { getArticles } from '@/api/article';
import { getClassify } from '@/api/classify';
import router from 'umi/router';
import Scrollbar from '@/component/scrollBar/index';
import { useList } from 'react-use';
export default function(props) {
  const [articles, articleActions] = useList();
  const [classifys, setClassifys] = useState([]);
  const [page, setPage] = useState({ pageSize: 10, pageNum: 1 ,classifyId: props.match.params.index==='-1'?'':props.match.params.index});
  const [isLoding, setIsLoding] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    getClassify().then(data=>data&&data.data&&setClassifys(data.data))
    // getArticles(page).then(data => data && (data.data ? setArticles(data.data) : console.log('无数据')));
  }, []);

  useEffect(() => {
    getArticles(page).then(data => {
      data.data&&!data.data.length&&setHasMore(false)
      data && data.data && (page.pageNum===1?articleActions.set(data.data):articleActions.push(...data.data))
      setIsLoding(false)
    });
  }, [articleActions, page]);
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
    router.push(`/pc/push`);
  }
  // function loadFunc(e) {
  //   console.log(hasMore)
  //   if(!hasMore){
  //     console.log('无数据')
  //     return
  //   }
  //   if(isLoding){
  //     console.log('加载中')
  //     return
  //   }
  //   if (e.target.scrollHeight-e.target.scrollTop-e.target.offsetHeight<80) {
  //     setIsLoding(true)
  //     setPage({...page,pageNum:page.pageNum+1})
  //     //滚动到底部，可以继续发请求获取数据或干点什么
  //   }
  //   // getArticles(page).then(data => data && (data.data ? setArticles([...articles, ...data.data]) : console.log('无数据')));
  //   // console.log(page)
  // }
  function loadData() {
    setPage({...page,pageNum:page.pageNum+1})
  }

  return (
    <div className={styles.body}>
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
        {classifys.map(c=> <div key={c.id} onClick={()=>{setPage({...page,classifyId:c.id,pageNum:1})}} className={styles.class+' '+(page.classifyId===c.id?styles.classActive:'')}>{c.name}</div>)}
      </div>
      <div className={styles.share} onClick={()=>toShare()}>
        开始分享
      </div>
      <div className={styles.scroll}>
        <Scrollbar
          loadData={loadData}
          hasMore={hasMore}
        >
          <div className={styles.list}>
            {articles.map(article =>
              (
                <div className={styles.block} onClick={() => toInfo(article.id)}>
                  <div className={styles.headerImg} style={{backgroundImage:`url(${article.type===1?article.image:`${article.video}?vframe/jpg/offset/1`})`}}>
                    {/* <img className={styles.img} src={article.type===1?article.image:`${article.video}?vframe/jpg/offset/1`}/> */}
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
        </Scrollbar>
      </div>
      <div className={styles.phoneFooter}>
        <div className={styles.footerTrans}>
          <div className={styles.footerAdd}>
            +
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
