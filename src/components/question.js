// This component will include the current song and the sliders
/* eslint-disable max-len */
import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const RedButton = withStyles((theme) => ({
  root: {
    color: 'white',
    backgroundColor: '#801D1D',
    width: 500,
    height: 80,
    borderStyle: 'solid',
    borderRadius: 40,
    transition: 'background-color 0.5s',
    '&:hover': {
      backgroundColor: '#4d1111',
      color: 'white',
    },
  },
}))(Button);

const QuizStart = (props) => {
  return (
    <div id="quiz-start">
      <div id="left-triangle" />
      <div id="right-triangle" />
      <p className="title-text">Welcome to synesthesia</p>
      <p className="description-text">we’re going to show you some songs, you tell us what color you associate with them</p>
      <p className="description-text">if you&apos;re in a time crunch:</p>
      <RedButton type="button" variant="contained" color="secondary" href="/songView">Short quiz</RedButton>
      <p className="description-text">for more accurate and interesting results:</p>
      <RedButton type="button" variant="contained" color="secondary" href="/songView">Long quiz</RedButton>
    </div>
  );
};

export default QuizStart;
