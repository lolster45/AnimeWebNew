//React...
import React from 'react';
import { Link } from 'react-router-dom';

//Styles...
import "../../components/TrendingTemplateFolder/trendingCard.scss"

const TrendingCard = ({id, title, image, firstTag, secondTag}) => {
    return (
        <div key={id} className='trending-cards'>
            <div className='title-wrap'>
                <h4>{title}</h4>
                <span>{`${firstTag || ""}, ${secondTag || ""}`}</span>
            </div>
            <Link to={`discovery/anime/moreInfo/${id}`}>
                    <img className="sideMenu-images" src={image} alt={title}/>
            </Link> 
        </div>
    );
};

export default TrendingCard;