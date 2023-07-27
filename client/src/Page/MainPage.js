import React, { useState } from 'react';
import axios from 'axios';

const MainPage = () => {

  const [Url, setUrl] = useState("");

  const [shortened, setShortened] = useState(null);

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const response = await axios.post("http://localhost:9000/app/short", {
        body:{
          "origUrl": Url
        }
        });
    console.log(response.data);
    setShortened(response.data.urlId);
    
  }

  const directTo = async()=>{
    const response = await axios.get(`http://localhost:9000/app/${shortened}`);
    console.log(response);
  }

  return (
    <div className="mainPage">
    <form onSubmit={(e)=>{
        handleSubmit(e)
    }
    }>
    <input 
    name="Url"
    placeholder="Enter the URL"
    type="text"
    value={Url}
    onChange={(e)=>{
        setUrl(e.target.value)
    }}
    / >
    <input type="submit" />
    </form>

    { shortened && <button onClick={directTo}>{shortened}</button>}

    </div>
  )
}

export default MainPage