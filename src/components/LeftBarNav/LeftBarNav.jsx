import React from 'react';
import "./LeftBarNav.css";
import spotify from "./spotify.png";
import profile from "./profile.svg"
import mic from "./mic.svg"
import music from "./music.svg"
import recents from "./recents.svg"
import playlist from "./playlist.svg"
import github from "./github.svg"
import { useNavigate } from 'react-router-dom';

import { useContext, useState } from 'react';
import userContext from "../../Context/UserContext";

export default function Sidebar() {
  const { userData, token } = useContext(userContext);
  const goTo = useNavigate();

  const navMap = {
    "prof": "/home",
    "artst": "/home/artists",
    "trac": "/home/tracks",
    "rcnt": "/home/activity",
    "plist": "/home/playlists",
  }
  let [active, setActive] = useState("prof");

  function handleClick(arg) {
    goTo(navMap[arg]);
    setActive(arg);
  }

  return (
    <main className="bar-cont">
      <div className="logo" onClick={() => handleClick("prof")}>
        <img src={spotify} alt="spotify-logo" />
      </div>

      <section className="navs">

        <div className={`nav ${active === "prof" ? "active" : ""}`} onClick={() => handleClick("prof")}>
          <img src={profile} alt="profile-logo" />
          <p>Profile</p>
        </div>

        <div className={`nav ${active === "artst" ? "active" : ""}`} onClick={() => handleClick("artst")}>
          <img src={mic} alt="artists-logo" />
          <p>Top Artists</p>
        </div>

        <div className={`nav ${active === "trac" ? "active" : ""}`} onClick={() => handleClick("trac")}>
          <img src={music} alt="tracks-logo" />
          <p>Top Tracks</p>
        </div>

        <div className={`nav ${active === "rcnt" ? "active" : ""}`} onClick={() => handleClick("rcnt")}>
          <img src={recents} alt="recents-logo" />
          <p>Recents</p>
        </div>

        <div className={`nav ${active === "plist" ? "active" : ""}`} onClick={() => handleClick("plist")}>
          <img src={playlist} alt="playlists-logo" />
          <p>Playlists</p>
        </div>

      </section>


      <div className="github">
        <a href="https://github.com/AhindraD">
          <img src={github} alt="github-logo" />
        </a>
      </div>
    </main>
  )
}
