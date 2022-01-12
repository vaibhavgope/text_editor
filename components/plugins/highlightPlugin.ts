import { RichUtils } from 'draft-js';

const highlight = () => {
  return {
    customStyleMap: {
      HIGHLIGHT: {
        background: '#fffe0d',
      },
    },
    keyBindingFn: (e: any) => {
      if (e.metaKey && e.key === 'h') {
        return 'highlight';
      }
    },
    handleKeyCommand: (
      command: any,
      editorState: any,
      { setEditorState }: any
    ) => {
      if (command === 'highlight') {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHT'));
        return true;
      }
    },
  };
};
export default highlight;
