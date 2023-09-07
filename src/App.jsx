import { CLIENT_ID, REDIRECT_URI, AUTH_ENDPOINT, RESPONSE_TYPE, SCOPE } from './spotify-config';
import { useEffect, useState } from "react";
import axios from "axios";
import HomePage from './components/HomePage';
import { Route, Routes, useNavigate } from "react-router-dom";
import Validate from './components/Validate';

import userContext from "./Context/UserContext";
// {AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}
function App() {
  let [userData, setUserData] = useState(null);
  let [token, setToken] = useState(null);
  let [recent, setRecent] = useState(null);
  let [playlists, setPlaylists] = useState([]);

  let [artistsLT, setArtistsLT] = useState([]);
  let [artistsMT, setArtistsMT] = useState(null);
  let [artistsST, setArtistsST] = useState(null);

  let [tracksLT, setTracksLT] = useState([]);
  let [tracksMT, setTracksMT] = useState(null);
  let [tracksST, setTracksST] = useState(null);

  const navigate = useNavigate();

  //!get user data from spotifyhttps://api.spotify.com/v1/browse/featured-playlists
  // https://api.spotify.com/v1/me
  // https://api.spotify.com/v1/me/playlists
  // https://api.spotify.com/v1/me/top/artists  !! no data
  // https://api.spotify.com/v1/me/top/tracks  !!no data
  // https://api.spotify.com/v1/browse/featured-playlists

  function goToProfile() {
    //setTimeout(() => {
    navigate("/validate");
    // }, 3000)
  }

  return (
    <userContext.Provider value={{ userData, setUserData, token, setToken, artistsLT, setArtistsLT, artistsMT, setArtistsMT, artistsST, setArtistsST, tracksLT, setTracksLT, tracksMT, setTracksMT, tracksST, setTracksST, recent, setRecent, playlists, setPlaylists }}>
      <Routes>
        <Route path="/" element={
          <div className='login-cont'>
            <p className="tittle">Spotify Profile</p>
            <a className="login-bttn" href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`} onClick={() => { goToProfile() }}>Log in to Spotify</a>
          </div>
        } />
        <Route path="/validate" element={<Validate />} />
        <Route path='/home/*' element={<HomePage />} />
        {/* (/*) in above line : to make the /home capable of going deeper i.e. make it a parent */}
        {/* <Route path='/profile' element={<HomePage />} />
        <Route path='/top-artists' element={<HomePage />} />
        <Route path='/top-tracks' element={<HomePage />} />
        <Route path='/recent-activity' element={<HomePage />} />
        <Route path='/playlists' element={<HomePage />} /> */}
      </Routes>
    </userContext.Provider>
  );
}

export default App;