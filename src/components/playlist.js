/* eslint-disable max-len */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class playlistResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animationClass: 'test',
    };
  }

  handleBackground = (status) => {
    let height = 0;
    if (status === 'done') {
      height = '100%';
    } else if (status === 'loading') {
      height = '100vh';
    }
    if (this.props.color !== null) {
      const c1 = this.props.color - 30;
      const c2 = this.props.color;
      const c3 = this.props.color + 30;
      const sat = '100%';
      const lightness = '70%';
      return ({
      // eslint-disable-next-line max-len
        background: `linear-gradient( 0.25turn, hsl(${c1}, ${sat}, ${lightness}, 100%), hsl(${c2}, ${sat}, ${lightness}, 100%), hsl(${c3}, ${sat}, ${lightness}, 100%))`,
        backgroundSize: '400% 400%',
        WebkitAnimation: 'Gradient 10s ease infinite',
        MozAnimation: 'Gradient 10s ease infinite',
        animation: 'Gradient 10s ease infinite',
        height,
      });
    } else {
      return ({
      // eslint-disable-next-line max-len
        background: 'radial-gradient( #EE7752, #E73C7E, #23A6D5, #23D5AB)',
        backgroundSize: '400% 400%',
        WebkitAnimation: 'Gradient 15s ease infinite',
        MozAnimation: 'Gradient 15s ease infinite',
        animation: 'Gradient 15s ease infinite',
        height,
      });
    }
  }

  goBack = () => {
    window.history.back();
  }

  render() {
    if (this.props.playlist.id && this.props.color !== null) {
      return (
        <div id="background" className={this.state.animationClass} style={this.handleBackground('done')}>
          <div className="playlist">
            <h2>We generated this playlist for you in your Spotify library.<br /> Listen now in the app or later on your own!</h2>
            <iframe title="playlist" className="frame" src={`https://open.spotify.com/embed/playlist/${this.props.playlist.id}`} width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media" />
            <button type="submit" onClick={this.goBack}>Make another playlist</button>
          </div>
        </div>
      );
    } else if (this.props.playlist.error === false && this.props.color !== null) {
      return (
        <div id="background" className={this.state.animationClass} style={this.handleBackground('loading')}>
          <div className="playlist">
            <h2>We generated this playlist for you in your Spotify library. Listen now in the app or later on your own!</h2>
            <p>Loading playlist...</p>
            <button type="submit" onClick={this.goBack}>Make another playlist</button>
          </div>
        </div>
      );
    } else if (this.props.playlist.error === true) {
      return (
        <div id="background" className={this.state.animationClass} style={this.handleBackground('loading')}>
          <div className="playlist">
            <h2>something&apos;s not right...<br />try returning to the start</h2>
            <button type="submit" onClick={this.goBack}>Make another playlist</button>
          </div>
        </div>
      );
    } else {
      return (
        <div id="background" className={this.state.animationClass} style={this.handleBackground('loading')}>
          <div className="playlist">
            <h2>something&apos;s not right...<br />try picking a color again</h2>
            <button type="submit" onClick={this.goBack}>go back</button>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (reduxState) => ({
  playlist: reduxState.playlist,
  color: reduxState.color.playlist_color,
});

export default withRouter(connect(mapStateToProps, null)(playlistResults));
