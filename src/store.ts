import { configureStore } from '@reduxjs/toolkit';

import issuesSliceReducer from './components/taskList/TaskListSlice.slice';

export const store = configureStore({
  reducer: {
    issues: issuesSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
