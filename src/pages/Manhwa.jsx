//React...
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

//Components...
import BottomNav from "../components/BottomPageNav/BottomNav"
import GridItems from "../components/GridItems/GridItems"

//React icons...
import { LuLayoutList, LuLayoutGrid } from "react-icons/lu";

//Helper functions...
import { getTopList, handleMore, handleLess, handleLayoutChange } from "../helperFunctions";


//styles...
import "../styles/Anime.scss"


export default function ManhwaPage ({layout}) {

    const navigate = useNavigate();

    //State that holds top anime from API...
    const [topManhwa, setTopManhwa] = useState([]);

    //For loading animation/helper state...
    const [loading, setLoading] = useState(true);

    //API information...
    const limit = '25';
    const [page, setPage] = useState(localStorage.getItem("currentManhwaPage") || "1"); //Maintains page you are on
    localStorage.setItem("currentManhwaPage", page);


    //API fetch calll...
    const manhwaAPI = `https://api.jikan.moe/v4/top/manga?type=manhwa&limit=${limit}&page=${page}`;
    useEffect(() => {
        getTopList(manhwaAPI, setTopManhwa, setLoading, navigate)
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
    
                <GridItems data={topManhwa} layout={layout} loading={loading}/>

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