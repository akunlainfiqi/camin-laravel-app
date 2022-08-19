import React, {useEffect, useState} from "react";
import axios from "axios";
import {data} from "autoprefixer";

export default function BulletinNews(props){

    const [error, setError] = useState(null);
    const [bulletin, setBulletin] = useState([]);
    const [bulletinloaded, setBulletinloaded] = useState(false);

    useEffect(()=>{
        const getBulletin = async()=>{
            try{
                const response = await axios.get(
                    'http://localhost:8000/api/bulletin'
                );
                setBulletin(response.data);
                setError(null);
            } catch (e) {
                setError(err.message);
                setData(null);
            } finally {
                setBulletinloaded(true);
            }
        };
        getBulletin();
    },[]);

    if(error){
        return <div>Error : {error.message}</div>;
    } else if (!bulletinloaded){
        return <div>Loading</div>
    } else {
        return (
            <div>
                {bulletin.data.map(data=>
                    <div key={data.id}>
                        <h1> { data.title }</h1>
                        <h1> { data.text }</h1>
                        <h1> { String(data.pinned) }</h1>
                        <h1> { String(data.show) }</h1>
                        <h1> { data.user_id }</h1>
                        <h1> { data.created_at }</h1>
                        <h1> { data.updated_at }</h1>
                    </div>
                )}
            </div>
        );
    }
}
