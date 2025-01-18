//React...
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

//React deux toolkit...
import { useDispatch } from "react-redux";
import { nameInput } from "../store";

//Styles...
import "../styles/MoreInfo.scss";

export default function CardTemplate({ title, score, image, id, customClass, layout, synopsis, backUpTitle }) {
    const dispatch = useDispatch();

    const handleAnimeClick = () => {
        dispatch(nameInput({ type: id }));
    };

    return (
        <Link to={`moreInfo/${id}`} className={customClass} onClick={handleAnimeClick}>
            <LazyLoadImage
                className="card-image-wrap"
                src={image}
                alt={title}
                offset={100}
                effect="blur"
            />
            <div className="info">
                <div className="info-top-half">
                    <h2 className="card-title">{title ? title.substring(0, 31) : backUpTitle}...</h2>
                    {layout && <p>{synopsis?.substring(0, 160)}...</p>}
                </div>
                {layout && (
                    <div className="info-bottom-half">
                        <span>Rating: {score}</span>
                        <span>Status: Airing</span>
                    </div>
                )}
            </div>
        </Link>
    );
}
