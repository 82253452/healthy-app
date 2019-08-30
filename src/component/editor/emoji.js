import styles from './index.css';
import Editor from 'draft-js-plugins-editor';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import React, { useRef, useState } from 'react';
import { EditorState } from 'draft-js';
import 'draft-js-emoji-plugin/lib/plugin.css';

const emojiPlugin = createEmojiPlugin({useNativeArt: true});
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

export function EmojiEditor(props) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editor = useRef(null);

  function focusEditor() {
    editor.current.focus();
  }

  return (
    <div>
      <div onClick={focusEditor} className={styles.editor}>
        <Editor plugins={[emojiPlugin]} ref={editor} editorState={editorState}
                onChange={editorState => setEditorState(editorState)}/>
        <EmojiSuggestions/>
      </div>
      <div className={styles.options}>
        <EmojiSelect/>
      </div>
    </div>
  );
}
