import styles from './index.css';
import { useEffect, useState } from 'react';
import { getShopInfo, getShopAbout } from '@/api/shop.js';
import { EmojiEditor } from '@/component/editor/emoji';
import { addCommont, commontList } from '@/api/comment';
import { stateFromHTML } from 'draft-js-import-html';
import { Map, Marker } from 'react-bmap';
import dayjs from 'dayjs';


export default function(props) {
  const [isloding, setIsloding] = useState(true);
  const [shop, setShop] = useState({});
  const [content, setContent] = useState('');
  const [comments, setComments] = useState([]);
  const [commontsTotal, setCommontsTotal] = useState(0);
  const [shopAbout, setShopAbout] = useState([]);
  useEffect(() => {
    getShopInfo(props.match.params.index).then(data => {
      data && data.data ? setShop(data.data) : console.log('无数据');
      setIsloding(false);
    });
    getShopAbout({
      pageNum: 1,
      pageSize: 5,
    }).then(data => data && data.data ? setShopAbout(data.data) : console.log('无数据'));
    getCommonList();
  }, []);
  const editorStyle = {
    border: 'none',
    height: '4rem',
  };
  const emojiStyle = {
    float: 'left',
  };

  function addCommontText() {
    addCommont({ topicId: shop.id, type: 2, content: content }).then(data => getCommonList());
  }

  function getCommonList() {
    commontList({
      id: props.match.params.index,
      type: 2,
      pageNum: 1,
      pageSize: 10,
    }).then(data => {
      data.data && data.data.list ? setComments(data.data.list) : console.log('无数据');
      setCommontsTotal(data.data.total);
    });
  }

  function commentChange(content) {
    setContent(content);
  }

  var mapStyle = { height: '11rem' };
  return (
    isloding ? '' :
      <div className={styles.container}>
        <div className={styles.containerLeft}>
          <div className={styles.shopHeader}>
            <div className={styles.shopHeaderLeft}>
              <div className={styles.shopInfo}>
                <div className={styles.shopName}>{shop.name}</div>
                <div>{shop.Introduction}</div>
                <div className={styles.shopPraiseInfo}>***** 22条评论</div>
                <div className={styles.shopAddress}>
                  <p>地址 {shop.address}</p>
                  <p>电环 {shop.phone}</p>
                </div>
              </div>
              <div className={styles.shopShare}>share</div>
            </div>
            <div className={styles.shopHeaderRight}>
              免费体检
            </div>
          </div>
          <div className={styles.shopHeaderComment}>
            <EmojiEditor emoji editorStyle={editorStyle} emojiStyle={emojiStyle} onChange={commentChange}/>
            {/*<input className={styles.commentInput} placeholder='写下你的点评吧'/>*/}
            {/*<div className={styles.commentImgDiv}>*/}
            {/*  <i className={'iconfont icon-icontypraise2 ' + styles.commentImg}></i>*/}
            {/*  <i className={'iconfont icon-icontypraise2 ' + styles.commentImoji}></i>*/}
            {/*</div>*/}
            <div className={styles.releaseButton} onClick={addCommontText}>发布</div>
          </div>
          <div className={styles.shopHeaderCoupon}>
            优惠
            <div className={styles.line}></div>
            <div className={styles.couponList}>
              <div className={styles.package}>
                <div className={styles.packageTop}>
                  <div className={styles.packageTitle}>体验A套餐</div>
                  <div>50+ sdfsa</div>
                </div>
                <div className={styles.packageBottom}>
                  <div className={styles.packageMoney}>190000</div>
                  <div className={styles.packageDecoration}>￥10000</div>
                </div>
              </div>
              <div className={styles.package}>
                <div className={styles.packageTop}>
                  <div className={styles.packageTitle}>体验A套餐</div>
                  <div>50+ sdfsa</div>
                </div>
                <div className={styles.packageBottom}>
                  <div className={styles.packageMoney}>190000</div>
                  <div className={styles.packageDecoration}>￥10000</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.shopHeaderImages}>
            环境
            <div className={styles.line}></div>
            {shop.images && shop.images.split(',').map(image => (
              <img key={image} src={image}/>
            ))}
          </div>
          <div className={styles.shopHeaderCommentList}>
            全部点评
            <div className={styles.line}></div>
            {
              comments.map(comment => (
                <div key={comment.id} className={styles.context}>
                  <div className={styles.commentUser}><img className={styles.commentUserImg}
                                                           src={comment.avatar}/>
                  </div>
                  <div className={styles.commentUserContext}>
                    <div>{comment.nickName}</div>
                    <div>****</div>
                    <div className={styles.userCommentText}>
                      <EmojiEditor readOnly contentState={() => stateFromHTML(comment.content)}/>
                    </div>
                    {/*<div className={styles.commentMore}>更多</div>*/}
                    <div className={styles.userCommentImg}>
                      {comment.images && comment.images.split(',').map(image => (
                        <img src={image}/>))}
                    </div>
                    <div>
                      <span>{dayjs(comment.createTime).format('MM-DD')}</span>
                      <div className={styles.userCommentReplay}>回复</div>
                      <span className={styles.userCommentPraise}>{comment.praiseNum}</span>
                      <i className={'iconfont icon-like1 ' + styles.userCommentPraise}></i>
                    </div>
                  </div>
                </div>
              ))
            }
            {!!comments.length && comments.length > 10 &&
            <div className={styles.commentFooter}>
              更多热评({commontsTotal})
            </div>
            }
          </div>
        </div>
        <div className={styles.containerRight}>
          <div className={styles.rightMap}>
            <Map style={mapStyle} center={{ lng: shop.longitude, lat: shop.latitude }} zoom="11">
              <Marker position={{ lng: shop.longitude, lat: shop.latitude }}/>
            </Map>
          </div>
          <div className={styles.about}>
            相关推荐
            <div className={styles.line}></div>
            {shopAbout.map(shop => (<div key={shop.id} className={styles.aboutBlock}>
              <img className={styles.blockImg} src={!!shop.images&&shop.images.split(',')[0]}/>
              <div className={styles.aboutShopName}>{shop.name}</div>
              <div className={styles.aboutPraise}>*********</div>
              <div className={styles.aboutFoot}>{shop.address} <span>人均/693</span></div>
            </div>))}
          </div>

        </div>
      </div>
  );
}
