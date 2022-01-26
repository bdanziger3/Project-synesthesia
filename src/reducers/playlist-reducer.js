import { ActionTypes } from '../actions';

const initialState = {
  id: '',
  error: false,
};

const PlaylistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_PLAYLIST:
      return { ...state, id: action.payload.id };
    case ActionTypes.RESET_PLAYLIST:
      return { ...state, id: '' };
    case ActionTypes.PLAYLIST_ERROR:
      return { ...state, error: true };
    default:
      return state;
  }
};

export default PlaylistReducer;
