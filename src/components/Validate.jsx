import React from 'react'
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import userContext from '../Context/UserContext';

export default function Validate(props) {
    //http://localhost:3000/validate#access_token=BQAnBqAcrmDh-xOSkGxYZZ-sNe1JBDV2GCaTc3Rg3j7kORC-WsvgIoVLQurpa6sK3nu2vMzit80M02bXiC4D2hGlonwRZQLxQcQb9oqCULJxO2wmsniVZ6oPOAZZFs_98kIFYyMI6X3kNmNLv2fOTmADA7phxM07A9FZ_Pe0Nk8EIqV4NJAqVtg9tAJSft1-t9b68s08LH0DqnNL_aGsBSpZ4IO5BT5v&token_type=Bearer&expires_in=3600

    const navigate = useNavigate();

    const { token, setToken } = useContext(userContext);
    useEffect(() => {
        const hash = window.location.hash;
        let token = null; //= window.localStorage.getItem("token");
        if (!token && hash) {
            token = hash
                .substring(1)
                .split("&")
                .find((elem) => elem.startsWith("access_token"))
                .split("=")[1];

            window.location.hash = "";
            window.localStorage.setItem("token", token);
        }
        setToken(() => token);
        //console.log(token);
        if (token !== null) {
            navigate('/home');
        }
    }, []);

    return (
        <div className='validate'>loading...</div>
    )
}
