import { Cities } from './types/city';

export const DEFAULT_CITY = {
  location: {
    latitude:  48.8534100,
    longitude: 2.3488000,
    zoom: 12,
  },
  name: 'Paris',
};

export const cities: Cities = [
  {
    location: {
      latitude:  48.8534100,
      longitude: 2.3488000,
      zoom: 12,
    },
    name: 'Paris',
  },
  {
    location: {
      latitude: 50.9333300,
      longitude: 6.9500000,
      zoom: 12,
    },
    name: 'Cologne',
  },
  {
    location: {
      latitude: 50.8504500,
      longitude: 4.3487800,
      zoom: 12,
    },
    name: 'Brussels',
  },
  {
    location: {
      latitude:  52.3740300,
      longitude: 4.8896900,
      zoom: 12,
    },
    name: 'Amsterdam',
  },
  {
    location: {
      latitude: 53.5753200,
      longitude: 10.0153400,
      zoom: 12,
    },
    name: 'Hamburg',
  },
  {
    location: {
      latitude: 51.2217200,
      longitude: 6.7761600,
      zoom: 12,
    },
    name: 'Dusseldorf',
  }
];
