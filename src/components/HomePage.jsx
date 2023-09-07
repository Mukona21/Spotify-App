import React from 'react'
import axios from "axios";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import userContext from '../Context/UserContext';

import LeftBarNav from "./LeftBarNav/LeftBarNav"
import Profile from "./Profile/Profile"
import Artists from "./Artists/Artists"
import Tracks from "./Tracks/Tracks"
import Activity from "./Activity/Activity"
import Playlists from "./Playlists/Playlists"

export default function HomePage() {
    const { userData, setUserData, token, setToken } = useContext(userContext);

    async function getUserAccount(token) {
        //console.log(token);
        const user = await axios
            .get("https://api.spotify.com/v1/me", {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then((response) => {
                // Return the full details of the user.
                return response;
            })
            .catch((err) => {
                console.log(err);
            });
        //console.log(user);
        setUserData(() => user.data)
    };

    useEffect(() => {
        if (token === null) {
            setToken(() => window.localStorage.getItem("token"));
            getUserAccount(window.localStorage.getItem("token"));
        }
        else { getUserAccount(token); }
    }, [])



    return (
        <div className='home-cont'>
            <LeftBarNav />
            <div className='subpages-cont'>
                <Routes>
                    <Route path='/' element={<Profile />} />
                    <Route path='/artists' element={<Artists />} />
                    <Route path='/tracks' element={<Tracks />} />
                    <Route path='/activity' element={<Activity />} />
                    <Route path='/playlists' element={<Playlists />} />
                </Routes>
            </div>
        </div>
    )
}
