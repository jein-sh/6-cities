import LoadingPage from '../loading-page/loading-page';
import ErrorPage from '../error-page/error-page';
import Header from '../../components/header/header';
import BookmarkButton from '../../components/bookmark-button/bookmark-button';
import ReviewsList from '../../components/reviews-list/reviews-list';
import FormComment from '../../components/form-comment/form-comment';
import Map from '../../components/map/map';
import OfferList from '../../components/offer-list/offer-list';
import { useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../const';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getComments, getCurrentOffer, getNearbyOffers, getOfferLoadedStatus } from '../../store/room-data/selectors';

function RoomPage(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const currentOffer = useAppSelector(getCurrentOffer);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const isOfferLoaded = useAppSelector(getOfferLoadedStatus);
  const comments = useAppSelector(getComments);

  if (isOfferLoaded) {
    return (
      <LoadingPage />
    );
  }

  if (!currentOffer) {
    return <ErrorPage />;
  }

  const reviews = comments.slice(0,10);

  const {id, price, title, rating, images, isPremium, isFavorite, goods, bedrooms, maxAdults, description, type, host: {name, isPro, avatarUrl}} = currentOffer;
  const starsFull = String(rating * 100 / 5);
  const premium = isPremium ? <div className="property__mark"><span>Premium</span></div> : null;
  const pro = isPro ? <span className="property__user-status"></span> : null;
  const imagesOffer = images.slice(0,6);

  return (
    <div className="page">

      <Header />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {imagesOffer.map((image) =>(
                <div key={image} className="property__image-wrapper">
                  <img className="property__image" src={image} alt="Room" />
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {premium}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>

                <BookmarkButton favorite = {isFavorite} id = {id} btnMods = {'property'}/>

              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: `${starsFull}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((item)=>(
                    <li key={item} className="property__inside-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {name}
                  </span>

                  {pro}

                </div>
                <div className="property__description">
                  <p className="reviews__text">{description}</p>
                </div>
              </div>
              <section className="property__reviews reviews">

                <ReviewsList reviews={reviews} />

                { authorizationStatus === AuthorizationStatus.Auth ? <FormComment id = {id}/> : null }

              </section>
            </div>
          </div>
          <section className="property__map map">

            <Map offers= {nearbyOffers} mainOffer={currentOffer} mapMods = {'big'} />

          </section>
        </section>

        { nearbyOffers.length !== 0 ?

          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>

              <OfferList offers={nearbyOffers} cardMods={'near-places'} />

            </section>
          </div> : null }

      </main>
    </div>
  );
}

export default RoomPage;
