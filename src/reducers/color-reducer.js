import { ActionTypes } from '../actions';

const initialState = {
  danceability: null,
  energy: null,
  acousticness: null,
  speechiness: null,
  instrumentalness: null,
  liveness: null,
  valence: null,

  playlist_color: null,
};

const ColorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.STORE_COLOR:
      switch (action.payload.attribute) {
        case 'danceability':
          return { ...state, danceability: action.payload.color };
        case 'energy':
          return { ...state, energy: action.payload.color };
        case 'acousticness':
          return { ...state, acousticness: action.payload.color };
        case 'speechiness':
          return { ...state, speechiness: action.payload.color };
        case 'instrumentalness':
          return { ...state, instrumentalness: action.payload.color };
        case 'liveness':
          return { ...state, liveness: action.payload.color };
        case 'valence':
          return { ...state, valence: action.payload.color };
        default:
          return state;
      }
    case ActionTypes.SAVE_PLAYLIST_COLOR:
      return { ...state, playlist_color: action.payload.color };
    case ActionTypes.UPDATE_COLOR_MAP:
      return state;
    default:
      return state;
  }
};

export default ColorReducer;
