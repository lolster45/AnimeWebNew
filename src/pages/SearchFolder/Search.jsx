//React...
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//Components...
import Spinner from "../../components/LoadingFolder/loading";
import SingleSlideCard from "../SingleSlideFolder/SingleSlideCard";

//React redux toolkit...
import {useSelector } from "react-redux";

//React-icons...
import {MdOutlineArrowBack} from "react-icons/md"

//Styles...
import "../../styles/Search.scss"


export default function Search() {
    
    //State that holds search results...
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);


    //Gets the search input from user using react redux toolkit...
    let searchString = useSelector((state) => state.search.value.type)

    const getSearchResults = async () => {
        try {
            setLoading(true)
            const res = await fetch(`https://api.jikan.moe/v4/anime?q=${searchString}`)
            const data = await res.json()
            setLoading(false)
            setSearchResults(data.data)
        } 
        catch (error) {
            console.log(error, "error searching...")
        }
    }
    
    //State that holds current users live search...
    const [currentPageInputSearch, setCurrentPageInputSearch] = useState("");
    
    const handleChange = (e) => {
        setCurrentPageInputSearch(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        searchString = currentPageInputSearch;

        setCurrentPageInputSearch("")
        getSearchResults()
    }

    useEffect(() => {
        getSearchResults()
    }, [searchString])

    return (
       <section className="search-page">
            <header>
                <Link to={-1}>
                    <MdOutlineArrowBack/>
                </Link>
                <h1>...Results</h1>
            </header>
            <form onSubmit={handleSubmit} className="user-input-search">
                <input onChange={handleChange} value={currentPageInputSearch} placeholder="Search..."/>
            </form>
            {loading && 
                <div className="loading-animation">
                    <Spinner/>
                </div>
            }
            {!loading && 
                searchResults.map((item,i) => (
                    <SingleSlideCard
                        key={i}
                        mal_id = {item.mal_id}
                        type = "anime"
                        image = {item.images?.jpg?.image_url}
                        title = {item.title}
                        synopsis= {item.synopsis}
                        status= {item.status}
                        score= {item.score}
                    />
                ))
            }
        </section>
    )
}