import { ActionTypes } from '../actions';

const initialState = {
  all: [],
  current: {},
};

const SongReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_SONGS:
      return { ...state, all: action.payload };
    case ActionTypes.FETCH_SONG:
      return { ...state, current: action.payload };
    default:
      return state;
  }
};

export default SongReducer;
