//React...
import React, { useEffect, useState } from 'react';

//Redux...
import { useSelector } from 'react-redux';

//Firebase...
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { auth, database } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

//React icons...
import { TbArrowRotaryRight } from "react-icons/tb";



//Styles...
import "./forumPostDetails.scss"

const ForumPostDetails = () => {

    const [userF] = useAuthState(auth)

    const user = useSelector(state => state.userObj.user);

    const LikesReference = collection(database, "likes");
    //const likesDoc = query(LikesReference, where("postId", "==", post.id))


    const [form, setForm] = useState({
        image: userF?.photoURL,
        description: '',
        date: new Date().toLocaleDateString(),
    })

    const handleFormInput = (e) => {
        const {value, name} = e.target;
        setForm(prev => ({...prev, [name]: value}))
    }

    const [replyArr, setReplyArr] = useState([]);

    const fetchReplys = async () => {
        
        const replysDoc = 
            query(collection(database, 'replys'), where('parentCommentId', '==', user.postId));


        const snapShot = await getDocs(replysDoc);

        const docs = snapShot.docs.map(doc => ({...doc.data()}));

        const sortedReplies = docs.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });

        setReplyArr(sortedReplies)
    

    }

    //const [commentReplys, setCommentReplys] = useState([]);

    const [repliedPostId, setRepliedPostId] = useState({
        image: "",
        username: ""
    })

    const addRep = async () => {
        try {
            console.log('adding');

            await addDoc(collection(database, "replys"), {
                date: new Date().toLocaleDateString(),
                image: userF?.photoURL,
                parentCommentId: user.postId,
                replyId: "2929gnafgiweifasdfnkf",
                repliedUser: {
                    image: repliedPostId.image,
                    username: repliedPostId.username
                },
                text: "PLS!!! I NEED NEW ANIME NOW!!!",
                userId: userF.uid,
                username: userF.displayName,
            });
        } 
        catch (error) {
            console.log(error)
            
        }
      
    }

    const [activeForm, setActiveForm] = useState(false);

    useEffect(() => {
        fetchReplys()
    }, [])

    return (
        <section className='comment-details-wrap'>
            {/* <button onClick={() => console.log(replyArr)}>& ADD</button> */}

            <button onClick={() => console.log(form)}>ADD ME</button> 

            <h1>{user.title}</h1>

            {userF && 
                <div className='post'>
                    <div className='post-top'>
                        <div className='top-left'>
                            <img src={user.image} alt="profiel pic of user post" />
                            <div>Posted by {user.username}</div>
                        </div>
                        <div className='top-right'>date</div>
                    </div>



                    <div className='post-middle'>
                        <p>{user.text}</p> 
                    </div>


                    <div className='post-bottom'>
                        <div>
                            <span>Likes</span>
                        </div>
                        <span 
                            onClick={() => {
                                setActiveForm(true);
                            }}
                        >
                            Reply
                        </span>
                        {/* <MdOutlineInsertComment/> */}
                    </div>


                    
                </div>
            }


            {/* <section className="forum-detail-post-wrap">
                
            </section> */}

            {replyArr && 
                replyArr.map(rep => {
                    return (

                        <div key={rep.replyId} className='post'>
                            <div className='post-top'>
                                <div className='top-left'>
                                    <img src={rep.image} alt="profiel pic of user post" />
                                    <div>{rep.username}</div>
                                </div>
                                <div className='top-right'>
                                    <span>
                                        <TbArrowRotaryRight/>
                                        <img src={rep.repliedUser.image}/>
                                        {rep.repliedUser.username}
                                    </span> 
                                    {rep.date}
                                </div>
                            </div>
                            <div className='post-middle'>
                                <h2>{rep.title}</h2>
                                <p>{rep.text}</p> 
                            </div>
                            <div className='post-bottom'>
                                <div>
                                    <span>Likes</span>
                                </div>
                                <span 
                                    onClick={() => {
                                        setRepliedPostId({image: rep.image, username: rep.username});
                                        setActiveForm(true);
                                    }}
                                >
                                    Reply
                                </span>
                                {/* <MdOutlineInsertComment/> */}
                            </div>
                        </div>
                    )
                })
            }

            {activeForm &&
                <div className="form-input">
                    <div className='form-top-info'>
                        <div className='top-left'>
                            <img src={userF.photoURL} alt='photo of your profile pic'/>
                            Replying to ---> 
                            <span>{repliedPostId.username}</span>
                        </div>
                        <div className='top-right' onClick={() => setActiveForm(false)}>X</div>
                    </div>
                    <textarea 
                        name='description' 
                        value={form.description} 
                        onChange={handleFormInput}
                    >
                    </textarea>
                </div>
            
            }


            
        </section>
    );
};

export default ForumPostDetails;