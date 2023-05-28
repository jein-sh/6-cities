import './error-page.css';

function ErrorPage(): JSX.Element {
  return (
    <main className="page__main page__main--error" >
      <div className="cities" >
        <div className="cities__places-container cities__places-container--empty container" >
          <section className="cities__no-places">
            <div className="cities__status-wrapper">
              <b className="cities__status">404<br />Page not found</b>
              <a href="/" className="cities__status-description">Go to main page</a>
            </div>
          </section>
          <div className="cities__right-section"></div>
        </div>
      </div>
    </main>
  );
}

export default ErrorPage;
