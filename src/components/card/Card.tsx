import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import IssueCard from 'react-bootstrap/Card';

import { Issue } from '../../types/issue';
import { TimeAdapt } from '../../utils/TimeAdapt';

type Props = {
  issue: Issue;
  index: number;
};

export const Card: React.FC<Props> = ({ issue, index }) => {
  return (
    <Draggable key={issue.id} draggableId={issue.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <IssueCard className="m-3">
            <IssueCard.Body>
              <IssueCard.Title className="fs-6 card-title h5 mb-3">
                {issue.title}
              </IssueCard.Title>
              <IssueCard.Text className="fs-6 text-muted card-text mb-1">{`#${
                issue.number
              } opened ${TimeAdapt(issue.created_at)} ago`}</IssueCard.Text>
              <IssueCard.Text className="fs-6 text-muted card-text">{`${issue.user.login} | Comments: ${issue.comments}`}</IssueCard.Text>
            </IssueCard.Body>
          </IssueCard>
        </div>
      )}
    </Draggable>
  );
};
