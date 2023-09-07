import React from 'react'
import "./Tracks.css";
import avatar from "./avatar.svg"
import { useContext, useState, useEffect } from 'react';
import userContext from "../../Context/UserContext";

export default function Tracks() {
    const { userData, token, setToken, tracksLT, tracksMT, tracksST, setTracksLT, setTracksMT, setTracksST } = useContext(userContext);

    let [loading, setLoading] = useState(true);
    let [tracks, setTracks] = useState([]);


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
                    setTracks(() => data.items);
                    //console.log(data.items);
                }
            )
        fetch("https://api.spotify.com/v1/me/top/tracks?time_range=medium_term", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token === null ? window.localStorage.getItem("token") : token}`
            }
        }).then(response => response.json())
            .then(
                data => {
                    setTracksMT(data.items);
                }
            )
        fetch("https://api.spotify.com/v1/me/top/tracks?time_range=short_term", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token === null ? window.localStorage.getItem("token") : token}`
            }
        }).then(response => response.json())
            .then(
                data => {
                    setTracksST(data.items);
                    setLoading(false);
                }
            )
    }, [])


    function getDuration(ms) {
        let sec = parseInt(ms / 1000);
        let min = parseInt(sec / 60);
        sec = (sec % 60).toString();
        sec = sec.length < 2 ? ("0" + sec) : sec;
        return [min, sec].join(":");
    }

    return (
        <>{loading ? <h1>Loading...</h1> :
            <div className='artists-cont'>
                <section className='artists-top'>
                    <h1>Top Tracks</h1>
                    <div className="toggle">
                        <button onClick={() => { setTracks(() => tracksLT) }}>All Time</button>
                        <button onClick={() => { setTracks(() => tracksMT) }}>Last 6 Months</button>
                        <button onClick={() => { setTracks(() => tracksST) }}>Last 4 Weeks</button>
                    </div>
                </section>

                <section className='tracks-bottom'>
                    {tracks.map((elem) => {
                        return (
                            <div className="track-ind" key={elem.id}>
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
        }
        </>
    )
}
