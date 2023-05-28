import { Fragment } from 'react';
import { Reviews } from '../../types/review';
import ReviewItem from '../review-item/review-item';

type reviewsListProps = {
  reviews: Reviews;
}

function reviewsList({reviews}: reviewsListProps): JSX.Element {

  return (
    <Fragment>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((review) => {
          const keyValue = review.id.toString();

          return(
            <ReviewItem
              key={keyValue}
              review={review}
            />
          );
        })}
      </ul>
    </Fragment>
  );
}

export default reviewsList;
