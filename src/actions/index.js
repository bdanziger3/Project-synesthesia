import axios from 'axios';

// const ROOT_URL = 'http://localhost:9090/api';
const ROOT_URL = 'https://project-api-synesthesia.herokuapp.com/api';

const API_KEY = '?key=isaac_spokes';

// keys for actiontypes
export const ActionTypes = {
  FETCH_SONGS: 'FETCH_SONGS',
  FETCH_SONG: 'FETCH_SONG',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
  EXIST_USER: 'EXIST_USER',
  SET_GUEST: 'SET_GUEST',
  STORE_COLOR: 'STORE_COLOR',
  SAVE_PLAYLIST_COLOR: 'SAVE_PLAYLIST_COLOR',
  UPDATE_COLOR_MAP: 'UPDATE_COLOR_MAP',
  UPDATE_USER_TRACKS: 'UPDATE_USER_TRACKS',
  UPDATE_USER_LIBRARY: 'UPDATE_USER_LIBRARY',
  UPDATE_PLAYLIST_COLOR: 'UPDATE_PLAYLIST_COLOR',
  UPDATE_PLAYLIST: 'UPDATE_PLAYLIST',
  RESET_PLAYLIST: 'RESET_PLAYLIST',
  PLAYLIST_ERROR: 'PLAYLIST_ERROR',
};

export function fetchSongs() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/songs${API_KEY}`)
      .then((response) => {
        dispatch({
          type: ActionTypes.FETCH_SONGS,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function fetchSong(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/songs/${id}${API_KEY}`)
      .then((response) => {
        dispatch({
          type: ActionTypes.FETCH_SONG,
          payload: response.data[0],
        });
        console.log('LOGGING SONG AT FETCH SONG');
        console.log(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

// i think these are both depricated, if commenting out doesn't cause
// problems these can eventually be deleted -laurel
// export function authenticate() {
//   return (dispatch) => {
//     dispatch({ type: ActionTypes.AUTH_USER });
//   };
// }

// export function userExists() {
//   return (dispatch) => {
//     dispatch({ type: ActionTypes.EXIST_USER });
//   };
// }

export function fetchUser(accessToken) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/getuser/${accessToken}/`)
      .then((response) => {
        dispatch({ type: ActionTypes.AUTH_USER, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function updateUser(user) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/update/${user.spotifyID}`, user)
      .then((response) => {
        dispatch({ type: ActionTypes.AUTH_USER, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function setGuest() {
  return (dispatch) => {
    dispatch({ type: ActionTypes.SET_GUEST });
  };
}

export function updateUserTracks(user) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/updateTracks/${user.spotifyID}`, user)
      .then((response) => {
        dispatch({ type: ActionTypes.UPDATE_USER_TRACKS, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function updateUserLibrary(user) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/updateLibrary/${user.spotifyID}`, user)
      .then((response) => {
        console.log('action.js update lib', response.data);
        dispatch({ type: ActionTypes.UPDATE_USER_LIBRARY, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function updateUserColorMap(user, map) {
  console.log(user);
  console.log(map);
  return (dispatch) => {
    axios.put(`${ROOT_URL}/updateMap/${user.spotifyID}`, { user, map })
      .then((response) => {
        dispatch({ type: ActionTypes.UPDATE_COLOR_MAP, payload: response.data.feature_map });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function storeColor(color, attribute) {
  return {
    type: ActionTypes.STORE_COLOR,
    payload: {
      color,
      attribute,
    },
  };
}

export function savePlaylistColor(color) {
  return {
    type: ActionTypes.SAVE_PLAYLIST_COLOR,
    payload: {
      color,
    },
  };
}

export function fetchPlaylist(userID, color, numSongs) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/playlist`, {
      id: userID,
      color,
      n_songs: numSongs,
    }).then((response) => {
      dispatch({ type: ActionTypes.UPDATE_PLAYLIST, payload: response.data });
    }).catch((error) => {
      dispatch({ type: ActionTypes.PLAYLIST_ERROR, payload: error });
    });
  };
}

export function resetPlaylist() {
  return {
    type: ActionTypes.RESET_PLAYLIST,
  };
}
