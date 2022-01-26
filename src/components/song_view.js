// This component will include the current song and the sliders
/* eslint-disable max-len */
import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

class SongView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderValue: 0,
    };
  }

  slide = (sliderValue) => {
    this.setState({ sliderValue });
  };

  store = (sliderValue) => {
    console.log(sliderValue);
  };

  render() {
    return (
      <div id="song-view" style={{ background: `radial-gradient(hsl(${this.state.sliderValue}, 70%, 50%, 50%), hsl(${this.state.sliderValue - 100}, 40%, 30%, 30%))` }}>
        {/* <div id="song-view" style={{ background: 'red' }}> */}
        <div id="left-button">
          <IconButton size="large" type="button" onClick={this.store} href="/songView">
            <KeyboardArrowLeftIcon style={{ fontSize: 80 }} />
          </IconButton>
        </div>
        <div id="song-content">
          <iframe className="frame" title="song" src="https://open.spotify.com/embed/track/0F7FA14euOIX8KcbEturGH" width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media" />
          <Slider
            value={this.state.sliderValue}
            min={0}
            max={255}
            onChange={this.slide}
            markerLabel={[]}
          />
          {this.state.sliderValue}
        </div>
        <div id="right-button">
          <IconButton size="large" type="button" onClick={this.store} href="/results">
            <KeyboardArrowRightIcon style={{ fontSize: 80 }} />
          </IconButton>
        </div>
      </div>
    );
  }
}

export default SongView;
