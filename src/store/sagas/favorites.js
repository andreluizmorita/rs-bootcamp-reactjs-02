import { call, put } from 'redux-saga/effects';
import api from '../../services/api';
import moment from 'moment';

import { addFavoriteSuccess } from '../actions/favorites';

export function* addFavorite(action) {
  const { data } = yield call(api.get, `/repos/${action.payload.repository}`);

  const respositoryData = data;
  respositoryData.last_commit = moment(data).fromNow();

  yield put(addFavoriteSuccess(respositoryData));
}
