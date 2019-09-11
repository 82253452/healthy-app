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

export default function(props) {
  const [isloding, setIsloding] = useState(true);
  const [article, setArticle] = useState({});
  const [articleAbout, setArticleAbout] = useState([]);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const [phoneComment, setPhoneComment] = useState(false);
  const [commonPage, setCommonPage] = useState({ pageNum: 1, pageSize: 5,type: 1});
  const videoRef = useRef(null);
  const [replayIndex,setReplayIndex] = useState(null);
  const [videoStatus,setVideoStatus] = useState(false);

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
    commontList({id: props.match.params.index,...commonPage}).then(data => data && data.data && setComments([...data.data.list]));
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
      Message.open('清楚如评论内容！')
      return
    }
    addCommont({ topicId: article.id, type: 1, content: content }).then(data => {
      setContent('')
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
      Message.open('回复成功')
      setReplayIndex(null)
      setCommonPage({...commonPage})
    });
  }
  function addPhoneCommontText() {
    if(content==='<p><br></p>'){
      Message.open('清楚如评论内容！')
      return
    }
    phoneComment&&setPhoneComment(false)
    content.length>11?addCommontText():setPhoneComment(false)
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
    videoRef.current.play();
    setVideoStatus(true)
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

  return (
    isloding ? '' :
      <div className={styles.container}>
        <div onClick={goBack} className={styles.phoneHeader}>
          <div className={styles.phoneHeaderBack}>
            <img className={styles.phoneHeaderBackImg} src={back}/>
          </div>
          分享健康 分享美丽
          <div onClick={goHome} className={styles.phoneHeaderHome}>
            <img className={styles.phoneHeaderHomeImg} src={home}/>
          </div>
        </div>
        <div className={styles.contentLeft}>
          <div className={styles.video}>
            {article.type===2&& <video controls='controls' className={styles.videoPlay}
                                       src={article.video}/>}
          </div>
          <div className={styles.videoInfo}>
            <div dangerouslySetInnerHTML={{__html: article.context}}></div>
            {/*{article.context}*/}
          </div>
          <div className={styles.videoInfo}>
            {article.type===1&&article.images&&article.images.split(',').map(m=><img style={{width:'4rem',height:'4rem',marginLeft:'1rem'}} src={m}/>)}
          </div>
          <div className={styles.videoPraise}>
            <i className={'iconfont icon-like1 ' + styles.like + ' ' + (article.isPraise ? styles.red : '')}
               onClick={praise}></i>
            <div className={styles.num}>{article.praiseNum}</div>
            <i className={'iconfont icon-pinglun ' + styles.like}></i>
            <div className={styles.num}>{article.commentNum}</div>
            {/*<img className={styles.like} src={keep}/>*/}
            <i className={'iconfont icon-shoucang ' + styles.like + ' ' + (article.isKeep ? styles.red : '')}
               onClick={keep}></i>
            <div className={styles.num}>{article.keepNum}</div>
          </div>
          <div className={styles.videoComment}>
            <div className={styles.userImgDiv}>
              <img src={article.avatar} className={styles.userImgAvatar}/>
            </div>
            <div className={styles.userInputDiv}>
              <EmojiEditor content={content} emoji onChange={commentChange}/>
              {/*<input className={styles.userInput} value={content} onChange={commentChange}/>*/}
              <div className={styles.videoCommentInfo}>
                {/*<i className={'iconfont icon-like1 ' + styles.like} onClick={praise}></i>*/}
                {/*<i className={'iconfont icon-like1 ' + styles.like} onClick={praise}></i>*/}
                {/*<i className={'iconfont icon-like1 ' + styles.like} onClick={praise}></i>*/}
                <div className={styles.addComment} onClick={addCommontText}>评论</div>
              </div>
            </div>
            </div>
          <div className={styles.videoCommentAddress}>
            <img className={styles.address} src={address}/>
            <div className={styles.addressText}>地址：苹果社区 <br/><br/>网址：www.baidu.com 电话：000000</div>
          </div>
          <div className={styles.videoCommentSource}>
            <img className={styles.userImgAvatarRadu}
                 src='http://www.goisoda.cn/d/file/2018-04-11/1523415683326223.jpg'/>
            &nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;{article.nickName} &nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;一起来分享给朋友们看看把
            {/*<img className={styles.shareArticle} src={like}/>*/}
          </div>
          <div className={styles.videoCommentAuther}>
            <div className={styles.textLine}></div>
            <span>&nbsp;&nbsp;笔记评论</span>
          </div>
          <div className={styles.commmentList}>
            {
              comments.map((comment,index) =>
                (<div key={comment.id} className={styles.commentBlock}>
                  <div className={styles.commentBlockHeader}>
                    <img className={styles.userImgAvatarRadu}
                         src={comment.avatar}/>
                    <div className={styles.userCommentNick}>{comment.nickName}<br/>07-18</div>
                    <div className={styles.usercommentLike}>
                      <i className={'iconfont icon-like1 red ' + styles.like + ' ' + (comment.star ? styles.red : '')}
                         onClick={() => addCommentPraise(comment)}></i>
                      &nbsp;&nbsp;{comment.praiseNum}&nbsp;&nbsp; <span onClick={()=>setReplayIndex(index)}>回复</span>
                    </div>
                  </div>
                  <div className={styles.usercommentContent}>
                    <div dangerouslySetInnerHTML={{__html: comment.content}}></div>
                    {replayIndex===index&& <div><EmojiEditor content={content} emoji onChange={commentChange}/>
                    <div className={styles.addComment} onClick={()=>addCommontReplayText(comment.id)}>确认</div>
                    </div>}
                    {comment.childList&&comment.childList.map(child=><div key={child.id} className={styles.phoneCommentChild}>
                      <img src={child.avatar}
                           className={styles.userImgAvatarRaduSmal}/>
                      <span className={styles.userCommentChildUser}>@{child.nickName}</span>
                      <br/>
                      <div style={{fontSize:'1rem',paddingLeft:'2rem'}} dangerouslySetInnerHTML={{__html: child.content}}></div>
                    </div>)}
                  </div>
                </div>),
              )
            }
          </div>
        </div>
        <div className={styles.contentRight}>
          <div onClick={()=>router.push('/pc/push')} className={styles.share}>开始分享</div>
          <div className={styles.auther}>
            <div className={styles.autherTitle}>发布者</div>
            <div className={styles.autherInfo}>
              <img className={styles.userImgAvatarRadu}
                   src='http://www.goisoda.cn/d/file/2018-04-11/1523415683326223.jpg'/>
              <div className={styles.autherInfoText}>{article.nickName}<br/>分享世界 喜欢你我</div>
            </div>
            <div className={styles.show}>
              浏览量<br/>{article.browseNum}
            </div>
            <div className={styles.keep}>
              获赞与收藏<br/>{article.praiseNum + article.keepNum}
            </div>

          </div>
          <div className={styles.about}>
            相关笔记
          </div>
          <div className={styles.aboutList}>
            {articleAbout.map(about => (
              <div key={about.id} className={styles.aboutListBlock} onClick={()=>toInfo(about.id)}>
                <img className={styles.aboutListImg} src={about.avatar}/>
                <div>
                  <div
                    className={styles.aboutText}>{about.title && (about.title.lenght >= 20 ? about.title.substring(0, 20) : about.title)}</div>
                  <div className={styles.aboutLikeDiv}>
                    <i className={'iconfont icon-like1 ' + styles.like + ' ' + (about.isPraise ? styles.red : '')}></i>
                    &nbsp;&nbsp;&nbsp;{about.praiseNum}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div onClick={()=>router.push('/pc/article')} className={styles.more}>
            查看更多
          </div>
        </div>
        {article.type===1&&<div className={styles.phoneVideo}>
          <div className={styles.phoneArticleContent}>
            <div style={{float:'left',width:'100%'}}>
              <img className={styles.userImgAvatarRadu} src={article.avatar}/>
              <div style={{float:'left',marginLeft:'2rem',lineHeight:'2rem'}}>{article.nickName}</div>
              <div className={styles.articleContext} dangerouslySetInnerHTML={{__html: article.context}}></div>
              <div className={styles.articleImages}>
                {article.images&&article.images.split(',').map(m=><img style={{width:'40%',height:'4rem'}} src={m}/>)}
              </div>
            </div>
            <div className={styles.videoCommentAuther}>
              <div className={styles.textLine}></div>
              <span>&nbsp;&nbsp;笔记评论</span>
            </div>
            <div className={styles.commmentList}>
              {
                comments.map((comment,index) =>
                  (<div key={comment.id} className={styles.commentBlock}>
                    <div className={styles.commentBlockHeader}>
                      <img className={styles.userImgAvatarRadu}
                           src={comment.avatar}/>
                      <div className={styles.userCommentNick}>{comment.nickName}<br/>07-18</div>
                      <div className={styles.usercommentLike}>
                        <i className={'iconfont icon-like1 red ' + styles.like + ' ' + (comment.star ? styles.red : '')}
                           onClick={() => addCommentPraise(comment)}></i>
                        &nbsp;&nbsp;{comment.praiseNum}&nbsp;&nbsp; <span onClick={()=>setReplayIndex(index)}>回复</span>
                      </div>
                    </div>
                    <div className={styles.usercommentContent}>
                      <div dangerouslySetInnerHTML={{__html: comment.content}}></div>
                      {replayIndex===index&& <div><EmojiEditor content={content} emoji onChange={commentChange}/>
                        <div className={styles.addComment} onClick={()=>addCommontReplayText(comment.id)}>确认</div>
                      </div>}
                      {comment.childList&&comment.childList.map(child=><div key={child.id} className={styles.phoneCommentChild}>
                        <img src={child.avatar}
                             className={styles.userImgAvatarRaduSmal}/>
                        <span className={styles.userCommentChildUser}>@{child.nickName}</span>
                        <br/>
                        <div style={{fontSize:'1rem',paddingLeft:'2rem'}} dangerouslySetInnerHTML={{__html: child.content}}></div>
                      </div>)}
                    </div>
                  </div>),
                )
              }
            </div>
          </div>

        </div>}
        {article.type===2&&<div className={styles.phoneVideo}>
          <div className={styles.phoneVideoPlayDiv}>
            <video className={styles.phoneVideoPlay} ref={videoRef} playsinline="" webkit-playsinline=""  x5-video-player-type="h5-page" preload="auto" x-webkit-airplay="allow" autoplay="autoplay"
                   src={article.video}/>
          </div>
          {/*<img className={styles.phoneVideoPlayButton} src={play}/>*/}
          {!videoStatus&&<i className={'iconfont icon-right ' + styles.phoneVideoPlayButton} onClick={playVideo}></i>}
          <div className={styles.phoneVideoPlayAvatar}>
            <img className={styles.phoneUserImg} src={article.avatar}/>
            {/*<img className={styles.phoneVideoPlayAvatarLike} src={add}/>*/}
          </div>
          <div className={styles.phoneVideoPlayPrise}>
            <i
              className={'iconfont icon-icontypraise2 ' + styles.phoneVideoPlayPriseLike + ' ' + (article.isPraise ? styles.red : '')}
              onClick={praise}></i>
            <br/>
            {article.praiseNum}
            <br/>
            <br/>
            <i className={'iconfont icon-comment ' + styles.phoneVideoPlayPriseComment} src={commentFill}
               onClick={() => setPhoneComment(true)}/><br/>
            {article.commentNum}
            <br/>
            <br/>
            <i className={'iconfont icon-share ' + styles.phoneVideoPlayPriseShare} src={share}/><br/>
            {article.shareNum}
          </div>
        </div>}
        <div className={styles.phoneFooter}>
          <div className={styles.footerTrans}>
            <div onClick={()=>router.push('/pc/push')} className={styles.footerAdd}>
              +
            </div>
          </div>
        </div>
        <div className={styles.phoneComment + ' ' + (phoneComment ? styles.showCainter : styles.hideCainter)}>
          <div className={styles.phoneCommentList}>
            {comments.map(comment => <div key={comment.id} className={styles.phoneCommentBlock}>
              <div className={styles.phoneCommentUser}>
                <img src={comment.avatar}
                     className={styles.userImgAvatarRadu}/>
                <span className={styles.commentUserName}>{comment.nickName}</span>
                <i className={'iconfont icon-icontypraise2 ' + styles.phoneConnmentPraise}></i>
                <div style={{fontSize:'1rem',paddingLeft:'5rem'}} dangerouslySetInnerHTML={{__html: comment.content}}></div>
              </div>
              {comment.childList&&comment.childList.map(child=><div key={child.id} className={styles.phoneCommentChild}>
                <img src={child.avatar}
                     className={styles.userImgAvatarRaduSmal}/>
                <span className={styles.userCommentChildUser}>@{child.nickName}</span>
                <i className={'iconfont icon-icontypraise2 ' + styles.phoneConnmentPraise}></i>
                <br/>
                <div style={{fontSize:'1rem',paddingLeft:'5rem'}} dangerouslySetInnerHTML={{__html: child.content}}></div>
              </div>)}
            </div>)}
          </div>
          <div className={styles.phonecommentInputDiv}>
            <EmojiEditor emoji editorStyle={{fontSize:'2rem',textAlign:'left',marginBottom:'.5rem'}} emojiStyle={{fontSize:'1rem',marginTop:'-3.2rem',marginRight:'6rem'}} onChange={commentChange} />
            <div className = {styles.phoneSend} onClick={addPhoneCommontText}>{content.length>11?'发送':'关闭'}</div>
            {/*<input placeholder='写下您的评论...' className={styles.phoneCommentInput}/>*/}
            {/*<i className={'iconfont icon-icontypraise2 ' + styles.phoneCommentInputIcon}></i>*/}
          </div>
        </div>
      </div>
  );
}
