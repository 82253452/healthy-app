import styles from './index.css';
import Editor from 'draft-js-plugins-editor';
import { stateToHTML } from 'draft-js-export-html';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import React, { useEffect, useRef, useState } from 'react';
import { EditorState } from 'draft-js';
import 'draft-js-emoji-plugin/lib/plugin.css';
import { stateFromHTML } from 'draft-js-import-html';

export function EmojiEditor(props) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editor = useRef(null);
  const [emojiPlugin, setEmojiPlugin] = useState(createEmojiPlugin({emojiSelectPopover:{width:'100px'}}));
  const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

  useEffect(() => {
    props.content===''&&setEditorState(EditorState.createEmpty())
  }, [props.content]);

  function focusEditor() {
    editor.current.focus();
  }

  function editroChange(editorState) {
    setEditorState(editorState);
    props.onChange && props.onChange(stateToHTML(editorState.getCurrentContent()));
  }

  return (
    <div>
      <div onClick={focusEditor} className={styles.editor + ' ' + (props.readOnly && styles.border)}
           style={props.editorStyle}>
        <Editor plugins={[emojiPlugin]} ref={editor} editorState={editorState}
                onChange={editorState => editroChange(editorState)} readOnly={props.readOnly}/>
        {props.emoji && <EmojiSuggestions/>}
      </div>
      <div className={styles.options} style={props.emojiStyle}>
        {props.emoji && <EmojiSelect/>}
      </div>
    </div>
  );
}
