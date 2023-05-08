import './App.css';

import React, { memo } from 'react';

import { LoadingForm } from './components/loadingForm/LoadingForm';
import { TaskList } from './components/taskList/TaskList';

const App: React.FC = () => {
  return (
    <div className="App">
      <LoadingForm />
      <TaskList />
    </div>
  );
};

export default memo(App);
