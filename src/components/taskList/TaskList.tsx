import './TaskList.css';

import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { Column } from '../column/Column';
import { moveIssue } from './TaskListSlice.slice';

export const TaskList: React.FC = () => {
  const dispatch = useDispatch();

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) {
      return;
    }

    dispatch(
      moveIssue({
        issueId: draggableId,
        sourceColumnId: source.droppableId,
        destinationColumnId: destination.droppableId,
        destinationIndex: destination.index,
      }),
    );
  };

  const { columns, issues } = useSelector((state) => state.issues);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="TaskList">
        {Object.values(columns).map((column) => (
          <Container key={column.id}>
            <Row>
              <Col>
                <Column column={column} issues={issues} />
              </Col>
            </Row>
          </Container>
        ))}
      </div>
    </DragDropContext>
  );
};
