//React...
import { useEffect, useState } from "react"

//Components...
import Post from "./Posts"
import CreatePosts from "../form"

//Firebase...
import { useAuthState } from "react-firebase-hooks/auth"
import { getDocs, collection} from "firebase/firestore"
import { auth, database } from "../../../config/firebase"

//Styles...
import "../../../styles/Community.scss"


export default function Community () {

    const [user] = useAuthState(auth)
    const [userPosts, setUserPosts] = useState([]);

    const getPosts = async () => {
        try {
            if (user) {
                const collectionRef = collection(database, "userPosts");
                const snapshot = await getDocs(collectionRef);
    
                const userInfoData = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
                setUserPosts(userInfoData);
            }
        } 
        catch (error) {
            console.log(error, "something wrong with getting users posts")
        }
    }

    useEffect(() => { 
        getPosts()    
    }, [])

    return (
        <section className="community-page">
            <h2>Community Page</h2>
            <CreatePosts/>
            <section className="user-posts-container">
                {
                    userPosts?.map((post, i) => (
                        <Post
                            key={i}
                            post={post}
                        />
                    ))
                }
            </section>
        </section>
    )
}