import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { fetchCommentsAction, fetchCurrentOfferAction, fetchNearbyOffersAction } from '../../store/api-actions';
import {Offer} from '../../types/offer';
import BookmarkButton from '../bookmark-button/bookmark-button';

type PlaceCardProps = {
  offer: Offer;
  updateCurrentOffer?: (offer: Offer | undefined)=> void;
  cardMods: string;
}

function PlaceCard({offer, updateCurrentOffer, cardMods}: PlaceCardProps): JSX.Element {

  const {id, price, title, rating, type, previewImage, isPremium, isFavorite} = offer;
  const starsFull = String(rating * 100 / 5);

  const dispatch = useAppDispatch();

  const onClickCardHandle = () => {
    dispatch(fetchCurrentOfferAction(id));
    dispatch(fetchNearbyOffersAction(id));
    dispatch(fetchCommentsAction(id));
  };

  const onCardMouseMove = () => {
    if (updateCurrentOffer) {
      updateCurrentOffer(offer);
    }
  };

  return (
    <article className={`${cardMods}__card place-card`} onMouseMove={onCardMouseMove}>

      {isPremium ? <div className="place-card__mark"><span>Premium</span></div> : null}

      <div className={`${cardMods}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${id}`} onClick = {onClickCardHandle}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place" />
        </Link>
      </div>
      <div className={`place-card__info ${cardMods === 'favorites' ? 'favorites__card-info' : ''}`} >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

          <BookmarkButton favorite = {isFavorite} id = {id} btnMods = {'place-card'}/>

        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${starsFull}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`} onClick = {onClickCardHandle}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default memo(PlaceCard);
