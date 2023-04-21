import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { ColumnInfo, Issue } from '../../types/issue';
// import { Issue } from '../../types/issue';
import { Card } from '../card/Card';

type Props = {
  column: ColumnInfo;
  issues: any;
};

export const Column: React.FC<Props> = ({ column, issues }) => {
  return (
    <Container className="bg-light" style={{ height: 'max-content' }}>
      <Row>
        <Col>
          <p className="fs-5 fw-bold text-center">{column.title}</p>
        </Col>
      </Row>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {column.issueIds.map((issueId, index) => {
              const issue = issues[issueId];
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
};
