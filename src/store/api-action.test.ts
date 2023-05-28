import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {checkAuthAction, checkFavoriteAction, fetchCommentsAction, fetchCurrentOfferAction, fetchFavoriteAction, fetchNearbyOffersAction, fetchOffersAction, loginAction, logoutAction, postCommentAction} from './api-actions';
import {APIRoute} from '../const';
import {State} from '../types/state';
import { makeFakeOffer, makeFakeReview, makeFakeUser } from '../test-mocks/test-mocks';
import { AuthData } from '../types/api-data';

const fakeHistory = {
  location: {pathname: ''},
  push(path: string) {
    this.location.pathname = path;
  },
};

jest.mock('../browser-history', () => fakeHistory);

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('Should dispatch fetchOffersAction when GET /hotels', async () => {
    const mockOffers = [makeFakeOffer()];
    mockAPI
      .onGet(APIRoute.Offers)
      .reply(200, mockOffers);

    const store = mockStore();

    await store.dispatch(fetchOffersAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchOffersAction.pending.type,
      fetchOffersAction.fulfilled.type
    ]);
  });

  it('Should dispatch fetchFavoriteAction on GET /favorite', async () => {
    const fakeOffers = [makeFakeOffer()];

    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(200, fakeOffers);

    const store = mockStore();

    await store.dispatch(fetchFavoriteAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFavoriteAction.pending.type,
      fetchFavoriteAction.fulfilled.type
    ]);
  });

  it('Should dispatch checkFavoriteAction on POST /favorite/5/1', async () => {
    const fakeOffers = [makeFakeOffer()];

    mockAPI
      .onPost(APIRoute.Favorite.concat(`/5/1`))
      .reply(200, fakeOffers);

    const store = mockStore();

    await store.dispatch(checkFavoriteAction({id: 5, status: 1}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkFavoriteAction.pending.type,
      fetchFavoriteAction.pending.type,
      checkFavoriteAction.fulfilled.type
    ]);
  });

  it('Should dispatch fetchCurrentOfferAction on GET /hotels/{id}', async () => {
    const fakeOffer = makeFakeOffer();

    mockAPI
      .onGet(APIRoute.Offers.concat(`/12`))
      .reply(200, fakeOffer);

    const store = mockStore();

    await store.dispatch(fetchCurrentOfferAction(12));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchCurrentOfferAction.pending.type,
      fetchCurrentOfferAction.fulfilled.type
    ]);
  });

  it('Should dispatch fetchNearbyOffersAction on GET /hotels/{id}/nearby', async () => {
    const fakeOffers = [makeFakeOffer()];

    mockAPI
      .onGet(APIRoute.Offers.concat('/5/nearby'))
      .reply(200, fakeOffers);

    const store = mockStore();

    await store.dispatch(fetchNearbyOffersAction(5));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchNearbyOffersAction.pending.type,
      fetchNearbyOffersAction.fulfilled.type
    ]);
  });

  it('Should dispatch fetchCommentsAction on GET /comments/{id}', async () => {
    const fakeComments = [makeFakeReview()];

    mockAPI
      .onGet(APIRoute.Comments.concat('/5'))
      .reply(200, fakeComments);

    const store = mockStore();

    await store.dispatch(fetchCommentsAction(5));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchCommentsAction.pending.type,
      fetchCommentsAction.fulfilled.type
    ]);
  });

  it('Should dispatch postCommentAction on POST /comments/{id}', async () => {
    const fakeComment = makeFakeReview();
    const {comment, rating} = fakeComment;

    mockAPI
      .onPost(APIRoute.Comments.concat('/5'))
      .reply(200, fakeComment);

    const store = mockStore();

    await store.dispatch(postCommentAction({id: 5, comment: comment, rating: rating}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      postCommentAction.pending.type,
      postCommentAction.fulfilled.type
    ]);
  });

  it('Should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();
    const fakeUser = makeFakeUser();

    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, fakeUser);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type
    ]);
  });
  it('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
    const fakeUser: AuthData = {email: 'test@test.ru', password: '123abc'};

    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, {token: 'secret'});

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      loginAction.fulfilled.type
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('six-cities-token', 'secret');
  });

  it('should dispatch logoutAction when DELETE /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('six-cities-token');
  });
});
