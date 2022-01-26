import { ActionTypes } from '../actions';
// confused if this reducer is even necesary,
// do we need to do anything with the redux state here???

const initialState = {
  authenticated: false,
  newUser: true,
  user: '',
};

const UserReducer = (state = initialState, action) => {
  console.log('user reducer', action.payload);
  switch (action.type) {
    case ActionTypes.UPDATE_USER_TRACKS:
      return {
        ...state, authenticated: true, user: action.payload,
      };
    case ActionTypes.UPDATE_COLOR_MAP:
      return state;
    default:
      return state;
  }
};

export default UserReducer;
