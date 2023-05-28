import { Fragment, memo } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { getFavorite } from '../../store/favorite/selectors';
import { getAuthorizationStatus, getUserMail } from '../../store/user-process/selectors';

function Header(): JSX.Element {

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userMail = useAppSelector(getUserMail);
  const favorite = useAppSelector(getFavorite);
  const dispatch = useAppDispatch();

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to = {AppRoute.Main} className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              { authorizationStatus === AuthorizationStatus.Auth ?
                <Fragment>
                  <li className="header__nav-item user">
                    <Link to = {AppRoute.Favorite} className="header__nav-link header__nav-link--profile" >
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">{userMail}</span>
                      <span className="header__favorite-count">{favorite.length}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <a className="header__nav-link" onClick={() => dispatch(logoutAction())}>
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </Fragment> :
                <li className="header__nav-item user">
                  <Link to = {AppRoute.Login} className="header__nav-link header__nav-link--profile" >
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li> }
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
