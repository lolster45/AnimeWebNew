//React...
import { useState, useEffect } from "react"

//React-router...
import {useNavigate, Link} from "react-router-dom"

//Firebase...
import {auth, database} from "../../../config/firebase"
import {addDoc, collection, getDocs, query, where, deleteDoc, doc} from "firebase/firestore"
import {useAuthState} from "react-firebase-hooks/auth"

//React icons...
import {AiOutlineHeart, AiFillHeart} from "react-icons/ai"
import { AiOutlineLike } from "react-icons/ai";
import { BiDislike } from "react-icons/bi";



import { useDispatch } from "react-redux"
import { setUserPost } from "../../../store"


//Styles...
import "../../../styles/Community.scss"

export default function Post ({data}) {
    const [user] = useAuthState(auth);

    const [likeAmount, setLikeAmount] = useState([]);

    const navIfLogOut = useNavigate()
    
    if (!user) {
        navIfLogOut("/")
    }

    const LikesReference = collection(database, "likes");

    const getLikes = async () => {
        try {
            const likesDoc = query(LikesReference, where("postId", "==", data.postId));

            const likeData = await getDocs(likesDoc);

            setLikeAmount(
              likeData.docs.map((doc) => ({
                userId: doc.data().userId,
                likeId: doc.id,
              }))
            );
          } 
          catch (error) {
            console.error("Error fetching likes:", error);
          }
    }

    const removeLike = async () => {
        try {
            const likeToDeleteQuery = query(LikesReference, 
                where("postId", "==", data.postId), 
                where("userId", "==", user?.uid)
            )

            const likeToDeleteData = await getDocs(likeToDeleteQuery);


            const likeId = likeToDeleteData.docs[0].id;


            const actualDeleteData = doc(database, "likes", likeId);

            await deleteDoc(actualDeleteData)
    
            if (user) {
                setLikeAmount(prev => prev && prev.filter(item => item.likeId !== likeId))
            }  
            
        } 
        catch (error) {
            console.log(error)
        }
    }

    const addLike = async () => {
        const haveLikedPost = likeAmount.filter(like => like.userId === user.uid);

        if(haveLikedPost.length > 0) {
            removeLike()
            return;
        }
        try {   
            
            const newDoc = await addDoc(LikesReference, {userId: user?.uid, postId: data.postId});

            if (user) {
                setLikeAmount(
                    prev => prev 
                        ? [...prev, {userId: user?.uid, likeId: newDoc.id}] 
                        : {userId: user?.uid, likeId: newDoc.id}
                )
            }  
        } 
        catch (error) {
            console.log(error)
        }
    }


    const dispatch = useDispatch();
    const updateState = () => {
        dispatch(setUserPost(data))
    }

    useEffect(() => {
        getLikes()
    }, [])
    //------------------------------------------

    return (
        <div className='post'>
            <div className='post-top'>
                <div>
                    <img src={data.image} alt="profiel pic of user post" />
                    <div>Posted by {data.username}</div>
                </div>
                <div>date</div>
            </div>
            <div className='post-middle'>
                <Link onClick={updateState} to={`${data.postId}`}>
                    <h2>{data.title}</h2>
                </Link>
                <p>{data.text}</p> 
            </div>
            <div className='post-bottom'>
                <div className="like-wrap">
                    <span className="like-single-counter" onClick={addLike}>
                        <AiOutlineLike/>
                        {likeAmount.length}
                    </span>
                    <span className="like-single-counter">
                        <BiDislike/>
                        0
                    </span>
                </div>
            </div>
        </div>
    )
}


{/* <article className="user-post">
<div>
    <img src={post.userImg} alt="profile picture of user"/>
    {post.username}
</div>
<h1>{post.title}</h1>
<p>{post.description}</p>
<button onClick={hasLikedPost ? removeLike : addLike} className="likes">
    {!hasLikedPost && <AiOutlineHeart className="no-like"/>}
    {hasLikedPost && <AiFillHeart className="yes-like"/>}
    {likeAmount && likeAmount?.length}
</button>
</article> */}