const draggedTaskDataset = `data-rbd-drag-handle-draggable-id`;
const targetColumnDataset = `data-rbd-droppable-id`;

const getColumn = columnId => (
  document.querySelector(`[${targetColumnDataset}='${columnId}']`)
);

const getDraggedTask = draggableId => (
  document.querySelector(`[${draggedTaskDataset}='${draggableId}']`)
);

export const getPlaceholderBounds = (update) => {
  const destinationColumn = update.destination.droppableId;
  const sourceColumn = update.source.droppableId;

  if (destinationColumn === sourceColumn) {
    const draggedDOM = getDraggedTask(update.draggableId);
    if (!draggedDOM) {
      return;
    }
    const { clientHeight, clientWidth } = draggedDOM;

    const destinationIndex = update.destination.index;
    const sourceIndex = update.source.index;


    const targetColumn = getColumn(destinationColumn)

    const targetColumnTasks = [...targetColumn.children];
    const movedItem = targetColumnTasks[sourceIndex];
    targetColumnTasks.splice(sourceIndex, 1);

    const updatedArray = [
      ...targetColumnTasks.slice(0, destinationIndex),
      movedItem,
      ...targetColumnTasks.slice(destinationIndex + 1)
    ];


    const clientY =
      parseFloat(window.getComputedStyle(targetColumn).paddingTop) +
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
      clientX: parseFloat(window.getComputedStyle(targetColumn).paddingLeft)
    }
  }
  else {
    const draggedDOM = getDraggedTask(update.draggableId);
    if (!draggedDOM) {
      return;
    }
    const { clientHeight, clientWidth } = draggedDOM;

    const destinationIndex = update.destination.index;
    const targetColumn = getColumn(destinationColumn)
    const targetColumnTasks = [...targetColumn.children];

    const clientY =
      parseFloat(window.getComputedStyle(targetColumn).paddingTop) +
      targetColumnTasks.slice(0, destinationIndex).reduce((total, curr) => {
        const style = window.getComputedStyle(curr);
        const marginBottom = parseFloat(style.marginBottom);
        const borders = parseFloat(style.borderBottom) * 2;

        return total + curr.clientHeight + marginBottom + borders;
      }, 0);

    return {
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(window.getComputedStyle(targetColumn).paddingLeft)
    }
  }


}
