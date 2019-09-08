import styles from './index.css';
import { EmojiEditor } from '@/component/editor/emoji';
import { articleSave } from '@/api/article';
import { useEffect, useState } from 'react';
import router from 'umi/router';
import { getClassify } from '@/api/classify';
import Qiniu from '@/component/qiniu/index';

export default function() {

  const [article, setArticle] = useState({ type: 1 });
  const [classifys, setClassifys] = useState([]);
  const url = 'http://pxczv9bs6.bkt.clouddn.com/';

  const editorStyle = {
    height: '30rem',
  };

  useEffect(() => {
    console.log(123);
    getClassify().then(data => data && data.data && setClassifys(data.data));
  }, []);

  function editroChange(text) {
    article.context = text;
  }

  function editorChange(e) {
    article.title = e.target.value;
  }

  function saveArticle() {
    articleSave(article).then(data => router.push('/pc/article'));
  }

  function imgSuccessUpload(res) {
    const images = article.images ?(article.images+ ',' +url+ res.key):(url+ res.key)
      setArticle({ ...article, ...{ images} });
  }

  return (
    <div className={styles.container}>
      {/*<div className={styles.commentPlus}>*/}
      {/*  +*/}
      {/*</div>*/}
      <div className={styles.commentContext}>
        <div className={styles.buttonDiv}>
          <div onClick={() => setArticle({ ...article, ...{ type: 1 } })}
               className={styles.button + ' ' + (article.type === 1 ? styles.buttonActive : '')}>文章
          </div>
          <div onClick={() => setArticle({ ...article, ...{ type: 2 } })}
               className={styles.button + ' ' + (article.type === 2 ? styles.buttonActive : '')}>视频
          </div>
        </div>
        <div className={styles.classify}>
          {classifys.map(classify => <div key={classify.id}
                                          onClick={() => setArticle({ ...article, ...{ classifyId: classify.id } })}
                                          className={styles.button + ' ' + (article.classifyId === classify.id ? styles.buttonActive : '')}>{classify.name}</div>)}
        </div>
        <div className={styles.upload}>
          {article.images&&article.images.split(',').map(m=><img key={m} style={{width:'4rem',height:'4rem',float:'left',marginLeft:'1rem'}} src={m}/>)}
          {article.type === 1 &&<Qiniu onSuccess={imgSuccessUpload}><div style={{width:'4rem',height:'4rem',border:'1px solid #999',textAlign:'center',lineHeight:'4rem',float:'left'}}>+</div></Qiniu>}
        </div>
        {article.type === 2 &&
        <input onChange={(e) => setArticle({ ...article, ...{ video: e.target.value } })}  className={styles.commontInputTitle} placeholder='视频链接'/>}
        <input className={styles.commontInputTitle} value={article.title} onChange={editorChange} placeholder='输入标题'/>
        {/*<textarea rows='25' className={styles.commontInputText} placeholder='添加正文'></textarea>*/}
        <EmojiEditor emoji editorStyle={editorStyle} onChange={editroChange}/>

        <div className={styles.share} onClick={saveArticle}>发布分享</div>
      </div>
    </div>
  );
}
