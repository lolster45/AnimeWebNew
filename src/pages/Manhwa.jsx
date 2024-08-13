//React...
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

//Components...
import CardTemplate from "../components/cardTemplate"
import LoadingFB from "../components/loading-shean/loadingFB"

//Pages...
//import ErrorPage from "../components/ErrorHandling/ErrorPage"

//React icons...
import { LuLayoutList, LuLayoutGrid } from "react-icons/lu";

//styles...
import "../styles/Anime.scss"


export default function ManhwaPage ({layout, setLayout}) {
    const navigate = useNavigate();


    //State that holds top anime from API...
    const [topManhwa, setTopManhwa] = useState([]);

    //API information...
    const [limit, setLimit] = useState("25");

    //For loading animation/helper state...
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    //The localStorage maintains the page you were on...
    const [page, setPage] = useState(localStorage.getItem("currentManhwaPage") || "1")
    localStorage.setItem("currentManhwaPage", page)

    async function getTopManhwa() {
        try {
            const apiFetch = await fetch(`https://api.jikan.moe/v4/top/manga?type=manhwa&limit=${limit}&page=${page}`)

            
            const data = await apiFetch.json();

            if(data.data.length === 0) throw error

            setLoading(false)
            setTopManhwa(data.data)    
        } catch (error) {
            setLoading(false)
            setError(true)
        }
    }

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

    const manhwaAPI = `https://api.jikan.moe/v4/top/manga?type=manhwa&limit=${limit}&page=${page}`;
    useEffect(() => {
        getTopManhwa(manhwaAPI, setTopManhwa, setLoading, navigate)
   }, [page])

    return (
        <section className="anime-page">
            <>
                <nav className="anime-nav-filter">
                    <h2>Top Manhwa</h2>

                    <span onClick={handleLayoutChange}>
                        {layout && <LuLayoutGrid/>}
                        {!layout && <LuLayoutList/>}
                    </span> 
                </nav>
                <div className={`anime-grid ${layout ? "active" : ""}`}>
                    {loading && 
                        <LoadingFB/>
                    }
                    {!loading && topManhwa.length === 0 && <h1 className="error-msg">404 ERROR</h1>}
                    {!loading &&
                        topManhwa.map((item) => (
                            <CardTemplate
                                key={item.mal_id}
                                customClass="card"
                                id={item.mal_id}
                                type={"manhwa"}
                                title={item.title_english}
                                backUpTitle={item.title}
                                image={item.images.jpg.image_url}
                                layout={layout}
                                synopsis={item.synopsis}
                            />
                        ))
                    } 
                </div>
                {topManhwa.length > 0 &&
                <div className="page-nav">
                    {page > 1 && <button onClick={handleLess}>Go Back</button>}
                    <button onClick={handleMore}>Next Page</button>
                </div>}
            </>
        </section>
    )
}