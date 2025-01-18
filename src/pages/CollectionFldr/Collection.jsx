//React...
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

//Components....
import SingleSlideCard from "../SingleSlideFolder/SingleSlideCard"

//Fiebase...
import {auth, database} from "../../config/firebase"
import {getDoc, doc} from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"

//Styles...
import "../../styles/Collection.scss"

export default function Collection () {

    const [user] = useAuthState(auth)

    //Holds data of users bookmarks...
    const [userData, setUserData] = useState([])

    const getUserBM = async () => {
        if (user) {
            try {
                const docRef = doc(database, "userInfo", `${user.uid}`)
                const userInfo = await getDoc(docRef)
                if (userInfo.exists()) {
                    setUserData(userInfo.data().userBookmarks.map(item => item).reverse())
                } 
            }
            catch (error) {
                console.log("ERROR GETTING USER BOOKMARKS...", error)
            }
        } 
        return;
    }

    useEffect(() => {
        getUserBM()
    }, [user])


    return (
        <section className="collection-page">
            {!user && 
            <div className="modal-for-noUser">
                <h1 
                    style={{color: "white", textAlign: "center", marginTop: "30px"}}>
                        Sign in for Bookmarks...
                </h1>
                <ul>
                    <li>Access to Community tab</li>
                    <li>Bookmark you favorite shows</li>
                </ul>
                <Link to="/login">
                    Sign in
                </Link>
            </div>
            }
            
            {user && <h1 className="bm-header">BookMarks</h1>}
            {user &&
                userData?.map((item, i) => (
                    <SingleSlideCard
                        key={i}
                        mal_id={item.mal_id}
                        type={item.type}
                        image={item.image}
                        title={item.title}
                        synopsis={item.synopsis}
                        status={item.status}
                        score={item.score}
                    />
                ))
            }
            {userData.length < 1 && user &&
                <h4 style={{color: "white", textAlign: "center", padding: "15px"}}>
                    No Collections...
                </h4>
            }
        </section>
    )
}