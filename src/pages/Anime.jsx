//React...
import { useState, useEffect, memo } from "react"

//Components...
import CardTemplate from "../components/cardTemplate"
import LoadingFB from "../components/loading-shean/loadingFB"

//React icons...
import { LuLayoutList, LuLayoutGrid } from "react-icons/lu";

//Helper functions...
import { getTopList } from "../helperFunctions";

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
    //const [error, setError] = useState(false);

    //The localStorage maintains the page you were on...
    const [page, setPage] = useState(localStorage.getItem("currentAnimePage") || "1")
    localStorage.setItem("currentAnimePage", page)

    
    // async function getTopAnime() {
    //     try {
    //         const apiFetch = await fetch(`https://api.jikan.moe/v4/top/anime?limit=${limit}&page=${page}&filter=${filter}`)
    //         const data = await apiFetch.json();

    //         setLoading(false);
    //         if(data.data.length === 0) throw error;
            
    //         setTopAnime(data.data)
    //     } catch (error) {
    //         navigate("/error")
    //     }
    // }

    //Functions that navigates the pages of the API...
    const handleMore = (e) => {
        e.currentTarget.parentElement.classList.add("more");
        setPage(prev => +prev + +"1")
    }
    const handleLess = (e) => {
        e.currentTarget.parentElement.classList.remove("more")
        setPage(prev => +prev - +"1")
    }
    //Hadles layout change....
    const handleLayoutChange = () => {
        setLayout(prev => !prev)
    }


    useEffect(() => {
        getTopList(limit, page, filter, setTopAnime, setLoading, navigate)
    }, [page, filter])



    return (
        <section className="anime-page">
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
                        <option value="airing">Airing</option>
                        <option value="upcoming">Upcoming</option>
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
                    topAnime?.map((item, i) => (
                            <CardTemplate
                                key={i}
                                customClass="card"
                                id={item.mal_id}
                                type={"anime"}
                                title={item.title_english}
                                backUpTitle={item.title}
                                image={item.images.jpg.image_url}
                                layout={layout}
                                score={item.score}
                                synopsis={item.synopsis}
                            />
                    ))
                }
                
            </div>
            <div className="page-nav">
                {page > 1 && <button onClick={handleLess}>Go Back</button>}
                <button onClick={handleMore}>Next Page</button>
            </div> 
        </section>
    );
});

export default AnimePage