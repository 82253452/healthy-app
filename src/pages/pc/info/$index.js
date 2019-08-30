import styles from './index.css';
import like from '../../../assets/like.png';
import address from '../../../assets/address.png';
import play from '../../../assets/play.png';
import share from '../../../assets/share.png';
import commentFill from '../../../assets/comment_fill.png';
import add from '../../../assets/add.png';
import back from '../../../assets/back.png';
import home from '../../../assets/home.png';
import { useEffect, useRef, useState } from 'react';
import { articlePraise, getArticleInfo, getArticlesAbout } from '@/api/article';
import { addCommont, commentPraise, commontList } from '@/api/comment';
import { EmojiEditor } from '@/component/editor/emoji';

export default function(props) {
  const [isloding, setIsloding] = useState(true);
  const [article, setArticle] = useState({});
  const [articleAbout, setArticleAbout] = useState([]);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');


  useEffect(() => {
    getArticleInfo(props.match.params.index).then(data => {
      data && data.data ? setArticle(data.data) : console.log('无数据');
      setIsloding(false);
    });
    getCommonList();
    getArticlesAbout({
      pageNum: 1,
      pageSize: 5,
    }).then(data => data && data.data ? setArticleAbout(data.data) : console.log('无数据'));
  }, []);

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
    addCommont({ topicId: article.id, type: 0, content: content }).then(data => getCommonList());
  }

  function addCommentPraise(comment) {
    comment.star ? --comment.praiseNum : ++comment.praiseNum;
    comment.star = !comment.star;
    setComments([...comments]);
    commentPraise(comment.id).then(data => console.log(123));
  };

  function getCommonList() {
    commontList(props.match.params.index).then(data => data && data.data ? setComments(data.data) : console.log('无数据'));
  }

  return (
    isloding ? '' :
      <div className={styles.container}>
        <div className={styles.phoneHeader}>
          <div className={styles.phoneHeaderBack}>
            <img className={styles.phoneHeaderBackImg} src={back}/>
          </div>
          分享健康 分享美丽
          <div className={styles.phoneHeaderHome}>
            <img className={styles.phoneHeaderHomeImg} src={home}/>
          </div>
        </div>
        <div className={styles.contentLeft}>
          <div className={styles.video}>
            <video controls='controls' className={styles.videoPlay}
                   src={article.video}/>
          </div>
          <div className={styles.videoInfo}>
            {article.context}
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
              <EmojiEditor/>
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
            <img className={styles.shareArticle} src={like}/>
            <img className={styles.shareArticle} src={like}/>
            <img className={styles.shareArticle} src={like}/>
          </div>
          <div className={styles.videoCommentAuther}>
            <div className={styles.textLine}></div>
            <span>&nbsp;&nbsp;笔记评论</span>
          </div>
          <div className={styles.commmentList}>
            {
              comments.map(comment =>
                (<div className={styles.commentBlock}>
                  <div className={styles.commentBlockHeader}>
                    <img className={styles.userImgAvatarRadu}
                         src={comment.avatar}/>
                    <div className={styles.userCommentNick}>{comment.nickName}<br/>07-18</div>
                    <div className={styles.usercommentLike}>
                      <i className={'iconfont icon-like1 red ' + styles.like + ' ' + (comment.star ? styles.red : '')}
                         onClick={() => addCommentPraise(comment)}></i>
                      &nbsp;&nbsp;{comment.praiseNum}&nbsp;&nbsp; 回复
                    </div>
                  </div>
                  <div className={styles.usercommentContent}>
                    {comment.content}
                  </div>
                </div>),
              )
            }
          </div>
        </div>
        <div className={styles.contentRight}>
          <div className={styles.share}>开始分享</div>
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
            {articleAbout.map(about=>(
              <div className={styles.aboutListBlock}>
                <img className={styles.aboutListImg} src={about.avatar}/>
                <div>
                  <div className={styles.aboutText}>{about.context.lenght >= 20 ? about.context.substring(0, 20) : article.context}</div>
                  <div className={styles.aboutLikeDiv}>
                    <i className={'iconfont icon-like1 ' + styles.like + ' ' + (about.isPraise ? styles.red : '')}></i>
                    &nbsp;&nbsp;&nbsp;{about.praiseNum}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.more}>
            查看更多
          </div>
        </div>
        <div className={styles.phoneVideo}>
          <video className={styles.phoneVideoPlay}
                 src='http://kjniu.zhonglanmedia.com/upload/video/source/C1BA2F736834CA7FAA623CDA40E530E1.mp4?_upt=84ebd01c1564474114874&crazycache=1'/>
          <img className={styles.phoneVideoPlayButton} src={play}/>
          <div className={styles.phoneVideoPlayAvatar}>
            <img className={styles.phoneVideoPlayAvatarLike} src={add}/>
          </div>
          <div className={styles.phoneVideoPlayPrise}>
            <i className={'iconfont icon-icontypraise2 ' + styles.phoneVideoPlayPriseLike}></i>
            <br/>
            1233
            <br/>
            <br/>
            <i className={'iconfont icon-comment ' + styles.phoneVideoPlayPriseComment} src={commentFill}/><br/>1231
            <br/>
            <br/>
            <i className={'iconfont icon-share ' + styles.phoneVideoPlayPriseShare} src={share}/><br/>123
          </div>
        </div>
        <div className={styles.phoneFooter}>
          <div className={styles.footerTrans}>
            <div className={styles.footerAdd}>
              +
            </div>
          </div>
        </div>
        <div className={styles.phoneComment}>
          <div className={styles.phoneCommentList}>
            <div className={styles.phoneCommentBlock}>
              <div className={styles.phoneCommentUser}>
                <img src='http://www.goisoda.cn/d/file/2018-04-11/1523415683326223.jpg'
                     className={styles.userImgAvatarRadu}/>
                <span>评论评论评论评论评论</span>
                <i className={'iconfont icon-icontypraise2 ' + styles.phoneConnmentPraise}></i>
              </div>
              <div className={styles.phoneCommentChild}>
                <img src='http://www.goisoda.cn/d/file/2018-04-11/1523415683326223.jpg'
                     className={styles.userImgAvatarRaduSmal}/>
                <span className={styles.userCommentChildUser}>@张三</span>
                <br/>
                <span>回复回复回复回</span>
                <i className={'iconfont icon-icontypraise2 ' + styles.phoneConnmentPraise}></i>
              </div>
              <div className={styles.phoneCommentChild}>
                <img src='http://www.goisoda.cn/d/file/2018-04-11/1523415683326223.jpg'
                     className={styles.userImgAvatarRaduSmal}/>
                <span className={styles.userCommentChildUser}>@张三</span>
                <br/>
                <span>回复回复回复回</span>
                <i className={'iconfont icon-icontypraise2 ' + styles.phoneConnmentPraise}></i>
              </div>
            </div>
          </div>
          <div className={styles.phonecommentInputDiv}>
            <input placeholder='写下您的评论...' className={styles.phoneCommentInput}/>
            <i className={'iconfont icon-icontypraise2 ' + styles.phoneCommentInputIcon}></i>
          </div>
        </div>
      </div>
  );
}
