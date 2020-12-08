import styled from 'styled-components';
import React from 'react';
import {Droppable} from 'react-beautiful-dnd';

import Task from './task';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;
  
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 8px;
`;

const TaskList = styled.div`
  padding: 8px;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
  transition: background-color 0.2s ease; 
  flex-grow: 1;
  min-height: 100px;
  position: relative;
`;

const Placeholder = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: ${props => props.placeholderProps.clientY}px;
  left: ${props => props.placeholderProps.clientX}px;
  width: ${props => props.placeholderProps.clientWidth}px;
  border: 1px dashed grey;
  color: grey;
  borderRadius: 2px;
  padding: 7px;
  opacity: 0.6;
`

const renderTask = (task, index) => (
  <Task key={task.id} task={task} index={index} />
);

const Column = ({column, tasks, isDropDisabled, placeholderProps}) => {
  return (
    <Container>
      <Title>{column.title}</Title>
      <Droppable droppableId={column.id} isDropDisabled={isDropDisabled}>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
            {...provided.droppableProps}
          >
            {tasks.map(renderTask)}
            {provided.placeholder}
            {placeholderProps && snapshot.isDraggingOver && (
              <Placeholder placeholderProps={placeholderProps}>{placeholderProps.content}</Placeholder>
            )}
          </TaskList>
        )}
      </Droppable>
    </Container>
  )
}

export default Column;
