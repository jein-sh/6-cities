import {useRef, useEffect, memo} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import { useNavigate } from 'react-router-dom';
import {Icon, Marker} from 'leaflet';
import useMap from '../../hooks/useMap/useMap';
import 'leaflet/dist/leaflet.css';
import { Offer, Offers } from '../../types/offer';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';
import { getCity } from '../../store/offers-data/selectors';
import { fetchCommentsAction, fetchCurrentOfferAction, fetchNearbyOffersAction } from '../../store/api-actions';
import './map.css';

type MapProps = {
  offers: Offers;
  currentOffer?: Offer;
  mainOffer?: Offer;
  mapMods: string;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [14, 39]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [14, 39]
});

function Map({offers, currentOffer, mainOffer, mapMods}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const city = useAppSelector(getCity);
  const map = useMap(mapRef, city);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (map) {
      const markers: Marker[] = [];

      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        }, {
          icon: defaultCustomIcon,
        });
        marker
          .setIcon(
            offer === currentOffer ? currentCustomIcon : defaultCustomIcon
          )
          .addTo(map);

        markers.push(marker);

        marker.on('click', () => {
          dispatch(fetchCurrentOfferAction(offer.id));
          dispatch(fetchNearbyOffersAction(offer.id));
          dispatch(fetchCommentsAction(offer.id));
          navigate (`/offer/${offer.id}`);
        });
      });

      if (mainOffer) {
        const mainMarker = new Marker ({
          lat: mainOffer.location.latitude,
          lng: mainOffer.location.longitude
        }, {
          icon: currentCustomIcon,
        });
        mainMarker.addTo(map);
        markers.push(mainMarker);
      }

      return () => markers.forEach((marker) => map.removeLayer(marker));
    }


  }, [map, city, offers, currentOffer, mainOffer, navigate, dispatch]);

  return <div className={`map-intro map-intro--${mapMods}`} ref={mapRef}></div>;
}

export default memo(Map);
