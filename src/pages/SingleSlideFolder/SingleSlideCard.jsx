//React...
import React from 'react';
import { Link } from 'react-router-dom';

//React icons...
import { FaStar } from "react-icons/fa6";
import { FaBookReader } from "react-icons/fa";

//Styles...
import "./singleSlideCard.scss"

const TestCard = ({mal_id, image, title, synopsis, score, status, type}) => {
    return (
        <Link 
            to={`/discovery/${type}/moreInfo/${mal_id}`} 
            className="single-card"
        >
            <img src={image} alt="cover image of bookmarked item you have"/>
            <div className="card-details">
                <h2 className="card-title">{title}</h2>
                <p className="synopsis">{synopsis?.substring(0, 300)}......</p>
                <div className="sub-footer">
                    <span className="rating"><FaStar/>  {score || "N/A"}</span>
                    <span className="status"><FaBookReader/> {status || "N/A"}</span>
                </div>
            </div>
        </Link>
    )
};

export default TestCard;