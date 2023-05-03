/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Issue, IssueState, movePayload } from '../../types/allTypes';

export const initialState: IssueState = {
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
  key: '',
  urlOwner: '',
  urlRepo: '',
  owner: '',
  repo: '',
};

export const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    setUrls: (state, action) => {
      state.urlRepo = action.payload.urlRepo;
      state.urlOwner = action.payload.urlOwner;
      state.owner = action.payload.owner;
      state.repo = action.payload.repo;
    },
    setIssues: (state, action) => {
      const issues = action.payload.data;
      const key = action.payload.key;
      state.key = key;

      if (!localStorage.getItem(key)) {
        issues.forEach((issue: Issue) => {
          state.issues[issue.id] = issue;
          if (issue.state === 'open') {
            if (issue.comments === 0) {
              state.columns.toDo.issueIds.push(issue.id.toString());
            } else {
              state.columns.inProgress.issueIds.push(issue.id.toString());
            }
          } else {
            state.columns.done.issueIds.push(issue.id.toString());
          }
        });
        localStorage.setItem(key, JSON.stringify(state));
      } else {
        const storedState = JSON.parse(localStorage.getItem(key) as string);
        Object.assign(state, storedState);
      }
    },

    moveIssue: (state, action: PayloadAction<movePayload>) => {
      const { issueId, sourceColumnId, destinationColumnId, destinationIndex } =
        action.payload;

      const sourceColumn = state.columns[sourceColumnId];
      const destinationColumn = state.columns[destinationColumnId];
      const final = sourceColumn.issueIds.filter((el: string) => +el !== +issueId);
      sourceColumn.issueIds = final;

      destinationColumn.issueIds.splice(destinationIndex, 0, issueId);

      localStorage.setItem(state.key, JSON.stringify(state));
    },
  },
});

export const { setIssues, moveIssue, setUrls } = issuesSlice.actions;

export default issuesSlice.reducer;
