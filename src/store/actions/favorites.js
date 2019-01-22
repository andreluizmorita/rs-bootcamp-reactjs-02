export const addFavorite = () => ({
  type: 'ADD_FAVORITE'
});

//--- ACTION WITH SAGA = REQUEST -> SAGA -> CHAMADA API -> SUCCESS
export const addFavoriteRequest = repository => ({
  type: 'ADD_FAVORITE_REQUEST',
  payload: { repository }
});

export const addFavoriteSuccess = data => ({
  type: 'ADD_FAVORITE_SUCCESS',
  payload: { data }
});
