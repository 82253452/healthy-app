import styles from './index.css';
import { getUserInfo, save } from '@/api/user';
import React, { useEffect, useState } from 'react';
import { getUserArticles } from '@/api/article';
import { getUser } from '@/api/privilege';
import router from 'umi/router';
import Qiniu from '@/component/qiniu/index';
import Message from '@/component/alert/message'

export default function () {
  const [isloding, setIsloding] = useState(true);
  const [user, setUser] = useState({ nickName: '' });
  const [articles, setArticles] = useState([]);
  const [articleType, setArticleType] = useState(1);
  const [clickType, setClickType] = useState(1);
  const [headerIndex, setHeaderIndex] = useState(2);
  const [privilege, setPrivilege] = useState(2);
  const [paramArticle, setParamArticle] = useState({ pageSize: 10, pageNum: 1 });
  const url = 'http://images.y456.cn/';
  useEffect(() => {
    getUserInfo().then(data => {
      data && data.data ? setUser(data.data) : console.log('无数据');
    });
    setIsloding(false);
  }, []);
  useEffect(() => {
    getUserArticles({ ...paramArticle, type: articleType, searchType: headerIndex }).then(data => {
      data && data.data ? setArticles([...data.data]) : setArticles([]);
    });
    setIsloding(false);
  }, [articleType, paramArticle, headerIndex]);

  useEffect(() => {
    setClickType(1);
  }, [headerIndex]);
  useEffect(() => {
    clickType === 3 && getUser().then(data => setPrivilege(data.data))
  }, [clickType]);

  function imgSuccessUpload(res) {
    setUser({ ...user, avatar: url + res.key })
  }
  function changeUserName(e) {
    setUser({ ...user, nickName: e.target.value })
  }
  function toInfo(id) {
    router.push('/pc/info/' + id)
  }
  function saveUser() {
    save(user).then(() => Message.open("保存成功"))
  }
  return (
    isloding ? '' :
      <section className="body clearfix">
        <div className={`${styles.bgBox} pc`}>

        </div>
        {/*这是手机的*/}
        <div className={`${styles.h5CenterTop} clearfix h5`}>
          <div className={`left ${styles.left}`}>
            <div className={`${styles.portrait}`}>
              <img src={user.avatar} alt=""/>
            </div>
            <div className="nickname" >{user.nickName}</div>
            <div className={`${styles.describe}`}>{user.introduction}</div>
          </div>
          <div className={`${styles.ri}`}>

            <ul className={`${styles.follow} clearfix`}>
              <li>{user.userFenNums} <p>粉丝</p>
              </li>
              <li>{user.userViewedNums} <p>浏览量</p>
              </li>
              <li>{user.userAttentionNums} <p>关注</p>
              </li>
            </ul>
            <ul className={`${styles.cneterNavlist}`}>
              <li><a onClick={() => setClickType(2)}>编辑资料</a></li>
              {/*开始分享*/}
              <li className={`${styles.bnt}`}><a onClick={() => setClickType(3)}>我的特权卡</a></li>
            </ul>
          </div>
          <div className={`${styles.Release}`}><a onClick={() => router.push('/pc/push')}>开始分享</a></div>
        </div>
        {/*这是pc的*/}
        <div className={`auto-container ${styles.centerBox}`}>
          <div className="row">
            <div className="col-md-3 clearfix">
              <div className={`${styles.centerLeft} pc`}>
                <div  className={`${styles.portrait}`}>
                  <img  src={require("@/assets/imglist01.png")}  alt=""/>
                </div>
                <div className="Nickname">{user.nickName}</div>
                <div className={`${styles.describe}`}>{user.introduction}</div>
                <ul  className={`${styles.follow} clearfix`}>
                  <li>{user.userFenNums} <p>粉丝</p>
                  </li>
                  <li>{user.userViewedNums} <p>浏览量</p>
                  </li>
                  <li>{user.userAttentionNums} <p>关注</p>
                  </li>
                </ul>
                <ul className={`${styles.cneterNavlist}`}>
                  <li><a onClick={() => setClickType(2)}>编辑资料</a></li>
                  <li><a onClick={() => router.push('/pc/push')}>开始分享</a></li>
                  <li><a onClick={() => setClickType(3)}>我的特权卡</a></li>
                </ul>
              </div>
            </div>
            <div className="col-md-9">
              <div className={`${styles.centerRight}`}>
                <div className={`${styles.menu}`}>
                  <a onClick={() => {setHeaderIndex(0)}} className={headerIndex === 0 ? styles.avtive : ''}><span>我的收藏 {user.userPraiseNum}</span></a>
                  |
                  <a onClick={() => {setHeaderIndex(2)}} className={headerIndex === 2 ? styles.avtive : ''}><span>我的分享 {user.userShareNum}</span></a>
                  |
                  <a onClick={() => {setHeaderIndex(3)}} className={headerIndex === 3 ? styles.avtive : ''}><span>浏览记录 {user.userBrowseNum}</span></a>
                </div>
                <div className={`${styles.typeBtn} ${clickType === 1 ? '' : 'hide'}`}>
                  <a  className={articleType === 1 ? styles.avtive : ''} onClick={() => setArticleType(1)}>文章</a>
                  <a className={articleType === 2 ? styles.avtive : ''} onClick={() => setArticleType(2)}>视频</a>
                </div>
                <ul className={`${styles.itemList} row clearfix ${clickType === 1 ? '' : 'hide'}`}>
                  {articles.map(article => (
                    <li className="col-md-3 col-sm-6  col-xs-6" onClick={() => toInfo(article.id)} key={article.id}>
                      <a>
                        <div className={`${styles.img}`} style={{backgroundImage: `url(${article.type === 1 ? article.image : article.video&&'vframe/jpg/offset/1'})`}}></div>
                        <div className={`${styles.ti}`}>
                          {article.title}
                        </div>
                        <div className={`${styles.fot} clearfix`}>
                          <div className={`${styles.left} left`}>
                            <img src={require("@/assets/my103.jpg")} alt=""/>
                            <span>{article.nickName}</span>
                          </div>
                          <div className={`${styles.right} right`}>
                            <img src={require("@/assets/like.png")} alt=""/>
                            <span>{styles.praiseNum}</span>
                          </div>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
                <div className={`${styles.inputBox} ${clickType === 2 ? '' : 'hide'}`}>
                  <h2 className={`${styles.h2}`}>
                    编辑资料
                  </h2>
                  <ul className="inpuList">
                    <li>
                      <p>上传头像</p>
                      <div className={`${styles.UploadAvatar}`}>
                        <Qiniu onSuccess={imgSuccessUpload}><img className={styles.userInfoAvatar} src={user.avatar}/></Qiniu>
                      </div>
                    </li>
                    <li>
                      <p>昵称</p>
                      <div>
                        <input defaultValue={user.nickName} onChange={changeUserName} type="text" placeholder="输入昵称"/>
                      </div>
                    </li>
                    <li>
                      <p>自我介绍</p>
                      <div>
                        <textarea value={user.introduction} onChange={(e) => setUser({ ...user, introduction: e.target.value })} name="" id="" cols="30" rows="10" placeholder="输入自我介绍"></textarea>
                      </div>
                    </li>
                    <div className={`${styles.Submitted}`} onClick={saveUser}>保存</div>
                  </ul>
                </div>
              </div>
              <div className={`${styles.cardBox} ${clickType === 3 ? '' : 'hide'}`}>
                <img src={require("@/assets/ka.png")} alt=""/>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
