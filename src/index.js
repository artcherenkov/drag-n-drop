import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import {DragDropContext} from 'react-beautiful-dnd';

import Column from './column'
import initialData from './initial-data';

const App = () => {
  const [state] = useState(initialData);

  const onDragEnd = result => {
    // TODO: reorder columns
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
