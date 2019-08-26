import styles from './index.css';

export default function() {
  return (
    <div className={styles.container}>
      <div className={styles.containerLeft}>
        <div className={styles.shopHeader}>
          <div className={styles.shopHeaderLeft}>
            <div className={styles.shopInfo}>
              <div className={styles.shopName}>慈铭奥亚体检中心</div>
              <div>私人医生组成的高端会员制体检中心</div>
              <div className={styles.shopPraiseInfo}>***** 22条评论</div>
              <div className={styles.shopAddress}>
                <p>地址 北京市 朝阳区</p>
                <p>电环 23234saf324</p>
              </div>
            </div>
            <div className={styles.shopShare}>share</div>
          </div>
          <div className={styles.shopHeaderRight}>
            免费体检
          </div>
        </div>
        <div className={styles.shopHeaderComment}>
          <input className={styles.commentInput} placeholder='写下你的点评吧'/>
          <div className={styles.commentImgDiv}>
            <i className={'iconfont icon-icontypraise2 ' + styles.commentImg}></i>
            <i className={'iconfont icon-icontypraise2 ' + styles.commentImoji}></i>
          </div>
          <div className={styles.releaseButton}>发布</div>
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
          <img src='http://www.goisoda.cn/d/file/2018-04-11/1523415683326223.jpg'/>
          <img src='http://www.goisoda.cn/d/file/2018-04-11/1523415683326223.jpg'/>
          <img src='http://www.goisoda.cn/d/file/2018-04-11/1523415683326223.jpg'/>
          <img src='http://www.goisoda.cn/d/file/2018-04-11/1523415683326223.jpg'/>
          <img src='http://www.goisoda.cn/d/file/2018-04-11/1523415683326223.jpg'/>
          <img src='http://www.goisoda.cn/d/file/2018-04-11/1523415683326223.jpg'/>
          <img src='http://www.goisoda.cn/d/file/2018-04-11/1523415683326223.jpg'/>
          <img src='http://www.goisoda.cn/d/file/2018-04-11/1523415683326223.jpg'/>
          <img src='http://www.goisoda.cn/d/file/2018-04-11/1523415683326223.jpg'/>
          <img src='http://www.goisoda.cn/d/file/2018-04-11/1523415683326223.jpg'/>
        </div>
        <div className={styles.shopHeaderCommentList}>
          全部点评
          <div className={styles.line}></div>
          <div className={styles.context}>
          <div className={styles.commentUser}><img className={styles.commentUserImg} src='http://www.goisoda.cn/d/file/2018-04-11/1523415683326223.jpg'/></div>
          <div className={styles.commentUserContext}>
            <div>张三</div>
            <div>****</div>
            <div className={styles.userCommentText}>终于在这个夏天回到了心心念念得北京了，so happy啦❗️第一件事就是找我最最爱的威廉老师设计一款全新的发
              型～威廉老师特别有想法，在北京美发界是排的上名号的！我是被他</div>
            <div className={styles.commentMore}>更多</div>
            <div className={styles.userCommentImg}>
              <img src='http://www.goisoda.cn/d/file/2018-04-11/1523415683326223.jpg'/>
              <img src='http://www.goisoda.cn/d/file/2018-04-11/1523415683326223.jpg'/>
              <img src='http://www.goisoda.cn/d/file/2018-04-11/1523415683326223.jpg'/>
            </div>
            <div>
              <span>7-19</span>
              <div className={styles.userCommentReplay}>回复</div>
              <span className={styles.userCommentPraise}>233</span>
              <i className={'iconfont icon-like1 ' + styles.userCommentPraise}></i>
            </div>
          </div>
        </div>
          <div className={styles.context}>
            <div className={styles.commentUser}><img className={styles.commentUserImg} src='http://www.goisoda.cn/d/file/2018-04-11/1523415683326223.jpg'/></div>
            <div className={styles.commentUserContext}>
              <div>张三</div>
              <div>****</div>
              <div className={styles.userCommentText}>终于在这个夏天回到了心心念念得北京了，so happy啦❗️第一件事就是找我最最爱的威廉老师设计一款全新的发
                型～威廉老师特别有想法，在北京美发界是排的上名号的！我是被他</div>
              <div className={styles.commentMore}>更多</div>
              <div className={styles.userCommentImg}>
                <img src='http://www.goisoda.cn/d/file/2018-04-11/1523415683326223.jpg'/>
                <img src='http://www.goisoda.cn/d/file/2018-04-11/1523415683326223.jpg'/>
                <img src='http://www.goisoda.cn/d/file/2018-04-11/1523415683326223.jpg'/>
              </div>
              <div>
                <span>7-19</span>
                <div className={styles.userCommentReplay}>回复</div>
                <span className={styles.userCommentPraise}>233</span>
                <i className={'iconfont icon-like1 ' + styles.userCommentPraise}></i>
              </div>
            </div>
          </div>
          <div className={styles.commentFooter}>
            更多热评(2019)
          </div>
        </div>
      </div>
      <div className={styles.containerRight}>
        <div className={styles.rightMap}>

        </div>
        <div className={styles.about}>
          相关推荐
          <div className={styles.line}></div>
          <div className={styles.aboutBlock}>
            <img className={styles.blockImg} src='http://www.goisoda.cn/d/file/2018-04-11/1523415683326223.jpg'/>
            <div className={styles.aboutShopName}>北京团结湖店</div>
            <div className={styles.aboutPraise}>*********</div>
            <div className={styles.aboutFoot}>朝阳公园/团结湖 <span>人均/693</span></div>
          </div>
          <div className={styles.aboutBlock}>
            <img className={styles.blockImg} src='http://www.goisoda.cn/d/file/2018-04-11/1523415683326223.jpg'/>
            <div className={styles.aboutShopName}>北京团结湖店</div>
            <div className={styles.aboutPraise}>*********</div>
            <div className={styles.aboutFoot}>朝阳公园/团结湖 <span>人均/693</span></div>
          </div>
          <div className={styles.aboutBlock}>
            <img className={styles.blockImg} src='http://www.goisoda.cn/d/file/2018-04-11/1523415683326223.jpg'/>
            <div className={styles.aboutShopName}>北京团结湖店</div>
            <div className={styles.aboutPraise}>*********</div>
            <div className={styles.aboutFoot}>朝阳公园/团结湖 <span>人均/693</span></div>
          </div>
          <div className={styles.aboutBlock}>
            <img className={styles.blockImg} src='http://www.goisoda.cn/d/file/2018-04-11/1523415683326223.jpg'/>
            <div className={styles.aboutShopName}>北京团结湖店</div>
            <div className={styles.aboutPraise}>*********</div>
            <div className={styles.aboutFoot}>朝阳公园/团结湖 <span>人均/693</span></div>
          </div>
        </div>

      </div>
    </div>
  );
}
