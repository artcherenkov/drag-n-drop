import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import {DragDropContext} from 'react-beautiful-dnd';

import Column from './column'
import initialData from './initial-data';

const App = () => {
  const [state, setState] = useState(initialData);

  const onDragEnd = result => {
    // TODO: reorder columns
    const {destination, source, draggableId} = result;

    if (!destination) {
      return;
    }

    if (
      destination.draggableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const column = state.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {...column, taskIds: newTaskIds};

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newColumn.id]: newColumn,
      }
    }

    setState(newState);
  }

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      {state.columnOrder.map((columnId) => {
        const column = state.columns[columnId];
        const tasks = column.taskIds.map(taskId => state.tasks[taskId]);

        return <Column key={column.id} column={column} tasks={tasks} />
      })}
    </DragDropContext>
  )
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
