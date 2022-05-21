import React, { useState, useEffect } from 'react'
import Navbar from "./Navbar"
import Featured from './Featured'
import List from './List'
import "./home.scss"
import axios from "axios";
function Home({ type }) {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const listUrl = `http://localhost:8800/api/list${type?"?type="+type:""}${genre?"&genre="+genre:""}`;
        const res = await axios.get(listUrl,
          {
            headers: {
              token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNjNiOGRjYjFjMzQzYmMzZjRhZGQ0MiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MDcwMzEzOCwiZXhwIjoxNjUxMTM1MTM4fQ.1EPziSGVcIEQAag4yGDe3JUSDXmlBKVPvtku8CEtINE"
            }
          });
        setLists(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getRandomLists();
  }, [type, genre])
  return (
    <div className='home'>
      <Navbar />
      <Featured type={type} />
      {
        lists.map(list => (
          <List list={list} />
        ))
      }
    </div>
  )
}

export default Home