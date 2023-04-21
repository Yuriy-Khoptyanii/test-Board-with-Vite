/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { IssueState } from '../../types/issue';

const initialState: IssueState = {
  columns: {
    toDo: {
      id: 'toDo',
      title: 'ToDo',
      issueIds: [],
    },
    inProgress: {
      id: 'inProgress',
      title: 'In Progress',
      issueIds: [],
    },
    done: {
      id: 'done',
      title: 'Done',
      issueIds: [],
    },
  },
  issues: {},
};

export const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    setIssues: (state, action) => {
      const issues = action.payload;
      issues.forEach((issue) => {
        state.issues[issue.id] = issue;
        if (issue.state === 'open') {
          if (issue.comments === 0) {
            state.columns.toDo.issueIds.push(issue.id);
          } else {
            state.columns.inProgress.issueIds.push(issue.id);
          }
        } else {
          state.columns.done.issueIds.push(issue.id);
        }
      });
    },
    moveIssue: (state, action) => {
      const { issueId, sourceColumnId, destinationColumnId, destinationIndex } =
        action.payload;
      const sourceColumn = state.columns[sourceColumnId];
      const destinationColumn = state.columns[destinationColumnId];
      const final = sourceColumn.issueIds.filter((el) => +el !== +issueId);
      sourceColumn.issueIds = final;

      destinationColumn.issueIds.splice(destinationIndex, 0, issueId);
    },
  },
});

export const { setIssues, moveIssue } = issuesSlice.actions;

export default issuesSlice.reducer;
