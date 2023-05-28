import { memo } from 'react';
import {Offer, Offers} from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type OfferListProps = {
  offers: Offers;
  cardMods: string;
  updateCurrentOffer?: (offer : Offer | undefined) => void;
}

function OfferList({offers, cardMods, updateCurrentOffer}: OfferListProps): JSX.Element {

  let listClass : string;

  if (cardMods === 'favorite') {
    listClass = 'favorites__places';
  } else if (cardMods === 'near-places') {
    listClass = 'near-places__list places__list';
  } else {
    listClass = 'cities__places-list places__list tabs__content';
  }

  return (
    <div className={listClass}>
      {offers.map((offer) => {
        const keyValue = offer.id.toString();

        return(
          <PlaceCard
            key={keyValue}
            offer={offer}
            updateCurrentOffer={updateCurrentOffer ? () => updateCurrentOffer(offer) : undefined}
            cardMods={cardMods}
          />
        );
      })}
    </div>
  );
}

export default memo(OfferList);
