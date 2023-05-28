import { useNavigate } from 'react-router-dom';
import { cities } from '../../cities';
import Header from '../../components/header/header';
import OfferList from '../../components/offer-list/offer-list';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { resetFavorite } from '../../store/favorite/favorite';
import { getFavorite, getFavoriteLoadedStatus } from '../../store/favorite/selectors';
import { cityChoice } from '../../store/offers-data/offers-data';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getFilterOffers } from '../../untils';
import LoadingPage from '../loading-page/loading-page';

function FavoritesPage(): JSX.Element {
  const favorite = useAppSelector(getFavorite);
  const isFavoriteLoaded = useAppSelector(getFavoriteLoadedStatus);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  if (authorizationStatus !== AuthorizationStatus.Auth) {
    navigate(AppRoute.Main);
    dispatch(resetFavorite);
  }

  if (isFavoriteLoaded) {
    return (
      <LoadingPage />
    );
  }

  return (
    <div className={`page ${favorite.length === 0 ? 'page--favorites-empty' : ''}`}>

      <Header />

      <main className={`page__main ${favorite.length === 0 ? 'page__main--favorites-empty' : 'page__main--favorites'}`}>
        <div className="page__favorites-container container">
          { favorite.length !== 0 ?
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {cities.map((city) => {
                  const filteredFavorite = getFilterOffers(favorite, city);

                  if (filteredFavorite.length !== 0) {
                    return (
                      <li className="favorites__locations-items" key={city.name}>
                        <div className="favorites__locations locations locations--current">
                          <div className="locations__item">
                            <a className="locations__item-link" onClick={() => {navigate(AppRoute.Main); dispatch(cityChoice({currentCity: city}));}}>
                              <span>{city.name}</span>
                            </a>
                          </div>
                        </div>

                        <OfferList offers={filteredFavorite} cardMods={'favorite'} />

                      </li>
                    );
                  }
                })}
              </ul>
            </section> :
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>}
        </div>
      </main>

      <footer className="footer container">
        <a className="footer__logo-link" onClick={() => navigate(AppRoute.Main)}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}

export default FavoritesPage;
