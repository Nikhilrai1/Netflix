import React, { useState, useEffect } from 'react';
import "./featured.scss";
import { PlayArrow, InfoOutlined } from "@mui/icons-material";
import axios from "axios";

function Featured({ type }) {
    const [featured,setFeatured] = useState([]);
    useEffect(() => {
        const getFeaturedMovie = async () => {
            const url = `http://localhost:8800/api/movie/random${type && "?type=" + type}`;
            try {
                const res = await axios.get(url, {
                    headers: {
                        token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNjNiOGRjYjFjMzQzYmMzZjRhZGQ0MiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MDcwMzEzOCwiZXhwIjoxNjUxMTM1MTM4fQ.1EPziSGVcIEQAag4yGDe3JUSDXmlBKVPvtku8CEtINE"
                    }
                })
                setFeatured(res.data[0]);
            } catch (err) {
                console.log(err);
            }
        }
        getFeaturedMovie()
    }, [])
    return (
        <div className="featured">
            {
                type && (
                    <div className="category">
                        <span>{type === "movie" ? "movies" : "series"}</span>
                        <select name="genre" id="genre">
                            <option value="adventure">Adventure</option>
                            <option value="comedy">Comedy</option>
                            <option value="crime">Crime</option>
                            <option value="fantasy">Fantasy</option>
                            <option value="historical">Historical</option>
                            <option value="horror">Horror</option>
                            <option value="romance">Romance</option>
                            <option value="sci-fi">Sci-fi</option>
                            <option value="thriller">Thriller</option>
                            <option value="western">Western</option>
                            <option value="animation">Animation</option>
                            <option value="drama">Drama</option>
                            <option value="documentary">Documentry</option>
                        </select>
                    </div>
                )
            }
            <img
                src={featured.img}
                alt=""
            />
            <div className="info">
                <img
                    width="100%"
                    src={featured.imgTitle}
                    alt={featured.imgTitle}
                />
                <span className='description'>
                    {featured.desc}
                </span>
                <div className="buttons">
                    <button className="play">
                        <PlayArrow />
                        <span>play</span>
                    </button>
                    <button className="more">
                        <InfoOutlined />
                        <span>info</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Featured