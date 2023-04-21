import './App.css';

import React from 'react';
import { Provider } from 'react-redux';

import { LoadingForm } from './components/loadingForm/LoadingForm';
import { TaskList } from './components/taskList/TaskList';
import { store } from './store';

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <LoadingForm />
        <TaskList />
      </div>
    </Provider>
  );
};
