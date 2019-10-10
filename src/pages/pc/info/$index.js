import styles from './index.css';
import address from '../../../assets/address.png';
import share from '../../../assets/share.png';
import commentFill from '../../../assets/comment_fill.png';
import back from '../../../assets/back.png';
import home from '../../../assets/home.png';
import React, { useEffect, useRef, useState } from 'react';
import { articlePraise, getArticleInfo, getArticlesAbout } from '@/api/article';
import { addCommont, commentPraise, commontList } from '@/api/comment';
import { EmojiEditor } from '@/component/editor/emoji';
import router from 'umi/router';
import Message from '@/component/alert/message';
import { formatDate } from '@/utils/dateUtil';

export default function(props) {
  const [isloding, setIsloding] = useState(true);
  const [article, setArticle] = useState({});
  const [articleAbout, setArticleAbout] = useState([]);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const [phoneComment, setPhoneComment] = useState(false);
  const [commonPage, setCommonPage] = useState({type: 1,pageNum:1,pageSize:5});
  const videoRef = useRef(null);
  const [replayIndex,setReplayIndex] = useState(null);
  const [videoStatus,setVideoStatus] = useState(false);
  const [commentsHasMore,setCommentsHasMore] = useState(true);
  const [replayName,setReplayName] = useState('');
  const [replayId,setReplayId] = useState('');
  useEffect(() => {
    getArticleInfo(props.match.params.index).then(data => {
      data && data.data ? setArticle(data.data) : console.log('无数据');
      setIsloding(false);
    });
    getArticlesAbout({
      pageNum: 1,
      pageSize: 5,
    }).then(data => data && data.data ? setArticleAbout([...data.data]) : console.log('无数据'));
  }, [props.match.params.index]);
  useEffect(() => {
    commontList({id: props.match.params.index,...commonPage}).then(data => {
      data && data.data && data.data.list.length===0 &&setCommentsHasMore(false)
      data && data.data &&commonPage.pageNum===1&& setComments(data.data.list)
      data && data.data &&commonPage.pageNum!==1&& setComments([...comments,...data.data.list])
    });
  }, [commonPage, props.match.params.index]);

  function praise() {
    article.isPraise = !article.isPraise;
    article.isPraise && ++article.praiseNum;
    article.isPraise || --article.praiseNum;
    setArticle({ ...article });
    articlePraise(article.id).then(data => {
    });
  };

  function keep() {
    article.isKeep = !article.isKeep;
    article.isKeep && ++article.keepNum;
    article.isKeep || --article.keepNum;
    setArticle({ ...article });
    //todo keep func
  };


  function addCommontText() {
    if(content==='<p><br></p>'){
      Message.open('请填写评论内容！')
      return
    }
    addCommont({ topicId: article.id, type: 1, content: content }).then(data => {
      setContent('')
      setPhoneComment(false)
      setReplayId('')
      setReplayName('')
      Message.open('评论成功')
      setCommonPage({...commonPage})
    });
  }
  function addCommontReplayText(id) {
    if(content==='<p><br></p>'){
      Message.open('清楚如评论内容！')
      return
    }
    addCommont({ topicId: article.id, type: 1, content: content,pid:id }).then(data => {
      setContent('')
      setPhoneComment(false)
      setReplayId('')
      setReplayName('')
      Message.open('回复成功')
      setReplayIndex(null)
      setCommonPage({...commonPage})
    });
  }
  function checkContext() {
    if(content==='<p><br></p>'){
      Message.open('请填写评论内容！')
      return false
    }
    return true
  }
  function addPhoneCommontText() {
    if(content==='<p><br></p>'){
      setReplayName('')
      setPhoneComment(false)
      return
    }
    // phoneComment&&setPhoneComment(false)
    replayId&&addCommontReplayText(replayId)
    replayId||addCommontText()
  }

  function addCommentPraise(comment) {
    comment.star ? --comment.praiseNum : ++comment.praiseNum;
    comment.star = !comment.star;
    setComments([...comments]);
    commentPraise(comment.id).then(data => console.log(123));
  };

  function commentChange(content) {
    setContent(content);
  }
  function playVideo() {
    if(videoStatus){
      videoRef.current.pause();
      setVideoStatus(false)
    }else{
      videoRef.current.play();
      setVideoStatus(true)
    }

  }
  function toInfo(id) {
    router.push(`/pc/info/${id}`)
  }
  const goBack = () => {
    window.history.go(-1);
  };
  const goHome = () => {
    window.location.href = '/';
  };
  function shareToQQ() {
    const _url = 'http://www.newsucai.cn';
    const _title = 'safsd';
    var _shareUrl = 'https://connect.qq.com/widget/shareqq/iframe_index.html?';
    _shareUrl += 'url=' + encodeURIComponent(_url||window.location.href);   //分享的链接
    _shareUrl += '&title=' + encodeURIComponent(_title||document.title);     //分享的标题
    window.open(_shareUrl,'_blank');
  }

  function shareToXinlang() {
    const _url = 'http://www.newsucai.cn';
    const _title = 'safsd';
    var _shareUrl = 'http://v.t.sina.com.cn/share/share.php?title="123"';     //真实的appkey，必选参数
    _shareUrl += '&url='+ encodeURIComponent(_url||document.location);     //参数url设置分享的内容链接|默认当前页location，可选参数
    _shareUrl += '&title=' + encodeURIComponent(_title||document.title);    //参数title设置分享的标题|默认当前页标题，可选参数
    _shareUrl += '&source=' + encodeURIComponent(''||'');
    _shareUrl += '&sourceUrl=' + encodeURIComponent(''||'');
    _shareUrl += '&content=' + 'utf-8';   //参数content设置页面编码gb2312|utf-8，可选参数
    _shareUrl += '&pic=' + encodeURIComponent(''||'');  //参数pic设置图片链接|默认为空，可选参数
    window.open(_shareUrl,'_blank');
  }

  return (
    isloding ? '' :
      <section className="body clearfix">
        {/*pc*/}
        <div className="auto-container pc">
          <div className={`${styles.filterBox} ${styles.boxBg} m_t20`}>
            <div className={`${styles.classify} clearfix ${styles.lBox}`}>
              <div className={`${styles.name}`}>
                <span>分类:</span>
              </div>
              <div className={`${styles.list}`}>
                <ul className="clearfix">
                  <li><span>不限</span></li>
                  <li className={`${styles.active}`}><span>美容/SPA</span></li>
                  <li><span>美甲美瞳</span></li>
                  <li><span>医学美容</span></li>
                  <li><span>瑜伽</span></li>
                  <li><span>舞蹈</span></li>
                  <li><span>纹绣</span></li>
                  <li><span>瘦身纤体</span></li>
                  <li><span>纹身</span></li>
                  <li><span>祛痘</span></li>
                </ul>
              </div>
            </div>
            <div className={`${styles.regionBox} ${styles.lBox} clearfix`}>
              <div className={`${styles.name}`}>
                <span>地区:</span>
              </div>
              <div className={`${styles.list}`}>
                <ul className="clearfix">
                  <li><span>不限</span></li>
                  <li><span>热门商区</span></li>
                  <li className={`${styles.active}`}><span>行政区</span></li>
                  <li><span>地铁线</span></li>
                </ul>
                <div className={`${styles.childrenBox}`}>
                  <a><span>国贸</span></a>
                  <a className={`${styles.active}`}><span>三里屯</span></a>
                  <a><span>南锣鼓巷</span></a>
                  <a><span>王府井/东单</span> </a>
                  <a><span>中关村</span></a>
                  <a><span>五道口</span></a>
                  <a><span>亚运村</span></a>
                  <a><span>五棵松</span></a>
                  <a><span>工人体育场</span></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*pc end*/}
        {/*h5*/}
        <div className={`container h5 ${styles.boxBg}`}>
          <div className={`${styles.h5filterBox} row`}>
            <div className={`${styles.navtop} clearfix`}>
              <span className={`${styles.active} clearfix`}>分类<i></i></span>
              <span>地区 <i></i></span>
            </div>
            <div className={`${styles.classify} hide`}>
              <div className={`${styles.list}`}>
                <ul className="clearfix">
                  <li><span>不限</span></li>
                  <li className={`${styles.active}`}><span>美容/SPA</span></li>
                  <li><span>美甲美瞳</span></li>
                  <li><span>医学美容</span></li>
                  <li><span>瑜伽</span></li>
                  <li><span>舞蹈</span></li>
                  <li><span>纹绣</span></li>
                  <li><span>瘦身纤体</span></li>
                  <li><span>纹身</span></li>
                  <li><span>祛痘</span></li>
                </ul>
              </div>
            </div>
            <div className={`${styles.regionBox}`}>
              <div className="list clearfix">
                <ul>
                  <li><span>不限</span></li>
                  <li><span>热门商区</span></li>
                  <li className="active"><span>行政区</span></li>
                  <li><span>地铁线</span></li>
                  <li><span>地铁线</span></li>
                  <li><span>地铁线</span></li>
                  <li><span>地铁线</span></li>
                  <li><span>地铁线</span></li>
                  <li><span>地铁线</span></li>
                  <li><span>地铁线</span></li>
                  <li><span>地铁线</span></li>
                  <li><span>地铁线</span></li>
                </ul>
                <div className={`${styles.childrenBox}`}>
                  <a><span>国贸</span></a>
                  <a className="active"><span>三里屯</span></a>
                  <a><span>南锣鼓巷</span></a>
                  <a><span>王府井/东单</span> </a>
                  <a><span>中关村</span></a>
                  <a><span>五道口</span></a>
                  <a><span>亚运村</span></a>
                  <a><span>五棵松</span></a>
                  <a><span>工人体育场</span></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*h5 end*/}
        <div className={`ReceiveVIP ${styles.boxBg} m_t20 container`}>
          <div className="">
            <img src={require("@/assets/vipimg.jpg")} alt=""/>
          </div>
        </div>
        <div className={` ${styles.sortBox} container ${styles.boxBg} m_t20`}>
          <a href="#">智能</a>
          |
          <a href="#">好评</a>
          |
          <a href="#">人气</a>
          |
          <a href="#">效果</a>
        </div>
        <div className={`auto-container ${styles.psListBox} clearfix`}>
          <div className={`col-md-12 ${styles.boxBg} m_t20 clearfix`}>
            <a>
              <div className="img left" className={`img left`}>
                <img src={require("@/assets/my04.jpg")} alt=""/>
              </div>
              <div className={` ${styles.ri}`}>
                <div className={` ${styles.cn}`}>
                  <div className={` ${styles.top} clearfix`}>
                    <div className="row">
                      <div className="col-md-10">
                        <div className={` ${styles.ti}`}>医学美容店店名</div>
                        <div className={` ${styles.score}`}><span className="Star font_c">★★★★★</span> <span
                          className="font_c">5分 141人评论</span></div>
                        <p>医学美容 朝阳公园/团结湖 甜水西园22号楼1层2号105 联系电话：0000000 </p>
                        <p>人均¥148</p>
                      </div>
                      <div className={`col-md-2 ${styles.iconlist} pc`}>
                        <span>首次免费体验</span>
                        <span>特价体验</span>
                        <span>折扣特权</span>
                      </div>
                    </div>
                  </div>
                  <ul className={`${styles.list}`}>
                    <li>
                      <p>面部祛痘买它就对了（店长推荐）</p>
                      <p><span className="font_c">¥66 </span> 门市价¥188 已售5460</p>
                    </li>
                    <li>
                      <p>面部祛痘买它就对了（店长推荐）</p>
                      <p><span className="font_c">¥66 </span> 门市价¥188 已售5460</p>
                    </li>
                    <span className={`${styles.more}`}>查看更多优惠</span>
                  </ul>
                </div>
              </div>
            </a>
          </div>
          <div className={`col-md-12 ${styles.boxBg} m_t20 clearfix`}>
            <a href="serviceShow.html">
              <div className="img left" className={`img left`}>
                <img src={require("@/assets/my04.jpg")} alt=""/>
              </div>
              <div className={` ${styles.ri}`}>
                <div className={` ${styles.cn}`}>
                  <div className={` ${styles.top} clearfix`}>
                    <div className="row">
                      <div className="col-md-10">
                        <div className={` ${styles.ti}`}>医学美容店店名</div>
                        <div className={` ${styles.score}`}><span className="Star font_c">★★★★★</span> <span
                          className="font_c">5分 141人评论</span></div>
                        <p>医学美容 朝阳公园/团结湖 甜水西园22号楼1层2号105 联系电话：0000000 </p>
                        <p>人均¥148</p>
                      </div>
                      <div className={`col-md-2 ${styles.iconlist} pc`}>
                        <span>首次免费体验</span>
                        <span>特价体验</span>
                        <span>折扣特权</span>
                      </div>
                    </div>
                  </div>
                  <ul className={`${styles.list}`}>
                    <li>
                      <p>面部祛痘买它就对了（店长推荐）</p>
                      <p><span className="font_c">¥66 </span> 门市价¥188 已售5460</p>
                    </li>
                    <li>
                      <p>面部祛痘买它就对了（店长推荐）</p>
                      <p><span className="font_c">¥66 </span> 门市价¥188 已售5460</p>
                    </li>
                    <span className={`${styles.more}`}>查看更多优惠</span>
                  </ul>
                </div>
              </div>
            </a>
          </div>
          <div className={`col-md-12 ${styles.boxBg} m_t20 clearfix`}>
            <a href="serviceShow.html">
              <div className="img left" className={`img left`}>
                <img src={require("@/assets/my04.jpg")} alt=""/>
              </div>
              <div className={` ${styles.ri}`}>
                <div className={` ${styles.cn}`}>
                  <div className={` ${styles.top} clearfix`}>
                    <div className="row">
                      <div className="col-md-10">
                        <div className={` ${styles.ti}`}>医学美容店店名</div>
                        <div className={` ${styles.score}`}><span className="Star font_c">★★★★★</span> <span
                          className="font_c">5分 141人评论</span></div>
                        <p>医学美容 朝阳公园/团结湖 甜水西园22号楼1层2号105 联系电话：0000000 </p>
                        <p>人均¥148</p>
                      </div>
                      <div className={`col-md-2 ${styles.iconlist} pc`}>
                        <span>首次免费体验</span>
                        <span>特价体验</span>
                        <span>折扣特权</span>
                      </div>
                    </div>
                  </div>
                  <ul className={`${styles.list}`}>
                    <li>
                      <p>面部祛痘买它就对了（店长推荐）</p>
                      <p><span className="font_c">¥66 </span> 门市价¥188 已售5460</p>
                    </li>
                    <li>
                      <p>面部祛痘买它就对了（店长推荐）</p>
                      <p><span className="font_c">¥66 </span> 门市价¥188 已售5460</p>
                    </li>
                    <span className={`${styles.more}`}>查看更多优惠</span>
                  </ul>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>
  );
}
