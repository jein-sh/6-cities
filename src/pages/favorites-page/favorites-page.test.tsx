import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-router/history-router';
import { AppRoute, AuthorizationStatus } from '../../const';
import { makeFakeOffer } from '../../test-mocks/test-mocks';
import FavoritesPage from './favorites-page';
const mockStore = configureMockStore();

describe('Component: FavoritesPage', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    history.push(AppRoute.Favorite);

    const mockOffers = [makeFakeOffer()];

    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
      FAVORITE: {isFavoriteLoaded: false, favorite: mockOffers}
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoritesPage />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });
});
