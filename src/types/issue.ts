// type IssueState = 'open' | 'closed';
type IssueStatus = 'ToDo' | 'In Progress' | 'Done';

export interface Issue {
  id: number;
  number: string;
  comments: number;
  status: IssueStatus;
  title: string;
  user: { login: string };
  assignee: string;
  created_at: string;
  order: number;
  state: string;
}

export interface ColumnInfo {
  id: string;
  title: string;
  issueIds: string[];
}

export interface IssueColumn {
  id: number;
  number: string;
  comments: number;
  status: IssueStatus;
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
    [id: string]: IssueColumn;
  };
}
