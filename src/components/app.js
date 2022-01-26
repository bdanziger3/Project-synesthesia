/* eslint-disable max-len */
import React from 'react';
// eslint-disable object-curly-newline
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './nav';
import spotAuth from './spotify-authentication';
import Welcome from './welcome';
import Results from './results';
import selectPlaylistColor from './select-playlist-color';
import playlistResults from './playlist';
import Quiz from './quiz';

const FallBack = () => {
  return <div>URL Not Found</div>;
};

const App = () => {
  return (
    <Router>
      <Nav />
      <div id="main-content">
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route path="/getStarted" component={spotAuth} />
          <Route path="/results" component={Results} />
          {/* using https://stackoverflow.com/a/27868548 to pass props in through router */}
          <Route path="/danceability" render={() => <Quiz currentFeature="danceability" key="danceability" />} />
          <Route path="/energy" render={() => <Quiz currentFeature="energy" key="energy" />} />
          <Route path="/instrumentalness" render={() => <Quiz currentFeature="instrumentalness" key="instrumentalness" />} />
          <Route path="/liveness" render={() => <Quiz currentFeature="liveness" key="liveness" />} />
          <Route path="/valence" render={() => <Quiz currentFeature="valence" key="valence" />} />
          <Route path="/speechiness" render={() => <Quiz currentFeature="speechiness" key="speechiness" />} />
          <Route path="/acousticness" render={() => <Quiz currentFeature="acousticness" key="acousticness" />} />
          <Route path="/makePlaylist" component={selectPlaylistColor} />
          <Route path="/playlistResults" component={playlistResults} />
          <Route component={FallBack} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
