import { call, put } from 'redux-saga/effects';
import api from '../../services/api';
import moment from 'moment';

import { Creators as FavoriteActions } from '../ducks/favorites';

export function* addFavorite(action) {
  try {
    const { data } = yield call(api.get, `/repos/${action.payload.repository}`);

    const respositoryData = data;
    respositoryData.last_commit = moment(data).fromNow();

    yield put(FavoriteActions.addFavoriteSuccess(respositoryData));
  } catch (err) {
    yield put(
      FavoriteActions.addFavoriteFailure('Erro ao adicionar repositório!!')
    );
  }
}
