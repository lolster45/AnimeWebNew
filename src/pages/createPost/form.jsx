//React...
import { useState } from "react"

//Firebase...
import { database, auth } from "../../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { collection, doc, setDoc } from "firebase/firestore"

//Random Id generator...
import { v4 as uuidv4 } from 'uuid';

//Image...
import AnonymousUserProfile from "../../../public/standard-profile-pic.jpg"

//Styles...
import "../../styles/Form.scss"


export default function CreatePosts ({parentForumId, setPostsArr}) {

    const [user] = useAuthState(auth)
    
    const [forumPost, setForumPost] = useState({title: '', comment: ''})


    const addPostToForum = async (e) => {
        e.preventDefault();
        const collectionRef = collection(database, 'posts')

        try {
            const randomPostId = uuidv4(); // Generate a random UUID

            const newPostInForum = {
                parentForumId: parentForumId,
                postId: randomPostId,
                userId: user.uid,
                date: new Date().toLocaleDateString(),
                image: user.photoURL || AnonymousUserProfile,
                username: user.displayName,
                title: forumPost.title,
                text: forumPost.comment
            }

            const docRef = doc(collectionRef, newPostInForum.postId);
            await setDoc(docRef, newPostInForum);

            setPostsArr(prev => [...prev, newPostInForum]);

            setForumPost({title: '', comment: ''})

    
        } 
        catch (error) {
          console.error(error);
        }
    };

    const handleInputChange = (e) => {
        const {value, name} = e.target;
        setForumPost(prev => ({
            ...prev,
            [name]: value
        }))
    }
  
    return (
        <form className="community-form" onSubmit={addPostToForum}>
            <input 
                className="input" 
                type="text" 
                name="title"
                value={forumPost.title}
                placeholder="title..." 
                onChange={handleInputChange}
            />
            <textarea 
                placeholder="description..." 
                name="comment"
                value={forumPost.comment}
                onChange={handleInputChange}
            />
            <input className="submit-btn" type="submit"/>
        </form>
    )
}