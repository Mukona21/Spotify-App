import React from 'react'
import "./Artists.css";
import avatar from "./avatar.svg"
import { useContext, useState, useEffect } from 'react';
import userContext from "../../Context/UserContext";

export default function Artists() {
    const { userData, token, setToken, artistsLT, artistsMT, artistsST, setArtistsLT, setArtistsMT, setArtistsST } = useContext(userContext);

    let [loading, setLoading] = useState(true);
    let [artists, setArtists] = useState([]);

    useEffect(() => {
        if (token === null) {
            setToken(() => window.localStorage.getItem("token"));
        }

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
                    setArtists(() => data.items);
                    //console.log(data.items);
                }
            )
        fetch("https://api.spotify.com/v1/me/top/artists?time_range=medium_term", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token === null ? window.localStorage.getItem("token") : token}`
            }
        }).then(response => response.json())
            .then(
                data => {
                    setArtistsMT(data.items);
                    //console.log(data.items);
                }
            )
        fetch("https://api.spotify.com/v1/me/top/artists?time_range=short_term", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token === null ? window.localStorage.getItem("token") : token}`
            }
        }).then(response => response.json())
            .then(
                data => {
                    setArtistsST(data.items);
                    setLoading(false);
                    //console.log(data.items);
                }
            )
    }, [])



    return (
        <>{loading ? <h1>Loading...</h1> :
            <div className='artists-cont'>
                <section className='artists-top'>
                    <h1>Top Artists</h1>
                    <div className="toggle">
                        <button onClick={() => { setArtists(() => artistsLT) }}>All Time</button>
                        <button onClick={() => { setArtists(() => artistsMT) }}>Last 6 Months</button>
                        <button onClick={() => { setArtists(() => artistsST) }}>Last 4 Weeks</button>
                    </div>
                </section>

                <section className='artists-bottom'>
                    {artists.map((elem) => {
                        return (
                            <div className="artist-ind" key={elem.id}>
                                <div className="avatar">
                                    <img src={elem.images.length > 0 ? elem.images[0].url : avatar} alt="" />
                                </div>
                                <p className="name">{elem.name}</p>
                            </div>
                        )
                    })}
                </section>
            </div>
        }
        </>
    )
}
