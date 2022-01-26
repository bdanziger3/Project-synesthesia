import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import ColorSlider from './color_slider';
import { storeColor, fetchUser } from '../actions';

const FEATURES = [
  'danceability',
  'energy',
  'speechiness',
  'instrumentalness',
  'liveness',
  'valence',
  'acousticness',
];

const DESCRIPTIONS = {
  danceability: 'Danceability describes how suitable a track is for dancing based on a combination of musical elements',
  energy: 'Energy is a measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy.',
  instrumentalness: 'Instrumentalness predicts whether a track contains no vocals. Sort of like the opposite of speechiness, looks for less vocals.',
  liveness: 'Liveness detects the presence of an audience in the recording, with higher liveness meaning more likely that it is a live track.',
  valence: 'Valence is a measure describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive',
  speechiness: 'Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording, the higher its speechiness.',
  acousticness: 'Acousticness is a confidence measure of whether the track is acoustic',
};

const DEFAULT_SONGS = {
  danceability: '748mdHapucXQri7IAO8yFK',
  energy: '4cG7HUWYHBV6R6tHn1gxrl',
  instrumentalness: '6QLHiPjIohWTyjlURVoljP',
  liveness: '2BITQ360Knh6qNAOqR7Dyq',
  valence: '67BtfxlNbhBmCDR2L2l8qd',
  speechiness: '6Fz2QFZWnlNhjtumFk70Sl',
  acousticness: '7lPN2DXiMsVn7XUKtOW1CS',
};

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderValue: this.props.color[this.props.currentFeature],
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('accessToken');
    if (token) {
      this.props.fetchUser(token);
    }
  }

  getURL = () => {
    if (this.props.user.song_features && this.props.user.song_features[this.props.currentFeature]) {
      const songID = this.props.user.song_features[this.props.currentFeature];
      return `https://open.spotify.com/embed/track/${songID}`;
    } else {
      const songID = DEFAULT_SONGS[this.props.currentFeature];
      return `https://open.spotify.com/embed/track/${songID}`;
    }
  }

  slide = (sliderValue) => {
    this.setState({ sliderValue });
  };

  next = () => {
    this.props.storeColor(this.state.sliderValue, this.props.currentFeature);

    if (this.props.currentFeature !== FEATURES[FEATURES.length - 1]) {
      const nextSong = FEATURES[FEATURES.indexOf(this.props.currentFeature) + 1];
      this.props.history.push(`/${nextSong}${this.props.history.location.search}`);
    } else {
      this.props.history.push(`/results${this.props.history.location.search}`);
    }
  };

  previous = () => {
    this.props.storeColor(this.state.sliderValue, this.props.currentFeature);

    if (this.props.currentFeature !== FEATURES[0]) {
      const prevSong = FEATURES[FEATURES.indexOf(this.props.currentFeature) - 1];
      this.props.history.push(`/${prevSong}${this.props.history.location.search}`);
    } else {
      this.props.history.push(`/getStarted${this.props.history.location.search}`);
    }
  };

  setStyle = () => {
    let leftDot = '';
    let rightDot = '';
    let middleGrad = '';
    if (this.props.currentFeature !== FEATURES[0]) {
      if (this.props.color[FEATURES[FEATURES.indexOf(this.props.currentFeature) - 1]] !== null) {
        const c = this.props.color[FEATURES[FEATURES.indexOf(this.props.currentFeature) - 1]];
        leftDot = `radial-gradient( circle at 0%, hsl(${c}, 70%, 50%, 40%), hsl(${c}, 70%, 50%, 20%) 10%, hsl(0, 0%, 0%, 0%) 20%), `;
      }
    }
    if (this.props.currentFeature !== FEATURES[FEATURES.length - 1]) {
      if (this.props.color[FEATURES[FEATURES.indexOf(this.props.currentFeature) + 1]] !== null) {
        const c = this.props.color[FEATURES[FEATURES.indexOf(this.props.currentFeature) + 1]];
        rightDot = `radial-gradient( circle at 100%, hsl(${c}, 70%, 50%, 40%), hsl(${c}, 70%, 50%, 20%) 10%, hsl(0, 0%, 0%, 0%) 20%), `;
      }
    }
    if (this.state.sliderValue === null) {
      middleGrad = `radial-gradient( hsl(${this.state.sliderValue || 0}, 0%, 95%, 100%), hsl(${this.state.sliderValue || 0}, 0%, 70%, 100%))`;
    } else {
      middleGrad = `radial-gradient( hsl(${this.state.sliderValue || 0}, 100%, 95%, 100%), hsl(${this.state.sliderValue || 0}, 70%, 50%, 50%))`;
    }
    return ({
      background: `${leftDot}${rightDot}${middleGrad}`,
    });
  };

  renderLeft = () => {
    return (
      <IconButton size="medium" type="button" href="#" onClick={this.previous}>
        <KeyboardArrowLeftIcon style={{ fontSize: 80 }} />
      </IconButton>
    );
  }

  renderRight = () => {
    return (
      <IconButton size="medium" type="button" href="#" onClick={this.next}>
        <KeyboardArrowRightIcon style={{ fontSize: 80 }} />
      </IconButton>
    );
  }

  render() {
    return (
      <div id="song-view" style={this.setStyle()}>
        <div id="left-button">
          {this.renderLeft()}
        </div>
        <div id="song-content">
          <p className="feature-description">{DESCRIPTIONS[this.props.currentFeature]}</p>
          <p className="feature-description">What color do you associate with {this.props.currentFeature}?</p>
          <iframe className="frame" title="song" src={this.getURL()} width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media" />
          <ColorSlider
            value={this.state.sliderValue || 0}
            onChange={this.slide}
          />
        </div>
        <div id="right-button">
          {this.renderRight()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return (
    {
      color: state.color,
      user: state.auth.user,
    }
  );
};

export default withRouter(connect(mapStateToProps, { storeColor, fetchUser })(Quiz));
