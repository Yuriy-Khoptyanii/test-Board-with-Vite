import React, { memo } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Col, Container, Row } from 'react-bootstrap';

import { ColumnInfo, Issue } from '../../types/allTypes';
import { Card } from '../card/Card';

type Props = {
  column: ColumnInfo;
  issues: {
    [id: string]: Issue;
  };
};

export const Column: React.FC<Props> = memo(({ column, issues }) => {
  return (
    <Container className="bg-light rounded-4">
      <Row>
        <Col>
          <p className="fs-5 fw-bold text-center mt-3">{column.title}</p>
        </Col>
      </Row>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {column.issueIds.map((issueId, index) => {
              const issue = issues[+issueId];
              return (
                <Row key={issue.id}>
                  <Col>
                    <Card issue={issue} index={index} />
                  </Col>
                </Row>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Container>
  );
});

Column.displayName = 'Column';
