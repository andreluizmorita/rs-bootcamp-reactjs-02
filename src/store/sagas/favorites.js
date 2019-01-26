import { call, put, select } from 'redux-saga/effects';
import api from '../../services/api';
import moment from 'moment';

import { Creators as FavoriteActions } from '../ducks/favorites';

export function* addFavorite(action) {
  try {
    const { data } = yield call(api.get, `/repos/${action.payload.repository}`);

    const isDuplicate = yield select(state =>
      state.favorites.data.find(favorite => favorite.id === data.id)
    );

    if (isDuplicate) {
      yield put(FavoriteActions.addFavoriteFailure('Repositório duplicado!'));
    } else {
      const respositoryData = data;
      respositoryData.last_commit = moment(data).fromNow();

      yield put(FavoriteActions.addFavoriteSuccess(respositoryData));
    }
  } catch (err) {
    yield put(
      FavoriteActions.addFavoriteFailure('Erro ao adicionar repositório!!')
    );
  }
}
