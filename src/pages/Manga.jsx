//React...
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

//Components...
import BottomNav from "../components/BottomPageNav/BottomNav"
import GridItems from "../components/GridItems/GridItems"

//React icons...
import { LuLayoutList, LuLayoutGrid } from "react-icons/lu";

//helper functions...
import { getTopList, handleMore, handleLess, handleLayoutChange } from "../helperFunctions";

//Styles...
import "../styles/Anime.scss"

export default function Manga ({layout}) {

    const navigate = useNavigate();

    //State that holds top anime from API...
    const [topManga, setTopManga] = useState([]);

    //API information...
    const [filter, setFilter] = useState("publishing");
    const limit = '25'

    //For loading animation/helper state...
    const [loading, setLoading] = useState(true);

    //Sets local storage for pagination...
    const [page, setPage] = useState(localStorage.getItem("currentMangaPage") || "1")
    localStorage.setItem("currentMangaPage", page)

    
    const mangaAPI = `https://api.jikan.moe/v4/top/manga?filter=${filter}&limit=${limit}&page=${page}`;
    useEffect(() => {
        getTopList(mangaAPI, setTopManga, setLoading, navigate);
    }, [page, filter])

    return (
    <section className="anime-page">
        <>
            <nav className="anime-nav-filter">
                <h2>Top Anime</h2>
                <div>
                    <span onClick={handleLayoutChange}>
                        {layout && <LuLayoutGrid/>}
                        {!layout && <LuLayoutList/>}
                    </span> 
                    <select onChange={(e) => {
                        setPage("1")
                        setFilter(e.target.value)
                    }}>
                        <option value="publishing">Publishing</option>
                        <option value="bypopularity">Popularity</option>
                        <option value="favorite">Favorite</option>
                    </select>
                </div>
            </nav>
            <GridItems data={topManga} layout={layout} loading={loading}/>
            <BottomNav  
                styles='page-nav' 
                handleMore={handleMore} 
                handleLess={handleLess} 
                page={page} 
                setPage={setPage}
            />
        </>
    </section>
    )
}

