// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';
import ColorReducer from './color-reducer';
import oauthReducer from './oauth-reducer';
import PlaylistReducer from './playlist-reducer';
import SongReducer from './song-reducer';
import UserReducer from './user-reducer';

const rootReducer = combineReducers({
  auth: oauthReducer,
  songs: SongReducer,
  color: ColorReducer,
  user: UserReducer,
  playlist: PlaylistReducer,
});

export default rootReducer;
