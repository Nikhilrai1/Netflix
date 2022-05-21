import React from 'react'
import "./Watch.scss";
import { ArrowBackOutlined } from "@mui/icons-material";
import videoSrc from "../assets/video.mp4"
import { Link, useLocation } from "react-router-dom";


function Watch() {
    const location = useLocation();
    const movie = location.state;
    console.log(location)
    console.log(movie)
    return (
        <div className="watch">
            <div className="back">
                <Link to="/" className="link">
                    <ArrowBackOutlined />
                </Link>
            </div>

            <video className="video" autoPlay progress controls src={videoSrc} />
        </div>
    )
}

export default Watch