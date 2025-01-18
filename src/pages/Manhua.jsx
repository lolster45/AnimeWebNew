//React...
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

//Components...
import BottomNav from "../components/BottomPageNav/BottomNav";
import GridItems from "../components/GridItems/GridItems";

//React icons...
import { LuLayoutList, LuLayoutGrid } from "react-icons/lu";

//Helper functions...
import { getTopList, handleMore, handleLess, handleLayoutChange} from "../helperFunctions";

//styles...
import "../styles/Anime.scss"


export default function ManhuaPage ({layout}) {

    const navigate = useNavigate();

    //State that holds top anime from API...
    const [topManhua, setTopManhua] = useState([])

    //For loading animation/helper state...
    const [loading, setLoading] = useState(true)

    //The localStorage maintains the page you were on...
    const [page, setPage] = useState(localStorage.getItem("currentManhuaPage") || "1")
    localStorage.setItem("currentManhuaPage", page)

    
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
                <GridItems data={topManhua} layout={layout} loading={loading}/>
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