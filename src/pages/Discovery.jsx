
//React...
import { Outlet, Link } from "react-router-dom"

//Styles...
import "../styles/Discovery.scss"
import { useState } from "react"


export default function Discovery () {

    //Handles page navigation using local storage...
    const handleAnimeClick = (e) => {
        localStorage.setItem("currentAnimePage", "1")
        //dispatch(nameInput({type: e.currentTarget.getAttribute("data-name")}))
    }
    const handleMangaClick = (e) => {
        localStorage.setItem("currentAnimePage", "1")
        //dispatch(nameInput({type: e.currentTarget.getAttribute("data-name")}))
    }


    
    return (
        <section className="discovery-page">
            <nav className="discovery-nav">
                <Link onClick={handleAnimeClick} to="anime">Anime</Link>
                <Link onClick={handleMangaClick} to="manga">Manga</Link>
                <Link to="manhwa">Manhwa</Link>
                <Link to="manhua">Manhua</Link>
            </nav>
            <Outlet/>
            <footer>@ 2022 AnimeFun - A project build with ReactJS</footer>
        </section>
    )
}