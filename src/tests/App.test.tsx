import '@testing-library/jest-dom/extend-expect';

import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { App } from '../App';
import { store } from '../store';

const url = 'https://github.com/facebook/react';

beforeAll(() =>
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  ),
);

describe('App', () => {
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
    console.log(input);
    expect(input.value).toBe(url);
  });
});
