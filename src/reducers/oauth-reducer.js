import { ActionTypes } from '../actions';

const initialState = {
  authenticated: false,
  newUser: true,
  user: '',
  libraryUpdated: false,
};

const oauthReducer = (state = initialState, action) => {
  console.log('oauth reducer', action.payload);
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return {
        ...state, authenticated: true, user: action.payload,
      };
    case ActionTypes.EXIST_USER:
      return {
        ...state, newUser: false,
      };
    case ActionTypes.DEAUTH_USER:
      return { ...state, authenticated: false };
    case ActionTypes.AUTH_ERROR:
      return { ...state, authenticated: false };
    case ActionTypes.UPDATE_COLOR_MAP:
      return { ...state, user: { ...state.user, feature_map: action.payload } };
    case ActionTypes.UPDATE_USER_LIBRARY:
      return { ...state, ...action.payload };
    case ActionTypes.SET_GUEST:
      return { ...state, user: { name: 'guest' } };
    default:
      return state;
  }
};

export default oauthReducer;
