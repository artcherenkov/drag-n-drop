const queryAttr = "data-rbd-drag-handle-draggable-id";
const getDraggedDom = draggableId => {
  const domQuery = `[${queryAttr}='${draggableId}']`;
  return document.querySelector(domQuery);
};

export const getPlaceholderBounds = (update) => {
  const draggedDOM = getDraggedDom(update.draggableId);
  if (!draggedDOM) {
    return;
  }

  const destinationIndex = update.destination.index;
  const sourceIndex = update.source.index;

  const { clientHeight, clientWidth } = draggedDOM;
  const childrenArray = [...draggedDOM.parentNode.children];
  const movedItem = childrenArray[sourceIndex];
  childrenArray.splice(sourceIndex, 1);
  const updatedArray = [
    ...childrenArray.slice(0, destinationIndex),
    movedItem,
    ...childrenArray.slice(destinationIndex + 1)
  ];

  let clientY =
    parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) +
    updatedArray.slice(0, destinationIndex).reduce((total, curr) => {
      const style = window.getComputedStyle(curr);
      const marginBottom = parseFloat(style.marginBottom);
      const borders = parseFloat(style.borderBottom) * 2;
      return total + curr.clientHeight + marginBottom + borders;
    }, 0);

  return {
    clientHeight,
    clientWidth,
    clientY,
    clientX: parseFloat(
      window.getComputedStyle(draggedDOM.parentNode).paddingLeft
    )
  }
}
