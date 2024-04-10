//React...
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

//Components...
import CardTemplate from "../components/cardTemplate"
import LoadingFB from "../components/loading-shean/loadingFB"

//React icons...
import { LuLayoutList, LuLayoutGrid } from "react-icons/lu";

//Styles...
import "../styles/Anime.scss"

export default function Manga ({layout, setLayout}) {

    const navigate = useNavigate();


    //State that holds top anime from API...
    const [topManhwa, setTopManhwa] = useState([]);

    //API information...
    const [filter, setFilter] = useState("publishing");
    const [limit, setLimit] = useState("25");

    //For loading animation/helper state...
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    //Sets local storage for pagination...
    const [page, setPage] = useState(localStorage.getItem("currentMangaPage") || "1")
    localStorage.setItem("currentMangaPage", page)

    async function getTopManhwa() {
        const apiGetTwo = 
            `https://api.jikan.moe/v4/top/manga?filter=${filter}&limit=${limit}&page=${page}`;

        try {
            const apiFetch = await fetch(apiGetTwo)
            const data = await apiFetch.json();

            setLoading(false)
            if(data.data.length === 0) throw error
            
            setTopManhwa(data.data)
        } catch (error) {
            navigate("/error")
        }
    }

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
    
    useEffect(() => {
        getTopManhwa()
    }, [page, filter])

    return (
    <section className="anime-page">
        <>
            <nav className="anime-nav-filter">
                <h2>Top Anime</h2>
                <div>
                    <button onClick={() => console.log(topManhwa)}>CLICK</button>
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
                    topManhwa.map(item => (
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

