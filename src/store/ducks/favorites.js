/*
 * Types
 */
export const Types = {
  ADD_REQUEST: 'favorites/ADD_REQUEST',
  ADD_SUCCESS: 'favorites/ADD_SUCCESS',
  ADD_FAILURE: 'favorites/ADD_FAILURE'
};

/*
 * Reducer
 */
const INITIAL_STATE = {
  loading: false,
  data: []
};

export default function favorites(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_REQUEST:
      return { ...state, loading: true };
    case Types.ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload.data]
      };
    default:
      return state;
  }
}

/*
 * ACTIONS
 */

export const Creators = {
  //--- ACTION WITH SAGA = REQUEST -> SAGA -> CHAMADA API -> SUCCESS
  addFavoriteRequest: repository => ({
    type: Types.ADD_REQUEST,
    payload: { repository }
  }),

  addFavoriteSuccess: data => ({
    type: Types.ADD_SUCCESS,
    payload: { data }
  }),

  addFavoriteFailure: data => ({
    type: Types.ADD_FAILURE,
    payload: { data }
  })
};
