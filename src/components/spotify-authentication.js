/* eslint-disable max-len */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { fetchUser, updateUserTracks, updateUserLibrary, setGuest } from '../actions/index';

const CLIENT_ID = 'e3bb090f8a4440029a0f8c05630d1aef';
const AUTHORIZE_URL = 'https://accounts.spotify.com/authorize';

// const REDIRECT_URL = 'http://localhost:9090/api/callback';
const REDIRECT_URL = 'https://project-api-synesthesia.herokuapp.com/api/callback';
const SCOPES = 'user-top-read user-library-read playlist-modify-public ugc-image-upload';

const SpotifyButton = withStyles((theme) => ({
  root: {
    color: '#1DB954',
    backgroundColor: 'white',
    width: 400,
    height: 80,
    borderStyle: 'solid',
    borderRadius: 40,
    transition: 'background-color 0.5s',
    '&:hover': {
      backgroundColor: 'rgb(255, 136, 0)',
    },
  },
}))(Button);

const ContinueButton = withStyles((theme) => ({
  root: {
    color: 'white',
    backgroundColor: '#1DB954',
    width: 400,
    height: 80,
    borderStyle: 'solid',
    borderRadius: 40,
    transition: 'background-color 0.5s',
    '&:hover': {
      backgroundColor: 'rgb(255, 136, 0)',
    },
  },
}))(Button);

const Arrow = ({ onClick }) => {
  return (
    <svg version="1.1"
      id="Capa_1"
      className="arrows"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="160px"
      height="80px"
      viewBox="0 0 375.01 375.01"
      onClick={onClick}
    >
      <g fill="white" stroke="white">
        <g>
          <path fill="white" stroke="white" d="M330.254,210.966c-56.916,1.224-110.16,25.704-167.076,28.764c-16.524,0.612-33.048-1.224-45.9-8.568c23.256-4.283,45.288-12.239,61.812-27.54c17.749-15.911,19.584-45.287,8.568-66.095c-10.404-19.584-36.72-20.196-55.08-15.3C89.125,132.63,59.75,184.65,84.229,221.369c-26.928,1.836-53.856,0-80.172,1.225c-5.508,0.611-5.508,8.567,0.612,8.567c26.928,1.836,59.364,4.284,91.188,2.448c1.836,1.225,3.672,3.061,5.508,4.284c64.872,45.288,159.732-11.628,229.5-13.464C338.821,223.817,338.821,210.354,330.254,210.966z M89.737,196.277c-6.732-25.091,15.3-46.511,35.496-56.916c20.196-10.404,48.96-10.404,55.692,15.912c7.956,30.6-18.36,48.959-43.452,56.916c-11.628,3.672-22.644,6.12-34.272,7.344C96.47,213.413,92.186,206.069,89.737,196.277z" />
          <path fill="white" stroke="white" d="M371.869,211.577c-8.567-5.508-16.523-11.016-24.479-16.523c-6.732-4.896-13.464-10.404-21.42-12.24c-6.12-1.836-12.24,7.344-6.732,11.627c6.732,4.896,14.076,9.18,20.809,13.464c4.896,3.061,9.792,6.732,14.075,9.792c-4.896,2.448-9.792,4.284-14.688,6.732c-3.672,1.836-7.956,3.672-11.628,5.508c-1.224,0.612-2.448,1.836-3.061,3.06c-1.836,2.448-0.611,1.225,0,0.612c-2.447,1.836-2.447,7.956,1.837,7.344l0,0c1.224,0.612,2.447,0.612,4.283,0.612c4.284-1.224,9.181-3.06,13.464-4.896c9.181-3.673,18.36-7.345,26.929-12.24C376.153,220.758,376.153,214.025,371.869,211.577z" />
        </g>
      </g>
    </svg>
  );
};

class spotAuth extends Component {
  componentDidMount() {
    const url = window.location.href;
    if (url.includes('?message=authSuccess')) {
      const tokenStartIndex = url.indexOf('accessToken') + 12;
      const accessToken = url.substring(tokenStartIndex, url.length);
      this.props.fetchUser(accessToken);
    }
  }

  handleLogin = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('spotifyID');
    window.location.replace(`${AUTHORIZE_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=${SCOPES}&response_type=code&show_dialog=true`);
  };

  toQuiz = () => {
    localStorage.setItem('spotifyID', this.props.user.spotifyID);
    localStorage.setItem('accessToken', this.props.user.accessToken);
    this.props.updateUserLibrary(this.props.user);
    this.props.history.push('/danceability');
  }

  toQuizGuest = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('spotifyID');
    this.props.setGuest();
    this.props.history.push('/danceability?message=authGuest?');
  }

  tryAgain = () => {
    this.props.history.push('/auth');
  }

  render() {
    const url = window.location.href;
    if (url.includes('?message=authSuccess')) {
      const { spotifyID } = this.props.user;
      return (
        <div id="welcome" className="auth success">
          <h2> User: {spotifyID} logged in with Spotify. </h2>
          <button type="button" variant="contained" color="secondary" onClick={this.toQuiz}>continue to quiz</button>
        </div>
      );
    } else if (url.includes('?message=authFailure')) {
      return (
        <div id="welcome" className="auth failure">
          <h2> Uh oh. There was an error logging in. </h2>
          <button type="button" variant="contained" color="secondary" onClick={this.tryAgain}>Try again</button>
        </div>
      );
    } else {
      return (
        <div id="get-started">
          <div id="spotify-login">
            <p className="title-text">Sign in with Spotify</p>
            <SpotifyButton type="button" variant="contained" color="secondary" onClick={this.handleLogin}>
              <img className="spotify-img" alt="spotify" src="https://1000logos.net/wp-content/uploads/2021/04/Spotify-logo.png" />
            </SpotifyButton>
            <p className="description-text">Allow the app to access your music library  <br />so
              we can tailor the experience by <br />using songs
              you already love
            </p>
          </div>
          <div id="guest-login">
            <p className="title-text">Continue as a Guest</p>
            <ContinueButton type="button" variant="contained" color="secondary" onClick={this.toQuizGuest}>
              <Arrow />
            </ContinueButton>
            <p className="description-text">Explore your color to music associations <br />
              with songs we picked out <br />
            </p>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}

export default withRouter(connect(mapStateToProps, { fetchUser, updateUserTracks, updateUserLibrary, setGuest })(spotAuth));
