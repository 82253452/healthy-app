import styles from './index.css';
import React, { useEffect, useState } from 'react';
import { getShopInfo, getShopAbout } from '@/api/shop.js';
import { EmojiEditor } from '@/component/editor/emoji';
import { addCommont, commontList } from '@/api/comment';
import { stateFromHTML } from 'draft-js-import-html';
import { Map, Marker } from 'react-bmap';
import dayjs from 'dayjs';
import Message from '@/component/alert/message'


export default function(props) {
  const [isloding, setIsloding] = useState(true);
  const [shop, setShop] = useState({});
  const [content, setContent] = useState('');
  const [comments, setComments] = useState([]);
  const [commontsTotal, setCommontsTotal] = useState(0);
  const [shopAbout, setShopAbout] = useState([]);
  const [replayIndex,setReplayIndex] = useState(null);
  const [commonPage, setCommonPage] = useState({ pageNum: 1, pageSize: 5,type: 2});
  useEffect(() => {
    getShopInfo(props.match.params.index).then(data => {
      data && data.data ? setShop(data.data) : console.log('无数据');
      setIsloding(false);
    });
    getShopAbout({
      pageNum: 1,
      pageSize: 5,
    }).then(data => data && data.data ? setShopAbout(data.data) : console.log('无数据'));
  }, [props.match.params.index]);
  useEffect(() => {
    getCommonList();
  }, [commonPage, getCommonList]);
  const editorStyle = {
    border: 'none',
    height: '4rem',
  };
  const emojiStyle = {
    float: 'left',
  };

  function addCommontText() {
    addCommont({ topicId: shop.id, type: 2, content: content }).then(data => {
      Message.open('评论成功')
      getCommonList();setContent('')
    });
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
  function addCommontReplayText(id) {
    if(content==='<p><br></p>'){
      Message.open('清楚如评论内容！')
      return
    }
    addCommont({ topicId: shop.id, type: 2, content: content,pid:id }).then(data => {
      setContent('')
      Message.open('回复成功')
      setReplayIndex(null)
      setCommonPage({...commonPage})
    });
  }

  var mapStyle = { height: '11rem' };
  return (
    isloding ? '' :
      <section className="body clearfix">
        <div className="auto-container">
          <div className="row">
            <div className="col-md-9">
              <div className={`${styles.boxBg} m_t20 ${styles.info}`}>
                <div className="row">
                  <div className="col-md-10">
                    <div className="ti">{shop.name} <span>{shop.Introduction}</span></div>
                    <div className="score" ><span className="Star font_c">★★★★★</span> <span>2091条评论 客单价19000起</span>
                    </div>
                    <div className={`${styles.foinfo}`}>
                      <p>地址： {shop.address}</p>
                      <p>电话： {shop.phone}</p>
                    </div>
                  </div>
                  <div className={`col-md-2 ${styles.iconlist} pc`}>
                    <span>首次免费体验</span>
                    <span>特价体验</span>
                    <span>折扣特权</span>
                  </div>
                </div>
              </div>
              <div className={`${styles.boxBg} m_t15 clearfix ${styles.message}`}>
                <div className="row clearfix">
                  <div className="col-md-12">
                    <EmojiEditor emoji content={content} editorStyle={editorStyle} emojiStyle={emojiStyle} onChange={commentChange}/>
                    {/*<textarea name="" placeholder="写下我的点评吧" id="" cols="30" rows="10"></textarea>*/}
                    <div className="row clearfix">
                      {/*<div className="col-md-6 col-sm-6 col-xs-6">*/}
                      {/*  <img src={require("@/assets/icon101.png")} alt=""/>*/}
                      {/*</div>*/}
                      <div className="col-md-12  col-sm-12  col-xs-12 clearfix">
                        <span className={`right ${styles.sumitBtn}`} onClick={addCommontText}>发布</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${styles.boxBg} m_t15 clearfix ${styles.Discount}`}>
                <div className={`${styles.boxTitle}`}>
                  <span>优惠</span>
                </div>
                <ul className={`${styles.listBoxX}`}>
                  {
                    shop.offerList.map(offer=><li className="item" >
                      <div className={`${styles.top}`}>
                        <div className={`${styles.name}`}>{offer.title}</div>
                        <p>{offer.description}</p>
                      </div>
                      <div className={`${styles.PriceBox}`}>
                        <span><i>¥</i>{offer.price}</span>
                        <s>¥ {offer.oldPrice}</s>
                      </div>
                    </li>)
                  }
                </ul>
              </div>
              <div className="boxBg m_t15 clearfix Discount">
                <div className={`${styles.boxTitle}`}>
                  <span>环境</span>
                </div>
                <ul  className={`${styles.listImg} clearfix`}>
                  {shop.images && shop.images.split(',').map(image => (
                    <li className="item">
                      <img key={image} src={image} alt=""/>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`${styles.boxBg} m_t15 clearfix ${styles.Discount}`}>
                <div className={`${styles.boxTitle}`}>
                  <span>全部点评</span>
                </div>
                <ul className={`${styles.messageList} clearfix`}>
                  {/*{*/}
                  {/*  comments.map((comment,index) => (*/}
                  {/*    <div key={comment.id} className={styles.context}>*/}
                  {/*      <div className={styles.commentUser}><img className={styles.commentUserImg}*/}
                  {/*                                               src={comment.avatar}/>*/}
                  {/*      </div>*/}
                  {/*      <div className={styles.commentUserContext}>*/}
                  {/*        <div style={{fontWeight:'bold'}}>{comment.nickName}</div>*/}
                  {/*        <div><i className={'iconfont icon-star'} style={{color:'#49acf3'}}></i>*/}
                  {/*          <i className={'iconfont icon-star'} style={{color:'#49acf3'}}></i>*/}
                  {/*          <i className={'iconfont icon-star'} style={{color:'#49acf3'}}></i>*/}
                  {/*          <i className={'iconfont icon-star'} style={{color:'#49acf3'}}></i>*/}
                  {/*          <i className={'iconfont icon-star'} style={{color:'#49acf3'}}></i></div>*/}
                  {/*        <div className={styles.userCommentText}>*/}
                  {/*          <div dangerouslySetInnerHTML={{__html: comment.content}}></div>*/}
                  {/*          {replayIndex===index&& <div><EmojiEditor content={content} emoji onChange={commentChange}/>*/}
                  {/*            <div className={styles.addComment} onClick={()=>addCommontReplayText(comment.id)}>确认</div>*/}
                  {/*          </div>}*/}
                  {/*        </div>*/}
                  {/*        /!*<div className={styles.commentMore}>更多</div>*!/*/}
                  {/*        <div className={styles.userCommentImg}>*/}
                  {/*          {comment.images && comment.images.split(',').map(image => (*/}
                  {/*            <img src={image}/>))}*/}
                  {/*        </div>*/}
                  {/*        <div>*/}
                  {/*          <span>{dayjs(comment.createTime).format('MM-DD')}</span>*/}
                  {/*          <div className={styles.userCommentReplay} onClick={()=>setReplayIndex(index)}>回复</div>*/}
                  {/*          <span className={styles.userCommentPraise}>{comment.praiseNum}</span>*/}
                  {/*          <i className={'iconfont icon-like1 ' + styles.userCommentPraise}></i>*/}
                  {/*        </div>*/}
                  {/*        {comment.childList&&comment.childList.map(child=><div key={child.id} className={styles.phoneCommentChild}>*/}
                  {/*          <img src={child.avatar}*/}
                  {/*               className={styles.userImgAvatarRaduSmal}/>*/}
                  {/*          <span className={styles.userCommentChildUser}>@{child.nickName}</span>*/}
                  {/*          <br/>*/}
                  {/*          <div style={{fontSize:'1rem'}} dangerouslySetInnerHTML={{__html: child.content}}></div>*/}
                  {/*        </div>)}*/}
                  {/*      </div>*/}
                  {/*    </div>*/}
                  {/*  ))*/}
                  {/*}*/}
                  {
                    comments.map((comment,index) => (
                      <li className={`item clearfix`}>
                        <div className={`${styles.tx} left`}>
                          <img src={comment.avatar} alt=""/>
                        </div>
                        <div className={`${styles.msgBox}`}>
                          <div className="name" >{comment.nickName}</div>
                          <div className={`${styles.msgcn}`} dangerouslySetInnerHTML={{__html: comment.content}}></div>
                          <div className={`${styles.tool}  row clearfix`}>
                            <div className="col-md-4 col-sm-4 col-xs-4">
                              7-19
                            </div>
                            <div className={`col-md-8 col-sm-8  col-xs-8 ${styles.m}`}>
                              <span><img src={require("@/assets/like.png")} alt=""/> {comment.praiseNum}</span>
                              {/*<span className={`${styles.bnt}`}>回复</span>*/}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
            <div className={`col-md-3 ${styles.riBox} pc`}>
              <div className="boxBg m_t20 clearfix mapBox" className={`${styles.boxBg} m_t20 clearfix ${styles.mapBox}`}>
                <Map style={mapStyle} center={{ lng: shop.longitude, lat: shop.latitude }} zoom="11">
                  <Marker position={{ lng: shop.longitude, lat: shop.latitude }}/>
                </Map>
              </div>
              <div className={`${styles.boxBg} m_t15 clearfix ${styles.Discount}`}>
                <div className={`${styles.boxTitle}`}>
                  <span>相关推荐</span>
                </div>
                <ul className="messageList clearfix" className={`${styles.messageList} clearfix`}>
                  {shopAbout.map(shop => (<li className="item row clearfix" style={{marginBottom: "15px"}}>
                    <div className="col-md-4">
                      <img src={!!shop.images&&shop.images.split(',')[0]} alt=""/>
                    </div>
                    <div className="col-md-8" style={{paddingLeft: "0px"}}>
                      <div className="name">{shop.name}</div>
                      <span className="Star font_c">★★★★★</span>
                      <div className="tool row clearfix">
                        <div className="col-md-6 col-sm-6 col-xs-6">
                          {shop.address}
                        </div>
                        <div className="col-md-6 col-sm-6  col-xs-6 ">
                          <span>人均{shop.percapita}元</span>
                        </div>
                      </div>
                    </div>
                  </li>))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
