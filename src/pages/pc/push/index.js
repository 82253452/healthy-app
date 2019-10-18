import styles from './index.css';
import  '@/assets/style/style.css';
import { EmojiEditor } from '@/component/editor/emoji';
import { articleSave } from '@/api/article';
import { useEffect, useState } from 'react';
import router from 'umi/router';
import { getClassify } from '@/api/classify';
import Qiniu from '@/component/qiniu/index';
import Message from '@/component/alert/message';

export default function() {

  const [article, setArticle] = useState({ type: 1 });
  const [classifys, setClassifys] = useState([]);
  const url = 'http://images.y456.cn/';

  const editorStyle = {
    height: '20rem',
  };

  useEffect(() => {
    console.log(123);
    getClassify().then(data => data && data.data && setClassifys(data.data.filter(d=>d.type===2)));
  }, []);

  function editroChange(text) {
    article.context = text;
  }

  function editorChange(e) {
    article.title = e.target.value;
  }

  function saveArticle() {
    if(!article.title) {Message.open('请输入标题');return}
    if(!article.type){ Message.open('请输入选择类型') ;return}
    if(!article.classifyId) {Message.open('请选择分类') ;return}
    if(article.type===1&&!article.image) {Message.open('请选择头图') ;return}
    if(article.type===2&&!article.video) {Message.open('请输入选择视频') ;return}
    articleSave(article).then(data => router.push('/pc/article'));
  }

  function imgSuccessUpload(res) {
      setArticle({ ...article, ...{image:url+ res.key} });
  }
  function imgsSuccessUpload(res) {
    const images = article.images ?(article.images+ ',' +url+ res.key):(url+ res.key)
    setArticle({ ...article, ...{ images} });
  }
  function videoSuccessUpload(res) {
    setArticle({ ...article, ...{video:url+ res.key} });
  }

  return (
    <div className={styles.container}>
      {/*<div className={styles.commentPlus}>*/}
      {/*  +*/}
      {/*</div>*/}
      <div className={styles.commentContext}>
        <div className={styles.buttonDiv}>
          <div className={styles.button+' '+styles.header}>类型</div>
          <div onClick={() => setArticle({ ...article, ...{ type: 1 } })}
               className={styles.button + ' ' + (article.type === 1 ? styles.buttonActive : '')}>文章
          </div>
          <div onClick={() => setArticle({ ...article, ...{ type: 2 } })}
               className={styles.button + ' ' + (article.type === 2 ? styles.buttonActive : '')}>视频
          </div>
        </div>
        <div className={styles.classify}>
          <div className={styles.button+' '+styles.header}>分类</div>
          {classifys.map(classify => <div key={classify.id}
                                          onClick={() => setArticle({ ...article, ...{ classifyId: classify.id } })}
                                          className={styles.button + ' ' + (article.classifyId === classify.id ? styles.buttonActive : '')}>{classify.name}</div>)}
        </div>
        {
          article.type === 1 && <div className={styles.upload}>
            <div className={styles.headerImgTitle}>头图</div>
            {article.image&&<img style={{width:'4rem',height:'4rem',float:'left',marginRight:'1rem'}} src={article.image}/>}
            {!article.image &&<Qiniu onSuccess={imgSuccessUpload}><div className={styles.uploadImg}>+</div></Qiniu>}
          </div>
        }
        {
          article.type === 1 &&<div className={styles.upload}>
            <div className={styles.headerImgTitle}>图片详情</div>
            {article.images&&article.images.split(',').map(m=><img key={m} style={{width:'4rem',height:'4rem',float:'left',marginRight:'1rem'}} src={m}/>)}
            {<Qiniu onSuccess={imgsSuccessUpload}><div className={styles.uploadImg}>+</div></Qiniu>}
          </div>
        }
        {
          article.type === 2 && <div className={styles.upload}>
            <div className={styles.headerImgTitle}>视频</div>
            {article.video&&<video style={{width:'4rem',height:'4rem'}} src={article.video}></video>}
            {!article.video &&<Qiniu video onSuccess={videoSuccessUpload}><div className={styles.uploadImg}>+</div></Qiniu>}
          </div>
        }
        <input className={styles.commontInputTitle} value={article.title} onChange={editorChange} placeholder='输入标题'/>
        {/*<textarea rows='25' className={styles.commontInputText} placeholder='添加正文'></textarea>*/}
        <div className={styles.zdy}>
          <EmojiEditor emoji emojiStyleClass={styles.zdyinput} editorStyle={editorStyle} onChange={editroChange}/>

        </div>

        <div className={styles.share} onClick={saveArticle}>发布分享</div>
      </div>
    </div>
  );
}
