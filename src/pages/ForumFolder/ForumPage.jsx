//React....
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

//Components...
import Post from '../createPost/CommunityFolder/Posts';
import CreatePosts from '../createPost/form';

//Firebase...
import { auth, database} from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';

//React icons...
import { MdOutlineInsertComment } from "react-icons/md";

//Images...
import AnonymousUserProfile from "../../../public/standard-profile-pic.jpg"

//Styles...
import "./ForumPage.scss";


const ForumPage = () => {

    const [user] = useAuthState(auth);

    const location = useLocation();

    const parentForumId = location.pathname.split("+")[1];


    const [postsArr, setPostsArr] = useState([
      
    ]);

    const collectionRef = collection(database, 'posts')

    const addPostToForum = async () => {
        try {
            const newForum = {
                parentForumId: "3fcbd1a2-2e2c-49c0-81c0-0dfc8fb46cec",
                postId: "8e31d754-2d0c-42c9-9c24-42bef8b69609",
                userId: user.uid,
                date: new Date().toLocaleDateString(),
                image: user.photoURL || AnonymousUserProfile,
                username: user.displayName,
                title: "Any new Drops?",
                text: "lolfkjas fsalkfj alsfkasjfiewf sliagjo82j43o fsalkfjsalkjf iw3rj93alfsd93adlfjasfasflas lskfjlasff slkglsjglwijg 2o39riwejlasgsali laisjfals fisalfiajl flsiflasfijflis fidj fi fs"
            }

            const docRef = doc(collectionRef, newForum.postId);
            await setDoc(docRef, newForum)
      
            //console.log('Document added with ID:', docRef.id);

        } catch (error) {
          console.error('Error adding document:', error);
        }
    };

    const getPosts = async () => {

        const q = query(collection(database, 'posts'), where('parentForumId', '==', parentForumId))

        const snapshot = await getDocs(q);

        const docs = snapshot.docs.map(doc => ({...doc.data()}));

        setPostsArr(docs)
    }



    useEffect(() => {
        getPosts()
    }, [])



    //This is the page of the clicked forum...
    
    return (
        <div className='forum-page-wrap'>
            <span>{postsArr.length} posts</span>


            <section className='posts-wrap'>
                {postsArr.map(post => {
                    return (
                        <Post key={post.postId} data={post}/>
                    )
                })}
            </section>


            <CreatePosts parentForumId={parentForumId} setPostsArr={setPostsArr}/>


        </div>
    );
};

export default ForumPage;