//React...
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

//Components...
import CardTemplate from "../components/cardTemplate"
import LoadingFB from "../components/loading-shean/loadingFB"

//React icons...
import { LuLayoutList, LuLayoutGrid } from "react-icons/lu";

//styles...
import "../styles/Anime.scss"
import { getTopList } from "../helperFunctions";


export default function ManhuaPage ({layout, setLayout}) {

    const navigate = useNavigate();

    //State that holds top anime from API...
    const [topManhua, setTopManhua] = useState([])

    //For loading animation/helper state...
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    //The localStorage maintains the page you were on...
    const [page, setPage] = useState(localStorage.getItem("currentManhuaPage") || "1")
    localStorage.setItem("currentManhuaPage", page)

  

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


    

    const manhuaAPI = `https://api.jikan.moe/v4/top/manga?type=manhua&page=${page}`;
    useEffect(() => {
        getTopList(manhuaAPI, setTopManhua, setLoading, navigate)
    }, [page])

    return (
        <section className="anime-page">
            <>
                <nav className="anime-nav-filter">
                    <h2>Top Manhua</h2>
                    <span onClick={handleLayoutChange}>
                        {layout && <LuLayoutGrid/>}
                        {!layout && <LuLayoutList/>}
                    </span> 
                    <button onClick={() => console.log(topManhua)}>CLICK</button>
                </nav>
                <div className={`anime-grid ${layout ? "active" : ""}`}>
                    {loading && 
                        <LoadingFB/>
                    }
                    {!loading &&
                        topManhua.map((item) => (
                            <CardTemplate
                                key={item.mal_id}
                                customClass="card"
                                id={item.mal_id}
                                type={"manhua"}
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