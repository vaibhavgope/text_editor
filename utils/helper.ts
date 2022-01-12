export function getSelectionEntity(editorState: any) {
  let entity;
  const selection = editorState.getSelection();
  let start = selection.getStartOffset();
  let end = selection.getEndOffset();
  if (start === end && start === 0) {
    end = 1;
  } else if (start === end) {
    start -= 1;
  }
  const block = getSelectedBlock(editorState);

  for (let i = start; i < end; i += 1) {
    const currentEntity = block.getEntityAt(i);
    if (!currentEntity) {
      entity = undefined;
      break;
    }
    if (i === start) {
      entity = currentEntity;
    } else if (entity !== currentEntity) {
      entity = undefined;
      break;
    }
  }
  return entity;
}

export function getSelectedBlock(editorState: any) {
  if (editorState) {
    return getSelectedBlocksList(editorState).get(0);
  }
  return undefined;
}

export function getSelectedBlocksList(editorState: any) {
  return getSelectedBlocksMap(editorState).toList();
}

export function getSelectedBlocksMap(editorState: any) {
  const selectionState = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const startKey = selectionState.getStartKey();
  const endKey = selectionState.getEndKey();
  const blockMap = contentState.getBlockMap();
  return blockMap
    .toSeq()
    .skipUntil((_: any, k: any) => k === startKey)
    .takeUntil((_: any, k: any) => k === endKey)
    .concat([[endKey, blockMap.get(endKey)]]);
}
