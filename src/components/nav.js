/* eslint-disable max-len */
import React, { useState } from 'react';
import Hamburger from 'hamburger-react';
// import { connect } from 'react-redux';
// eslint-disable-next-line object-curly-newline
import { NavLink, withRouter } from 'react-router-dom';
// import { fetchUser } from '../actions';

// const renderLogin = (props) => {
//   const url = window.location.href;
//   if (url.includes('?message=authGuest')) {
//     return (
//       <h2>Logged in as: Guest</h2>
//     );
//   } else if (url.includes('?spotifyID=')) {
//     const tokenStartIndex = url.indexOf('spotifyID') + 10;
//     const spotifyID = url.substring(tokenStartIndex, url.length);
//     return (
//       <h2>Logged in as: {spotifyID}</h2>
//     );
//   } else {
//     return null;
//   }
// };

const Nav = (props) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="navbar">
      <div className="hamburger">
        <Hamburger toggled={isOpen} toggle={setOpen} />
        <div className="menu" style={isOpen ? {} : { height: 0 }}>
          <div className="menutext"><NavLink to="/" exact>Home</NavLink></div>
          <div className="menutext"><NavLink to="/getStarted">Login with Spotify</NavLink></div>
        </div>
      </div>
      {/* {renderLogin(props)} */}
      <h1 className="nav-title" id="title">synesthesia</h1>
    </div>
  );
};

// const mapStateToProps = (state) => (
//   {
//     user: state.auth.user.spotifyID,
//   }
// );

export default withRouter((Nav));
