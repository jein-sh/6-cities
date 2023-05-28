import {useAppDispatch, useAppSelector} from '../../hooks';
import { useState } from 'react';
import { checkFavoriteAction } from '../../store/api-actions';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useNavigate } from 'react-router-dom';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

type BookmarkButtonProps = {
  id: number;
  favorite: boolean;
  btnMods: string;
}

function BookmarkButton({id, favorite, btnMods}: BookmarkButtonProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const [isFavorite, setIsFavorite] = useState<boolean>(favorite);

  const onClickBookmarkHandle = () => {
    if(authorizationStatus === AuthorizationStatus.Auth) {
      setIsFavorite(!isFavorite);

      const status = Number(!isFavorite);
      dispatch(checkFavoriteAction({id, status}));
    } else {
      navigate(AppRoute.Login);
    }
  };

  const btnWidth = btnMods === 'property' ? '31' : '18';
  const btnHeght = btnMods === 'property' ? '33' : '19';

  return (
    <button className={`${btnMods}__bookmark-button button ${isFavorite ? `${btnMods}__bookmark-button--active` : ''}`} type="button" onClick = {onClickBookmarkHandle}>
      <svg className={`${btnMods}__bookmark-icon`} width={btnWidth} height={btnHeght}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default BookmarkButton;
