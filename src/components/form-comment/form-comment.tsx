import {useState, ChangeEvent, FormEvent} from 'react';
import { useAppDispatch } from '../../hooks';
import { postCommentAction } from '../../store/api-actions';

const MIN_LENGTH = 50;
const MAX_LENGTH = 300;

type FormCommentProps = {
  id: number
}

function FormComment({id}: FormCommentProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    rating: '',
    comment: '',
  });

  const [isSubmit, setIsSubmit] = useState(false);

  const isValid = formData.comment.length >= MIN_LENGTH && formData.comment.length <= MAX_LENGTH && formData.rating !== '0';

  const formChangeHandle = (evt: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>) => {
    const {name, value} = evt.target;

    setFormData({...formData, [name]: value});
  };

  const comment = formData.comment;
  const rating = Number(formData.rating);

  const onSubmitForm = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (isValid) {
      setIsSubmit(true);
      dispatch(postCommentAction({id, comment, rating}));
      setFormData({rating: '', comment: ''});
      setIsSubmit(false);
    }
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={onSubmitForm} >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">

        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio"
          checked={formData.rating === '5'}
          onChange={formChangeHandle}
          disabled={isSubmit}
        />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio"
          checked={formData.rating === '4'}
          onChange={formChangeHandle}
          disabled={isSubmit}
        />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio"
          checked={formData.rating === '3'}
          onChange={formChangeHandle}
          disabled={isSubmit}
        />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio"
          checked={formData.rating === '2'}
          onChange={formChangeHandle}
          disabled={isSubmit}
        />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio"
          checked={formData.rating === '1'}
          onChange={formChangeHandle}
          disabled={isSubmit}
        />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea className="reviews__textarea form__textarea" id="comment" name="comment" placeholder="Tell how was your stay, what you like and what can be improved" maxLength={MAX_LENGTH}
        value={formData.comment}
        onChange={formChangeHandle}
        disabled={isSubmit}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isValid}>Submit</button>
      </div>
    </form>
  );
}

export default FormComment;
