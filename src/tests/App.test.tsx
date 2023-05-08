import '@testing-library/jest-dom/extend-expect';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';

import { loadingIssues } from '../api';
import App from '../App';
// import { TaskList } from '../components/taskList/TaskList';
import { initialState } from '../components/taskList/TaskListSlice.slice';
// import issuesSliceReducer from '../components/taskList/TaskListSlice.slice';
import { store } from '../store';
import { mockStore } from './mock';

const url = 'https://github.com/facebook/react';

beforeAll(() =>
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  ),
);

jest.mock('../api');

describe('App testing', () => {
  it('renders start App screen', () => {
    expect(
      screen.getByText('Please, enter example: https://github.com/facebook/react'),
    ).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders changes to the input', () => {
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    const input = container.querySelector('.LoadingForm input') as any;
    fireEvent.change(input, { target: { value: url } });
    expect(input.value).toBe(url);
  });

  it.only('redux work check', async () => {
    const searchUrl = 'https://github.com/facebook/react';
    const owner = 'facebook';
    const repo = 'react';
    const data = [
      { id: 1, title: 'Issue 1' },
      { id: 2, title: 'Issue 2' },
    ];
    const urlRepo = searchUrl;
    const urlOwner = `https://github.com/${owner}/`;

    (loadingIssues as jest.Mock).mockResolvedValue({
      data,
      key: `${owner + repo}`,
      urlRepo,
      urlOwner,
      owner,
      repo,
    });

    const newStore = mockStore({
      issues: initialState,
    });
    const { container } = render(
      <Provider store={newStore}>
        <App />
      </Provider>,
    );
    const input = container.querySelector('.LoadingForm input') as any;
    fireEvent.change(input, { target: { value: url } });

    const button = container.querySelector('.LoadingForm button') as any;
    fireEvent.click(button);
    expect(loadingIssues).toHaveBeenCalledWith(searchUrl);
    await waitFor(
      () => {
        const actions = newStore.getActions();
        console.log({ actions });
        expect(actions).toHaveLength(2);
        expect(actions[0].type).toEqual('issues/setIssues');
        console.log(newStore.getState());
      },
      { timeout: 5000, interval: 500 },
    );

    const storeActions = newStore.getActions();
    const lastAction = storeActions[storeActions.length - 1];
    expect(lastAction.type).toEqual('issues/setUrls');
    expect(lastAction.payload).toEqual({ owner, repo, urlOwner, urlRepo });
    // expect(await screen.getByTestId('TaskList')).toBeInTheDocument();
  });
});
