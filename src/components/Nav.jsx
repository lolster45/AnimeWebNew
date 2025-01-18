//Components...
import { useState } from "react"
import {Link} from "react-router-dom"

//Firebase...
import {auth} from "../config/firebase"
import {signOut} from "firebase/auth"
import {useAuthState} from "react-firebase-hooks/auth"

//React Icons...
import {AiFillHome} from "react-icons/ai"
import {BsCompass, BsJournalBookmarkFill} from "react-icons/bs"
import {FaDiscord} from "react-icons/fa"
import {IoLogOutOutline} from "react-icons/io5"
import {IoIosLogIn} from "react-icons/io"
import { IoAnalytics } from "react-icons/io5";
import { FaWandMagicSparkles } from "react-icons/fa6";



//Images...
import Logo from "/logo.png"

//React redux toolkit...
import { useDispatch } from "react-redux"
import { nameInput } from "../store"


const adminId = import.meta.env.VITE_ADMIN_ID;


//Styles...
import "../styles/Nav.scss"


export default function Nav () {
    //Firebase...
    const [user] = useAuthState(auth);


    //React toolkit...
    const dispatch = useDispatch()
    
    //Sets the coloring for showing which tab is active...
    const [active, setActive] = useState("home")
    const activeNav = (navLink) => {
        setActive(navLink)
    }

    //Signs user out of firebase...
    const userSignOut = async () => {
        await signOut(auth)
    }

    //Set the type of content for redux toolkit...
    const handleAnimeClick = () => {
        dispatch(nameInput({type: "anime"}))
    }
    

    return (
        <section className="home-nav">
            <div className="logo-main">
                <img src={Logo}/>
                <h1>neanime</h1>
            </div>
            <nav>
                <h2>MENU</h2>
                <ul>
                    <Link 
                        to="/"
                        onClick={() => activeNav("home")} 
                        className={`menu-item ${active === "home" ? "active" : ""}`} 
                    >
                        <AiFillHome className={`icon ${active === "home" ? "active": ""}`}/>Home
                    </Link>
                    <Link 
                        to="/discovery/anime"
                        onClick={() => {
                            activeNav("discovery")
                            handleAnimeClick()
                     
                        }} 
                        className={`menu-item ${active === "discovery" ? "active" : ""}`} 
                    >
                        <BsCompass className={`icon ${active === "discovery" ? "active": ""}`}/>
                        Discovery
                    </Link>
                    {user &&
                        <Link 
                            to="/community"
                            onClick={() => activeNav("community")} 
                            className={`menu-item ${active === "community" ? "active" : ""}`} 
                        >
                            <FaDiscord className={`icon ${active === "community" ? "active": ""}`}/>Community
                        </Link>
                    }
                    {user &&
                        <Link 
                            to="/chat"
                            onClick={() => activeNav("chat")} 
                            className={`menu-item ${active === "chat" ? "active" : ""}`} 
                        >
                            <FaWandMagicSparkles className={`icon ${active === "community" ? "active": ""}`}/>Chat
                        </Link>
                    }
                    { user?.uid === adminId &&
                    <Link 
                        to="/admin-dashboard"
                        onClick={() => activeNav('analytics')}
                    >
                            <IoAnalytics className={`icon ${active === "analytics" ? "active": ""}`}/>
                            Analytics
                    </Link>
                    }
                </ul>
            </nav>
            <nav>
                <h2>LIBRARY</h2>
                <ul>
                    <Link 
                        to="/bookmarks"
                        onClick={() => {
                            activeNav("bookmarks")
                        }} 
                        // className={`menu-item ${active === "collection" ? "active" : ""}`} 
                    >
                        <BsJournalBookmarkFill className={`icon ${active === "bookmarks" ? "active": ""}`} />
                        BookMarks
                    </Link>   
                </ul>
            </nav>
            <nav className="user-account">
                {!user && 
                    <div>
                        <Link className="login-button" to="/login"><IoIosLogIn/>Log In</Link>
                    </div>
                }
                {user && (
                    <button onClick={userSignOut} className="userStatusBtn"><IoLogOutOutline/>Log out</button>
                )}
            </nav>
        </section>
    )
}