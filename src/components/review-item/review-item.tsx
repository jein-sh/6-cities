import dayjs from 'dayjs';
import {Review} from '../../types/review';

type ReviewProps = {
  review: Review;
}

function ReviewItem({review}: ReviewProps): JSX.Element {

  const {comment, date, rating, user: {avatarUrl, isPro, name}} = review;
  const stars = String(rating * 100 / 5);
  const pro = isPro ? <span className="property__user-status"></span> : null;
  const humanizeDate = dayjs(date).format('MMMM YYYY');

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={`/${avatarUrl}`} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {name}
        </span>
        {pro}
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${stars}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={date}>{humanizeDate}</time>
      </div>
    </li>
  );
}

export default ReviewItem;
