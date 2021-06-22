import React, {useState,useEffect} from 'react';
import axios from "axios";

function FetchData()
{
    const [profiles,setProfiles] = useState([]); 

    const getProfiles = () => {

        const config = {
            headers:{
                "Content-Type": "applocation/json",
                authorization: "Acess-Control-Allow-Origin"
            }
        }

        try
        {
            axios.get("http://localhost:5000/profiles",config).then((res) => {
                var profiles = res.data;
                //console.log(res.data)
                setProfiles(profiles)
            });
        }
        catch(error)
        {
            console.log(error)
        }
    };

    useEffect(() => {
        getProfiles();
    },[]);

    return(
        <>
            <ul>
                {profiles.length > 0 ? ( 
                    profiles.map((profile) => <li key={profile.id}>
                        <p>{profile.name}</p>
                        <p>{profile.age}</p>
                        <p>{profile.YOB}</p>
                        <p>{profile.email}</p>
                        </li>
                )) : ( <h1>No Profiles Found</h1> )}
            </ul>
        </>
    )
}

export default FetchData;