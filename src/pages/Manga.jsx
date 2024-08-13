//React...
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

//Components...
import CardTemplate from "../components/cardTemplate"
import LoadingFB from "../components/loading-shean/loadingFB"

//React icons...
import { LuLayoutList, LuLayoutGrid } from "react-icons/lu";

//helper functions...
import { getTopList } from "../helperFunctions";

//Styles...
import "../styles/Anime.scss"

export default function Manga ({layout, setLayout}) {

    const navigate = useNavigate();


    //State that holds top anime from API...
    const [topManga, setTopManga] = useState([]);

    //API information...
    const [filter, setFilter] = useState("publishing");
    const [limit, setLimit] = useState("25");

    //For loading animation/helper state...
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    //Sets local storage for pagination...
    const [page, setPage] = useState(localStorage.getItem("currentMangaPage") || "1")
    localStorage.setItem("currentMangaPage", page)

    

    //Pagination navigation...
    const handleMore = (e) => {
        e.currentTarget.parentElement.classList.add("more");
        setPage(prev => +prev + +"1")
    }
    const handleLess = (e) => {
        e.currentTarget.parentElement.classList.remove("more")
        setPage(prev => +prev - +"1")
    }

    const handleLayoutChange = () => {
        setLayout(prev => !prev)
    }
    

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
                    <button onClick={() => console.log(topManga)}>CLICK</button>
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
            <div className={`anime-grid ${layout ? "active" : ""}`}>
                {loading && 
                    <LoadingFB/>
                }
                {!loading &&
                    topManga.map(item => (
                        <CardTemplate
                            key={item.mal_id}
                            customClass="card"
                            id={item.mal_id}
                            type={"manga"}
                            title={item.title_english}
                            backUpTitle={item.title}
                            image={item.images.jpg.image_url}
                            layout={layout}
                            synopsis={item.synopsis}
                        />
                    ))
                }   
            </div>
            <div className="page-nav">
                {page > 1 && <button onClick={handleLess}>Go Back</button>}
                <button onClick={handleMore}>Next Page</button>
            </div>
        </>
    </section>
    )
}

