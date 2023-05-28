import './loading-page.css';

function LoadingPage(): JSX.Element {
  return (
    <div className="page page--gray page--main">

      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <p className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </p>
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--error" >
        <div className="cities" >
          <div className="cities__places-container cities__places-container--empty container" >
            <section className="cities__no-places">
              <div className="cities__status-wrapper">
                <b className="cities__status">Loading ...</b>
              </div>
            </section>
            <div className="cities__right-section"></div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LoadingPage;
