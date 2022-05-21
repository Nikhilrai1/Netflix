import React, { useState, useEffect } from 'react'
import "./listitem.scss";
import { PlayArrow, Add, ThumbUpAltOutlined, ThumbDownAltOutlined } from "@mui/icons-material";
import videoSrc from "../assets/video.mp4"
import axios from "axios";
import { Link } from "react-router-dom";


function ListItem({ index, item }) {
    const [isHovered, setIsHovered] = useState(false);
    const [movie,setMovie] = useState({});
    useEffect(() => {
        const getMovie = async () => {
            try {
                const listItemUrl = `http://localhost:8800/api/movie/find/${item}`;
                console.log(listItemUrl)
                const res = await axios.get(listItemUrl, {
                    headers: {
                        token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNjNiOGRjYjFjMzQzYmMzZjRhZGQ0MiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MDcwMzEzOCwiZXhwIjoxNjUxMTM1MTM4fQ.1EPziSGVcIEQAag4yGDe3JUSDXmlBKVPvtku8CEtINE"
                    }
                })
                setMovie(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getMovie();
    },[])
    return (
        <div
            className="listItem"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        >
            <img
                src={movie.img}
                alt=""
            />
            {isHovered && (
                <>
                    <video loop autoPlay={true} muted>
                        <source src={movie.trailer || videoSrc} type="video/mp4" />
                    </video>
                    <div className="itemInfo">
                        <div className="icons">
                            <Link to={{pathname: "/watch",state:movie}}>
                            <PlayArrow className="icon" />
                            </Link>
                            <Add className="icon" />
                            <ThumbUpAltOutlined className="icon" />
                            <ThumbDownAltOutlined className="icon" />
                        </div>
                        <div className="itemInfoTop">
                            <span>1 hour 14 mins</span>
                            <span className="limit">{movie.limit}</span>
                            <span>{movie.year}</span>
                        </div>
                        <div classNmae="desc">
                            {movie.desc}
                        </div>
                        <div className="genre">{movie.genre}</div>
                    </div>
                </>
            )
            }
        </div>

    )
}

export default ListItem

