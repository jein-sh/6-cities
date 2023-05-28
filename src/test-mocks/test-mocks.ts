import {faker}  from "@faker-js/faker";
import {Host, Offer} from '../types/offer';
import {cities} from '../cities';
import {Review} from '../types/review';
import { City } from '../types/city';
import { UserData } from '../types/user-data';

export const makeFakeCity = (): City => cities[faker.number.int(cities.length - 1)];

export const makeFakeHost = (): Host => ({
  avatarUrl: faker.image.avatar(),
  id: faker.number.int(100),
  isPro: faker.datatype.boolean(),
  name: faker.person.fullName()
});

export const makeFakeUser = (): UserData => ({
  avatarUrl: faker.image.avatar(),
  email: faker.internet.email(),
  id: faker.number.int(100),
  isPro: faker.datatype.boolean(),
  name: faker.person.fullName(),
  token: 'secret',
});

export const makeFakeOffer = (): Offer => ({
  bedrooms: faker.number.int({min: 1, max: 5}),
  city: makeFakeCity(),
  description: faker.lorem.sentence(),
  goods: new Array(faker.number.int({min: 1, max: 10})).fill(faker.lorem.word()),
  host: makeFakeHost(),
  id: faker.number.int(1000),
  images: new Array(faker.number.int({min: 1, max: 6})).fill(faker.image.urlLoremFlickr({category: "city"})),
  isFavorite: faker.datatype.boolean(),
  isPremium: faker.datatype.boolean(),
  location: {
    latitude: faker.location.latitude({ max: 54, min: 48, precision: 6}),
    longitude: faker.location.longitude({ max: 10, min: 2, precision: 6}),
    zoom: 12,
  },
  maxAdults: faker.number.int({min: 1, max: 5}),
  previewImage: faker.image.urlLoremFlickr({category: "city"}),
  price: faker.number.int({min: 10, max: 10000}),
  rating: faker.number.float({min: 1, max: 5, precision: 0.1}),
  title: faker.lorem.words(20),
  type: faker.lorem.words(1),
});

export const makeFakeReview = (): Review => ({
  comment: faker.lorem.words(30),
  date: String(new Date(faker.date.recent())),
  id: faker.number.int(),
  rating: faker.number.int({min: 1, max: 5}),
  user: {
    avatarUrl: faker.image.avatar(),
    id: faker.number.int(100),
    isPro: faker.datatype.boolean(),
    name: faker.person.fullName()
  }
});
