import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-router/history-router';
import ErrorPage from './error-page';
const mockStore = configureMockStore();

describe('Component: ErrorPage', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <ErrorPage />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
  });
});
