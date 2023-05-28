import {HashRouter, Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import MainPage from '../../pages/main-page/main-page';
import RoomPage from '../../pages/room-page/room-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import ErrorPage from '../../pages/error-page/error-page';
import LoadingPage from '../../pages/loading-page/loading-page';
import { useAppSelector } from '../../hooks';
import HistoryRouter from '../history-router/history-router';
import browserHistory from '../../browser-history';
import { getDataLoadedStatus } from '../../store/offers-data/selectors';
import PrivateFavoriteRoute from '../private-route/private-favoritе-route';
import PrivateLoginRoute from '../private-route/private-login-route';

import './main.css';

function App(): JSX.Element {

  const isDataLoaded = useAppSelector(getDataLoadedStatus);

  if (isDataLoaded) {
    return (
      <LoadingPage />
    );
  }

  return (
    // <HistoryRouter history={browserHistory}>
    <HashRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage />}
        />
        <Route
          path={AppRoute.Login}
          element={
            <PrivateLoginRoute>
              <LoginPage />
            </PrivateLoginRoute>
          }
        />
        <Route
          path={AppRoute.Favorite}
          element={
            <PrivateFavoriteRoute>
              <FavoritesPage />
            </PrivateFavoriteRoute>
          }
        />
        <Route
          path={AppRoute.Room}
          element={<RoomPage />}
        />
        <Route
          path="*"
          element={<ErrorPage />}
        />
      </Routes>
      </HashRouter>
    // </HistoryRouter>
  );
}

export default App;
