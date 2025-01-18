//React...
import { useState, useEffect, memo } from "react"

//Components...
import BottomNav from "../components/BottomPageNav/BottomNav";
import GridItems from "../components/GridItems/GridItems";

//React icons...
import { LuLayoutList, LuLayoutGrid } from "react-icons/lu";

//Helper functions...
import { getTopList, handleMore, handleLess, handleLayoutChange} from "../helperFunctions";

//styles...
import "../styles/Anime.scss"
import { useNavigate } from "react-router-dom"





const AnimePage = memo(({ layout, setLayout }) => {

    const navigate = useNavigate();

    //State that holds top anime from API...
    const [topAnime, setTopAnime] = useState([]);

    //Information for API...
    const [filter, setFilter] = useState("airing");
    const [limit, setLimit] = useState("25");

    //For loading animation/helper state...
    const [loading, setLoading] = useState(true);

    //The localStorage maintains the page you were on...
    const [page, setPage] = useState(localStorage.getItem("currentAnimePage") || "1")
    localStorage.setItem("currentAnimePage", page)

    
    const animeAPI = `https://api.jikan.moe/v4/top/anime?limit=${limit}&page=${page}&filter=${filter}`;
    useEffect(() => {
        getTopList(animeAPI, setTopAnime, setLoading, navigate);
    }, [page, filter])


    


    return (
        <section className="anime-page">
            <nav className="anime-nav-filter">
                <h2>Top Anime</h2>
                <div>
                    <span onClick={() => handleLayoutChange(setLayout)}>
                        {layout && <LuLayoutGrid/>}
                        {!layout && <LuLayoutList/>}
                    </span>
                    <select onChange={(e) => {
                        setPage("1")
                        setFilter(e.target.value)
                    }}>
                        <option value="airing">Airing</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="bypopularity">Popularity</option>
                        <option value="favorite">Favorite</option>
                    </select>
                </div>
            </nav>  
            <GridItems data={topAnime} layout={layout} loading={loading}/>
            <BottomNav 
                styles='page-nav' 
                handleMore={handleMore} 
                handleLess={handleLess} 
                page={page} 
                setPage={setPage}
            />
        </section>
    );
});

export default AnimePage