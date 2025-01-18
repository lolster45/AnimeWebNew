//React...
import { useNavigate } from "react-router-dom";

//Components...
import { useParams, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Comment from "./comment";
import Spinner from "../../components/LoadingFolder/loading";
import MoreInfoLoad from "../../components/loading-shean/MoreInfoLoad";

//React Icons...
import {MdOutlineArrowBack, MdFavorite} from "react-icons/md"
import {BsFillBookmarkDashFill} from "react-icons/bs"
import {AiFillStar} from "react-icons/ai"
import {SiMyanimelist} from "react-icons/si"
import { IoDocumentTextSharp } from "react-icons/io5";
import { FaTags } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";


//Firebase...
import { auth, database } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

//Styles...
import "../../styles/MoreInfo.scss"


export default function MoreInfo() {
    //React router that helps in getting type of content clicked on....
    const navigate = useNavigate();
    const location = useLocation();
    const urlName = location.pathname.split("/")[2];

    //Anonymous helpers...
    const {id} = useParams();
    const type = urlName == "manga" || urlName == "anime" ? urlName : "manga"

    //Firebase...
    const [user] = useAuthState(auth);

    //State that holds the data of the fetched anime...
    const [animeFetched, setAnimeFetched] = useState({});

    //State that holds the reviews of the anime that was fetched...
    const [reviews, setReviews] = useState([]);

    //Loading states...
    const [loading, setLoading] = useState(true)

    //-----------------------------------------------


    //More states...
    const [actualUserBookMarks, setActualUserBookMarks] = useState([])
    const [userBookMarksByID, setUserBookMarksByID] = useState([]);
    const [loadingUserBookmarks, setLoadingUserBookmarks] = useState(true);

    //Gets info of content...
    const getInfo = async () => {
        try {
            const res = await fetch(`https://api.jikan.moe/v4/${type}/${id}/full`);
            const data = await res.json();
            setAnimeFetched(data.data);
            setLoading(false);
            return;
        } 
        catch (error) {
            console.log("ERROR GETTING CONTENT INFO...", error)
            navigate("/")
        }
    }

    //Gets uers bookmarks
    const getUserBookMarks = async () => {
        if(user) {
            try {
                const bookmark = doc(database, "userInfo", user?.uid);
                const data = await getDoc(bookmark);
        
                setActualUserBookMarks(data.data().userBookmarks.map(doc => doc));
                setUserBookMarksByID(data.data().userBookmarks.map(doc => doc.mal_id));
                setLoadingUserBookmarks(false);
                return;
            } 
            catch (error) {
                console.log("ERROR GETTING USER BOOKMARKS...", error)
                navigate("/")
            }
        }
        return;
    }

    //Reviews state...
    const [loadingR, setLoadingR] = useState(true)  
    const getReviews = async () => {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/${type}/${id}/reviews`);
            const reviewsData = await response.json();
            setReviews(reviewsData.data);
            setLoadingR(false);
            return;
        } 
        catch (error) {
            console.log("ERROR GETTING USER REVIEWS...", error)
        }
        return;
    }

    const addUserBookMark = async () => {
        if(user) {
            try {
                const docRef = doc(database, "userInfo", user?.uid);
                if (userBookMarksByID.includes(animeFetched.mal_id)) {
                    const newArr = actualUserBookMarks.filter(item => item.mal_id !== animeFetched.mal_id);
                    await updateDoc(docRef, {
                        userBookmarks: newArr
                    })
                    setUserBookMarksByID(prev => prev.filter(item => item !== animeFetched.mal_id));
                } 
                else {
                    await updateDoc(docRef, {
                        userBookmarks: arrayUnion({
                            mal_id: animeFetched.mal_id,
                            type: type,
                            title: animeFetched.title,
                            image: animeFetched?.images?.jpg?.large_image_url,
                            synopsis: animeFetched.synopsis,
                            score: animeFetched.score,
                            status: animeFetched.status
                        })
                    }) 
                    setUserBookMarksByID(prev => prev ? [...prev, animeFetched.mal_id] : [animeFetched.mal_id])
                }      
            } 
            catch (error) {
                console.log("ERROR ADDING USER BOOKMARKS...", error)
            }
        }
        return;
    }


    useEffect(() => {
        getInfo();
        if (user) {
            getUserBookMarks().finally(() => setLoadingUserBookmarks(false));
        }

        //Reviews but with a dealy so as to not reach the rate limit...
        const timeOut = setTimeout(getReviews, 4000)
        return function ()  {
            clearTimeout(timeOut)
        }
    }, []);

    return (
        <section id="more_info_section">
            <Link to={-1} className="back-arrow">
                <MdOutlineArrowBack/>
            </Link>
            {loading && 
                <MoreInfoLoad/>
            }
            {!loading && animeFetched &&
                <div className="more-info-card">
                    <img 
                        src={animeFetched?.images?.jpg?.large_image_url}
                        className="more-info-image" 
                        alt="picture of the series you are looking at"
                    />
                    <div className="item-main-info">
                        <div className="top_half_info">
                            <h2>{animeFetched.title_english || animeFetched.title}</h2>
                            <div className="sub_info">
                                {animeFetched.genres[0] && 
                                    <span>
                                        <FaTags/>
                                        {animeFetched.genres[0]?.name}
                                    </span>
                                }
                                <span>
                                    <IoDocumentTextSharp/>
                                    {type === "anime" && animeFetched.episodes} Episodes
                                </span>
                                <span>
                                    <MdFavorite/>
                                    {animeFetched.favorites} Favorites
                                </span>
                            </div>
                            <p className="rating_wrap">
                                <AiFillStar/>
                                {animeFetched.score}
                            </p> 
                        </div>

                        <div className="main_info_buttons_wrap">
                            {user && !loadingUserBookmarks &&
                                <button onClick={addUserBookMark} className="bookmark-btn">
                                    {userBookMarksByID.includes(animeFetched.mal_id)
                                        ? <BsFillBookmarkDashFill/> 
                                        : <span><FaRegBookmark/>BOOKMARK</span>
                                    }
                                </button>
                            }
                            <a href={animeFetched.url} target="_blank">
                                <button className="myAnimeListBtn">
                                    <SiMyanimelist style={{fontSize: "20px"}}/>
                                </button>
                            </a>
                        </div>


                    </div>
                </div>
            }
            <section className="synopsis">
                <h3>Synopsis:</h3>
                <p className="synopsis_text">{animeFetched?.synopsis}</p> 
            </section>
            <section className="details">
                <h2>Details</h2>
                <ul className="more-details">
                    <li>Release: {animeFetched?.year}</li>
                    <li>{
                        `Aired: ${new Date(animeFetched?.aired?.from).toLocaleString()} - ${new Date(animeFetched?.aired?.to).toLocaleString()}`} 
                    </li>
                    <li>Rating: {animeFetched?.rating}</li>
                    <li>Status: {animeFetched?.status}</li>
                </ul>
            </section>
            <section className="comment-reviews">
                <h2>Reviews</h2>
                {loadingR && 
                    <div className="loading-animation">
                        <Spinner/>
                    </div>
                }
                {!loadingR && 
                    reviews?.map((review,i) => (
                        <Comment
                            key={i}
                            image={review.user.images.jpg.image_url}
                            data= {review.date}
                            review = {review.review}
                            score = {review.score}
                            user = {review.user.username}
                        />
                    ))
                }
                {reviews.length === 0 && !loadingR && <h4>No Reviews...</h4>}
            </section> 
        </section>
    )
}