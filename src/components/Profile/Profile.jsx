import React from 'react'
import "./Profile.css"
import avatar from "./avatar.svg"
import { useContext, useState,useEffect } from 'react';
import userContext from "../../Context/UserContext";
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const navigate = useNavigate();
    const { userData, token, playlists, setToken, setUserData, setPlaylists, setArtistsLT, setArtistsMT, setArtistsST, setTracksLT, setTracksMT, setTracksST, setRecent, artistsLT, tracksLT } = useContext(userContext);

    let [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token === null) {
            setToken(() => window.localStorage.getItem("token"));
        }

        fetch("https://api.spotify.com/v1/me/top/tracks?time_range=long_term", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token === null ? window.localStorage.getItem("token") : token}`
            }
        }).then(response => response.json())
            .then(
                data => {
                    setTracksLT(data.items);
                    //console.log(data.items);
                }
            )


        fetch("https://api.spotify.com/v1/me/top/artists?time_range=long_term", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token === null ? window.localStorage.getItem("token") : token}`
            }
        }).then(response => response.json())
            .then(
                data => {
                    setArtistsLT(data.items);
                    //console.log(data.items);
                    setLoading(() => false);
                }
            )
    }, [])



    function logout() {
        setToken(null);
        setUserData(null);
        setArtistsLT(null);
        setArtistsMT(null);
        setArtistsST(null);
        setTracksLT(null);
        setTracksMT(null);
        setTracksST(null);
        setPlaylists(null);
        setRecent(null);
        navigate("/");
    }

    function getDuration(ms) {
        let sec = parseInt(ms / 1000);
        let min = parseInt(sec / 60);
        sec = (sec % 60).toString();
        sec = sec.length < 2 ? ("0" + sec) : sec;
        return [min, sec].join(":");
    }

    return (
        <>
            {
                userData === null ? "" :
                    <div className='profile-cont'>
                        <div className="profile-top">
                            <div className="avatar">
                                <img src={userData.images.length > 0 ? userData.images[0].url : avatar} alt="" />
                            </div>
                            <p className="name">{userData.display_name}</p>
                            <div className="stats">
                                <section className='stat'>
                                    <p className="count">{userData.followers.total}</p>
                                    <p className="type">Followers</p>
                                </section>

                                <section className='stat'>
                                    <p className="count">{userData.followers.total}</p>
                                    <p className="type">Following</p>
                                </section>

                                <section className='stat'>
                                    <p className="count">{playlists.length}</p>
                                    <p className="type">Playlists</p>
                                </section>
                            </div>

                            <button className='logout' onClick={() => logout()}>Logout</button>
                        </div>


                        <div className="profile-bottom">
                            <section className='profile-left'>
                                <div className="arts-intro">
                                    <h2>Top Artists Of All Time</h2>
                                    <button className='see-more' onClick={() => { navigate("/home/artists") }}>see more</button>
                                </div>
                                {loading ? <h1>loading...</h1> :
                                    artistsLT.map((elem) => {
                                        return (
                                            <div className="artist-prof" key={elem.id}>
                                                <div className="avatar">
                                                    <img src={elem.images.length > 0 ? elem.images[0].url : avatar} alt="" />
                                                </div>
                                                <p className="name">{elem.name}</p>
                                            </div>
                                        )
                                    })}
                            </section>

                            <section className='profile-right'>
                                <div className="arts-intro">
                                    <h2>Top Tracks Of All Time</h2>
                                    <button className='see-more' onClick={() => { navigate("/home/tracks") }}>see more</button>
                                </div>
                                {loading ? <h1>loading...</h1> :
                                    tracksLT.map((elem) => {
                                        return (
                                            <div className="track-prof" key={elem.id}>
                                                <div className='sub-div-track'>
                                                    <div className="track-avatar">
                                                        <img src={elem.album.images.length > 0 ? elem.album.images[0].url : avatar} alt="" />
                                                    </div>

                                                    <div className="track-desc">
                                                        <p className="track-name">{elem.name}</p>
                                                        <p className="track-summ">{elem.artists[0].name} &nbsp; - &nbsp; {elem.album.name}</p>
                                                    </div>
                                                </div>
                                                <p className="dur">{getDuration(elem.duration_ms)}</p>
                                            </div>
                                        )
                                    })}
                            </section>
                        </div>
                    </div>
            }
        </>
    )
}
