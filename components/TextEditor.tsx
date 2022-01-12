import React, { useRef, useState, useEffect, MutableRefObject } from 'react';
import styles from '../styles/Home.module.css';
import {
  Editor,
  EditorState,
  ContentState,
  convertFromRaw,
  RichUtils,
  EditorBlock,
  AtomicBlockUtils,
} from 'draft-js';
import { getSelectionEntity } from '../utils/helper';

const emptyContentState = convertFromRaw({
  entityMap: {},
  blocks: [
    {
      text: '',
      key: 'foo',
      type: 'unstyled',
      entityRanges: [],
      inlineStyleRanges: [],
      depth: 0,
    },
  ],
});
interface PropTypes {
  name?: string;
  value?: string;
  onChange?: Function;
}

const blockRenderer = (contentBlock: any) => {
  const type = contentBlock.getType();

  if (type === 'atomic') {
    return {
      component: Component,
      editable: true,
      props: {
        foo: 'bar',
      },
    };
  }
};

const Component = (props: any) => {
  // const { block, contentState, blockProps } = props;
  // const data = contentState.getEntity(block.getEntityAt(0)).getData();

  // console.log(props, data, blockProps);

  return (
    <div style={{ border: '1px solid #f00' }}>
      <EditorBlock {...props} />
      <button>Bold</button>
      <button>Italic</button>
      <button>Insert block</button>
    </div>
  );
};

const TextEditor = ({ name, value, onChange }: PropTypes) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(emptyContentState)
  );
  const textInput = useRef() as MutableRefObject<any>;

  const _onBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };
  const _onItalicClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  };

  const insertBlock = () => {
    const contentState = editorState.getCurrentContent();

    const contentStateWithEntity = contentState.createEntity(
      'TEST',
      'MUTABLE',
      { a: 'b' }
    );

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });

    setEditorState(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ')
    );
  };

  useEffect(() => {
    textInput.current.focus();
  }, []);

  useEffect(() => {
    setEditorState(
      EditorState.createWithContent(ContentState.createFromText(value || ''))
    );
  }, [value]);

  return (
    <div className={styles.container}>
      <h1>Text editor</h1>
      <div style={{ backgroundColor: 'rgb(241, 241, 241)' }}>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          ref={textInput}
          blockRendererFn={blockRenderer}
        />
      </div>
      <button onClick={_onBoldClick}>Bold</button>
      <button onClick={_onItalicClick}>Italic</button>
      <button onClick={insertBlock}>Insert block</button>
    </div>
  );
};

export default TextEditor;
