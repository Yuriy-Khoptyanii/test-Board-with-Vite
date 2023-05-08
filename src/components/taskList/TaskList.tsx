import './TaskList.css';

import React, { memo } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store';
import { StatusColumn } from '../../types/allTypes';
import { Column } from '../column/Column';
import { moveIssue } from './TaskListSlice.slice';

export const TaskList: React.FC = memo(() => {
  const dispatch = useDispatch();

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) {
      return;
    }

    dispatch(
      moveIssue({
        issueId: draggableId,
        sourceColumnId: source.droppableId as StatusColumn,
        destinationColumnId: destination.droppableId as StatusColumn,
        destinationIndex: destination.index,
      }),
    );
  };

  const { columns, issues, urlOwner, urlRepo, repo, owner } = useSelector(
    (state: RootState) => state.issues,
  );

  return urlRepo.length > 0 ? (
    <>
      <div className="TaskList_url">
        <a href={urlOwner}>{owner.charAt(0).toUpperCase() + owner.slice(1)}</a>
        <p>{'>'}</p>
        <a href={urlRepo}>{repo.charAt(0).toUpperCase() + repo.slice(1)}</a>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="TaskList_column">
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
    </>
  ) : null;
});

TaskList.displayName = 'TaskList';
