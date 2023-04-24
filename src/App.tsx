import './App.css';

import React from 'react';
import { useSelector } from 'react-redux';

import { LoadingForm } from './components/loadingForm/LoadingForm';
import { TaskList } from './components/taskList/TaskList';
import { IssueState } from './types/allTypes';

export const App: React.FC = () => {
  const { urlRepo } = useSelector((state: IssueState) => state.issues);
  return (
    <div className="App">
      <LoadingForm />
      {urlRepo && <TaskList />}
    </div>
  );
};
