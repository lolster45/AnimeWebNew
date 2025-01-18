//React...
import { useState, useEffect } from "react"
import {Link, useNavigate} from "react-router-dom"

//Components...
import RightNavShean from "./loading-shean/RightNavShean"
import TrendingCard from "./TrendingTemplateFolder/TrendingCard"

//Firebase...
import {auth} from "../config/firebase"
import {useAuthState} from "react-firebase-hooks/auth"

//React redux toolkit...
import { useDispatch } from "react-redux"
import {searchType} from "../store"

//Images/icons...
import ProfilePic from "../../public/standard-profile-pic.jpg"
import {IoNotificationsOutline} from "react-icons/io5"
import { IoPersonCircleOutline } from "react-icons/io5";

//Styles... 
import "../styles/SideMenu.scss"

export default function AddMenu () {
    //Firebase...
    const [user] = useAuthState(auth);

    //State that holds top anime data/search input of user...
    const [topAnime, setTopAnime] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    //React router...
    const navigate = useNavigate();
    
    //React toolkit...
    const dispatch = useDispatch();
    
    //Determines loading shean animation...
    const [loading, setLoading] = useState(true);

    async function getTopAnime() {
        try {
            const apiFetch = await fetch(`https://api.jikan.moe/v4/top/anime?limit=4&page=1&filter=airing`)
            const data = await apiFetch.json();
            setTopAnime(data.data)
            setLoading(false)
            return;
        } 
        catch (error) {
            console.log("ERROR RETRIEVING SIDE NAV CONTENT...", error)
        }
        return;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(searchType({type: searchQuery}))
        setSearchQuery("")
        navigate("/search")
    }

    useEffect(() => {
        //Im using setTimeout to not trigger rate limit on the API i am using...
        const timeOut = setTimeout(getTopAnime, 3000)
        return function ()  {
            clearTimeout(timeOut)
        }
    }, [])


    return (
        <section className="right-side-nav-bar">
            <nav>
                <IoNotificationsOutline/>
                {!user && <Link to={'/login'}><IoPersonCircleOutline/></Link>}
                {user && <img src={user.photoURL || ProfilePic} alt="user profile picture"/>}
            </nav>
            <form className="input-side-form" onSubmit={handleSubmit}>
                <input 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..."
                />
            </form>
            <section className="trending-section">
                <h2>Top Trending</h2>
                {loading && //This is the loading animation...
                    <RightNavShean/>
                }
                {!loading && topAnime?.map(item => 
                        <TrendingCard
                            key={item.mal_id}
                            id={item.mal_id}
                            title={item.title_english}
                            image={item.images.jpg.image_url}
                            firstTag = {item.genres[0]?.name}
                            secondTag = {item.genres[1]?.name}
                        />
                    )
                } 
                {!loading && 
                    <Link to="discovery/anime" className="more-btn">See More</Link>
                }
            </section>
        </section>
    )
}