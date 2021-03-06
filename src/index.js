import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import {DragDropContext} from 'react-beautiful-dnd';
import styled from 'styled-components';

import Column from './column'
import initialData from './initial-data';
import {getPlaceholderBounds} from './utils/placeholder';

const Container = styled.div`
  display: flex;
`

const App = () => {
  const [state, setState] = useState(initialData);
  const [placeholderProps, setPlaceholderProps] = useState(null);

  const onDragEnd = result => {
    setPlaceholderProps(null);
    const {destination, source, draggableId} = result;

    setState({
      ...state,
      homeIndex: null,
    })

    if (!destination) {
      return;
    }

    if (
      destination.draggableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {...start, taskIds: newTaskIds};

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        }
      }

      setState(newState);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    }

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    }

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    }

    setState(newState);
  }

  const onDragUpdate = update => {
    if(!update.destination){
      return;
    }

    setPlaceholderProps(getPlaceholderBounds(update));
  }

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      onDragUpdate={onDragUpdate}
    >
      <Container>
        {state.columnOrder.map((columnId, index) => {
          const column = state.columns[columnId];
          const tasks = column.taskIds.map(
            taskId => state.tasks[taskId]
          );

          const isDropDisabled = index < state.homeIndex;
          return (
            <Column
              key={column.id}
              column={column}
              tasks={tasks}
              isDropDisabled={isDropDisabled}
              placeholderProps={placeholderProps}
            />
          )
        })}
      </Container>
    </DragDropContext>
  )
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
