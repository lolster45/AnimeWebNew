//React...
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

//Firebase...
import { auth } from "../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"

//React redux toolkit...
import { useDispatch } from "react-redux"
import { searchType } from "../store"

//React icons...
import {RxHamburgerMenu} from "react-icons/rx"
import { IoPersonCircleOutline, IoSearchOutline } from "react-icons/io5";


//Styles...
import "../styles/Discovery.scss"
//Styles...it use Discovery.scss


export default function MobileNav ({handleHamburger}) {

    const [user] = useAuthState(auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const [search, setSearch] = useState("");

    

   

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(searchType({type: search}))
        setSearch("")
        navigate("/search")
    }

    return (
        <nav className="mobile-nav-wrap">
            <div className="mobile-nav">
                <div className="left-side-nav">
                    <div className="hamburger">
                        <RxHamburgerMenu  onClick={handleHamburger}/>
                    </div>
                    <div>
                        <Link to={"/"}>
                            <img src="/logo.png" alt="logo of the website"/>
                        </Link>
                        <Link to={"/"}>
                            <h5>Neanime</h5>
                        </Link>
                    </div>
                </div>
                <div className="right-side-nav">
                    <Link to={"/search"}>
                        <IoSearchOutline/>
                    </Link>
                    {!user &&
                        <IoPersonCircleOutline/>
                    }
                    {user &&
                        <img src={user.photoURL} alt="profile image of user"/>
                    }
                </div>
            </div>        
        </nav>
    )
}