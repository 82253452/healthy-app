import styles from './index.css';
import { getUserInfo,save } from '@/api/user';
import { useEffect, useState } from 'react';
import { getUserArticles } from '@/api/article';
import { getUser } from '@/api/privilege';
import router from 'umi/router';
import Qiniu from '@/component/qiniu/index';
import Message from '@/component/alert/message'

export default function() {
  const [isloding, setIsloding] = useState(true);
  const [user, setUser] = useState({nickName:''});
  const [articles, setArticles] = useState([]);
  const [articleType, setArticleType] = useState(1);
  const [clickType, setClickType] = useState(1);
  const [headerIndex, setHeaderIndex] = useState(2);
  const [privilege, setPrivilege] = useState(2);
  const [paramArticle, setParamArticle] = useState({pageSize: 10, pageNum: 1});
  const url = 'http://pxczv9bs6.bkt.clouddn.com/';
  useEffect(() => {
    getUserInfo().then(data => {
      data && data.data ? setUser(data.data) : console.log('无数据');
    });
    setIsloding(false);
  }, []);
  useEffect(() => {
    getUserArticles({ ...paramArticle, type: articleType,searchType:headerIndex }).then(data => {
      data && data.data ? setArticles([...data.data]) : setArticles([]);
    });
    setIsloding(false);
  }, [articleType, paramArticle,headerIndex]);

  useEffect(() => {
    setClickType(1);
  }, [headerIndex]);
  useEffect(() => {
    clickType===3&&getUser().then(data=>setPrivilege(data.data))
  }, [clickType]);

  function imgSuccessUpload(res) {
    setUser({...user,avatar:url+res.key})
  }
function changeUserName(e) {
  setUser({...user,nickName:e.target.value})
}
function toInfo(id) {
  router.push('/pc/info/'+id)
}
function saveUser() {
  save(user).then(()=>Message.open("保存成功"))
}
  return (
    isloding ? '' :
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.userHeader}>
            <div className={styles.userAvatarDiv}><img className={styles.userAvatar}
                                                       src={user.avatar}/>
            </div>
            <div className={styles.userName}>{user.nickName}</div>
            <div className={styles.userContext}>{user.introduction}</div>
          </div>
          <div className={styles.headerList}>
            <div className={headerIndex === 0 ? styles.headerListClick : ''} onClick={() => {
              setHeaderIndex(0);
            }}>我的收藏 100
            </div>
            <span>|</span>
            <div className={headerIndex === 1 ? styles.headerListClick : ''} onClick={() => {
              setHeaderIndex(1);
            }}>我的点评 100
            </div>
            <span>|</span>
            <div className={headerIndex === 2 ? styles.headerListClick : ''} onClick={() => {
              setHeaderIndex(2);
            }}>我的分享 100
            </div>
            <span>|</span>
            <div className={headerIndex === 3 ? styles.headerListClick : ''} onClick={() => {
              setHeaderIndex(3);
            }}>浏览记录 100
            </div>
          </div>
        </div>
        <div className={styles.context}>
          <div className={styles.contextLeft}>
            <div className={styles.hTop}></div>
            <div className={styles.hConetxt}>
              <div className={styles.hConetxtInfo}>
                <div>
                  0<br/>
                  粉丝
                </div>
                <div>
                  0<br/>
                  浏览量
                </div>
                <div>
                  0<br/>
                  关注
                </div>
              </div>
              <div className={styles.hConetxtEdit}>
                <div onClick={() => setClickType(2)}>编辑资料</div>
                <div onClick={() => router.push('/pc/push')}>开始分享</div>
                <div onClick={() => setClickType(3)}>我的特权卡</div>
              </div>
            </div>
          </div>
          <div className={styles.contextRight}>
            <div className={styles.contextRightHeader + ' ' + (clickType == 1 ? styles.show : styles.hidden)}>
              <div className={articleType === 2 ? styles.contextRightHeaderSelect : null}
                   onClick={() => setArticleType(2)}>视频
              </div>
              <div className={articleType === 1 ? styles.contextRightHeaderSelect : null}
                   onClick={() => setArticleType(1)}>文章
              </div>
            </div>
            <div className={styles.list + ' ' + (clickType === 1 ? styles.show : styles.hidden)}>
              {articles.map(article => (
                <div onClick={()=>toInfo(article.id)} key={article.id} className={styles.block}>
                  <div className={styles.headerImg}><img className={styles.img}
                                                         src={article.image}/>
                  </div>
                  <div className={styles.blockInfo}>
                    <div className={styles.text}>{article.title}</div>
                    <div className={styles.userInfo}>
                      <div className={styles.userImg}><img className={styles.userImgAvatar}
                                                           src={article.avatar}/>
                      </div>
                      <div className={styles.userNick}>{article.nickName}</div>
                      <div className={styles.num}>{article.praiseNum}</div>
                      <div className={styles.praise}>心</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.contextRightCenter + ' ' + (clickType === 2 ? styles.show : styles.hidden)}>
              <div className={styles.userInfoDiv}>
                <div className={styles.baseInfo}>
                  <div>基本信息</div>
                  <div className={styles.baseInputDiv}>(<span className={styles.red}>*</span>为必须填写项目)</div>
                </div>
                <div className={styles.baseInputDiv}>(为了让各位更了解你，以下信息将显示在个人资料页）</div>
                <div className={styles.userInfoAvatarDiv}>
                  <Qiniu onSuccess={imgSuccessUpload}><img className={styles.userInfoAvatar} src={user.avatar}/></Qiniu>
                </div>
                <div className={styles.userInfoAvatarDiv}>
                  <h3>{user.nickName}</h3>
                </div>
                <div className={styles.userNickName}><span className={styles.red}>*</span>昵称 <input defaultValue={user.nickName} onChange={changeUserName}/>
                </div>
                <div className={styles.introduction}>
                  <div>自我介绍</div>
                  <textarea rows={5} value={user.introduction} onChange={(e)=>setUser({...user,introduction:e.target.value})}></textarea></div>
                <div className={styles.share} onClick={saveUser}>保存</div>
              </div>
            </div>
            <div className={styles.contextRightCenter + ' ' + (clickType === 3 ? styles.show : styles.hidden)}>
              <img src={privilege}/>
            </div>
          </div>
          <div>
          </div>
        </div>
      </div>
  );
}
