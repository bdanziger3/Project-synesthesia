// This component will show the results of the quiz
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUserColorMap, fetchUser } from '../actions';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: false,
      colorMapError: false,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('accessToken');
    if (token) {
      this.props.fetchUser(token);
      this.setState({ user: true });
    } else {
      this.setState({ user: false });
    }
  }

  styleGradient = (color) => {
    if (color === null) {
      return (
        { background: 'radial-gradient(ellipse, hsl(0, 0%, 50%), hsl(0, 0%, 80%))',
          boxShadow: '0px 0px 10px 10px 0' }
      );
    } else {
      return (
        { background: `radial-gradient(ellipse, hsl(${color}, 100%, 50%), hsl(${color}, 100%, 80%))`,
          boxShadow: `0px 0px 10px 10px ${color}` }
      );
    }
  };

  checkNulls = () => {
    if (this.props.colors.danceability === null
      || this.props.colors.energy === null
      || this.props.colors.instrumentalness === null
      || this.props.colors.liveness === null
      || this.props.colors.speechiness === null
      || this.props.colors.valence === null
      || this.props.colors.acousticness === null) {
      console.log('it empty');
      return true;
    } else {
      return false;
    }
  }

  backToQuiz = () => {
    this.props.history.push(`/danceability${this.props.history.location.search}`);
  }

  renderError = () => {
    if (this.state.colorMapError === true) {
      return (
        <div id="error-content">
          <p className="error-message">Error: colormap not set, go back and retake quiz</p>
          <button id="send to quiz start" type="button" variant="contained" color="secondary" onClick={this.backToQuiz}>back to quiz</button>
        </div>
      );
    } else {
      return (null);
    }
  };

  send = () => {
    if (this.checkNulls() === true) {
      return (() => {
        this.setState({ colorMapError: true });
      });
    } else {
      return (() => {
        this.props.updateUserColorMap(this.props.user, this.props.colors);
        this.props.history.push(`/makePlaylist${this.props.history.location.search}`);
      });
    }
  };

  render() {
    if (this.state.user) {
      return (
        <div id="results">
          <h1>Results:</h1>
          <p>based on your answers, we think you associate <br />these audio features with these colors:</p>
          <div className="resultsBoard">
            <button
              type="button"
              className="feature"
              style={this.styleGradient(this.props.colors.danceability)}
            > <h3>danceability</h3>
              <span className="featureDescrip"> Danceability describes how suitable a track is for dancing based on a combination
                of musical elements including tempo, rhythm stability, beat strength, and overall regularity.
              </span>
            </button>
            <button
              type="button"
              className="feature"
              style={this.styleGradient(this.props.colors.energy)}
            > <h3>energy</h3>
              <span className="featureDescrip"> Represents a perceptual measure of intensity and activity. Typically, energetic tracks
                feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale.
                Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.
              </span>
            </button>
            <button
              type="button"
              className="feature"
              style={this.styleGradient(this.props.colors.acousticness)}
            > <h3>acousticness</h3>
              <span className="featureDescrip"> A confidence measure of whether the track is acoustic. Acoustic songs have less artificial/electric noise. </span>
            </button>
            <button
              type="button"
              className="feature"
              style={this.styleGradient(this.props.colors.speechiness)}
            > <h3>speechiness</h3>
              <span className="featureDescrip"> detects the presence of spoken words in a track. The more exclusively speech-like the
                recording (e.g. talk show, audio book, poetry), the higher the speechiness.
              </span>
            </button>
            <button
              type="button"
              className="feature"
              style={this.styleGradient(this.props.colors.instrumentalness)}
            > <h3>instrumentalness</h3>
              <span className="featureDescrip"> Whether a track contains no vocals. “Ooh” and “aah” sounds
                are treated as instrumental in this context. Rap or spoken word tracks are clearly “vocal”.
              </span>
            </button>
            <button
              type="button"
              className="feature"
              style={this.styleGradient(this.props.colors.liveness)}
            > <h3>liveness</h3>
              <span className="featureDescrip"> Detects the presence of an audience in the recording.
                Higher liveness values represent an increased probability that the track was performed live.
              </span>
            </button>
            <button
              type="button"
              className="feature"
              style={this.styleGradient(this.props.colors.valence)}
            > <h3>valence</h3>
              <span className="featureDescrip"> A measure describing the musical positiveness conveyed by a track.
                Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence
                sound more negative (e.g. sad, depressed, angry).
              </span>
            </button>
          </div>
          <div id="button-error-box-wrapper">
            <div id="button-error-box">
              <button id="auth-send-to-server" type="button" variant="contained" color="secondary" onClick={this.send()}>Make a playlist!</button>
              {this.renderError()}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div id="results">
          <h1>Results:</h1>
          <p>based on your answers, we think you associate <br />these audio features with these colors:</p>
          <div className="resultsBoard">
            <button
              type="button"
              className="feature"
              style={this.styleGradient(this.props.colors.danceability)}
            > <h3>danceability</h3>
              <span className="featureDescrip"> Danceability describes how suitable a track is for dancing based on a combination
                of musical elements including tempo, rhythm stability, beat strength, and overall regularity.
              </span>
            </button>
            <button
              type="button"
              className="feature"
              style={this.styleGradient(this.props.colors.energy)}
            > <h3>energy</h3>
              <span className="featureDescrip"> Represents a perceptual measure of intensity and activity. Typically, energetic tracks
                feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale.
                Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.
              </span>
            </button>
            <button
              type="button"
              className="feature"
              style={this.styleGradient(this.props.colors.acousticness)}
            > <h3>acousticness</h3>
              <span className="featureDescrip"> A confidence measure of whether the track is acoustic. Acoustic songs have less artificial/electric noise. </span>
            </button>
            <button
              type="button"
              className="feature"
              style={this.styleGradient(this.props.colors.speechiness)}
            > <h3>speechiness</h3>
              <span className="featureDescrip"> detects the presence of spoken words in a track. The more exclusively speech-like the
                recording (e.g. talk show, audio book, poetry), the higher the speechiness.
              </span>
            </button>
            <button
              type="button"
              className="feature"
              style={this.styleGradient(this.props.colors.instrumentalness)}
            > <h3>instrumentalness</h3>
              <span className="featureDescrip"> Whether a track contains no vocals. “Ooh” and “aah” sounds
                are treated as instrumental in this context. Rap or spoken word tracks are clearly “vocal”.
              </span>
            </button>
            <button
              type="button"
              className="feature"
              style={this.styleGradient(this.props.colors.liveness)}
            > <h3>liveness</h3>
              <span className="featureDescrip"> Detects the presence of an audience in the recording.
                Higher liveness values represent an increased probability that the track was performed live.
              </span>
            </button>
            <button
              type="button"
              className="feature"
              style={this.styleGradient(this.props.colors.valence)}
            > <h3>valence</h3>
              <span className="featureDescrip"> A measure describing the musical positiveness conveyed by a track.
                Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence
                sound more negative (e.g. sad, depressed, angry).
              </span>
            </button>
          </div>
          <p id="signin-prompt">Want to make a playlist using your audio-color associations? <br /> Sign in with Spotify and take the quiz again with songs from your library.</p>
          <button id="send-to-server" type="button" variant="contained" color="secondary" onClick={() => { this.props.history.push('/getStarted'); }}>sign in with Spotify</button>
          {/* <Button id="make-playlist" type="button" variant="contained" color="secondary" onClick={this.toMakePlaylist()}>let&apos;s make a playlist --&gt;</Button> */}
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => (
  {
    colors: state.color,
    user: state.auth.user,
  }
);

export default connect(mapStateToProps, { updateUserColorMap, fetchUser })(Results);
