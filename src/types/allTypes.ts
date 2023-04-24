export interface ColumnInfo {
  id: string;
  title: string;
  issueIds: string[];
}

export interface Issue {
  id: number;
  number: string;
  comments: number;
  title: string;
  user: { login: string };
  assignee: string;
  created_at: string;
  order: number;
  state: string;
}

export interface IssueState {
  columns: {
    toDo: ColumnInfo;
    inProgress: ColumnInfo;
    done: ColumnInfo;
  };
  issues: {
    [id: string]: Issue;
  };
  key: string;
  urlOwner: string;
  urlRepo: string;
  owner: string;
  repo: string;
}

export type StatusColumn = 'toDo' | 'inProgress' | 'done';

export interface movePayload {
  issueId: string;
  sourceColumnId: StatusColumn;
  destinationColumnId: StatusColumn;
  destinationIndex: number;
}
