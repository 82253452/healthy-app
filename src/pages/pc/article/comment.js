import styles from './info.css';
import { EmojiEditor } from '@/component/editor/emoji';
import { articleSave } from '@/api/article';
import { useState } from 'react';
import router from 'umi/router';

export default function() {

  const [article, setArticle] = useState({});

  const editorStyle = {
    height: '30rem',
  };

  function editroChange(text) {
    article.context = text;
  }

  function editorChange(e) {
    article.title = e.target.value;
  }

  function saveArticle() {
    articleSave(article).then(data => router.push('/pc/article'));
  }

  return (
    <div className={styles.container}>
      <div className={styles.commentPlus}>
        +
      </div>
      <div>
        <div>文章</div>
        <div>视频</div>
      </div>
      <div className={styles.commentContext}>
        <input className={styles.commontInputTitle} value={article.title} onChange={editorChange} placeholder='输入标题'/>
        {/*<textarea rows='25' className={styles.commontInputText} placeholder='添加正文'></textarea>*/}
        <EmojiEditor emoji editorStyle={editorStyle} onChange={editroChange}/>
        <div className={styles.share} onClick={saveArticle}>发布分享</div>
      </div>
    </div>
  );
}
