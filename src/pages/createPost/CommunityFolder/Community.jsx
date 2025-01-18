import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

//Firebase...
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../config/firebase";

//React icons...
import { MdArrowRightAlt } from "react-icons/md";

//Styles...
import "../../../styles/Community.scss";

export default function Community () {
    const [user] = useAuthState(auth);
    const [num, setNum] = useState(0); // Start with the first section

    // State for forum data
    const [test, setTest] = useState({
        forumSection: [
            {
                sectionName: "Official Forums",
                forums: [
                    {
                        userId: user?.uid,
                        forumId: 'd0956ef4-4b38-438e-abc6-5ac4734158ef',
                        official: true,
                        public: true,
                        name: "Community Rules",
                        description: "Here you will find the rules of our community",
                        image: "https://preview.redd.it/i-got-bored-so-i-decided-to-draw-a-random-image-on-the-v0-4ig97vv85vjb1.png?width=1080&crop=smart&auto=webp&s=28c3ad73cff636f7ba478a0c19d734cd538949d4",
                        date: new Date().toLocaleDateString()
                    },
                    {
                        userId: user?.uid,
                        forumId: '3fcbd1a2-2e2c-49c0-81c0-0dfc8fb46cec',
                        official: true,
                        public: true,
                        name: "Top Slice of Life Animes",
                        description: "Discuss the latest slice of life or any slice of life anime",
                        image: "https://preview.redd.it/i-got-bored-so-i-decided-to-draw-a-random-image-on-the-v0-4ig97vv85vjb1.png?width=1080&crop=smart&auto=webp&s=28c3ad73cff636f7ba478a0c19d734cd538949d4",
                        date: new Date().toLocaleDateString()
                    },
                ]
            },
            {
                sectionName: "Public Forums",
                forums: [
                    {
                        userId: user?.uid,
                        forumId: 'f2o8rfsndfj2hi3oigs',
                        official: false,
                        public: true,
                        name: "Recent Anime Events",
                        description: "Recent events about anime related content",
                        image: "https://preview.redd.it/i-got-bored-so-i-decided-to-draw-a-random-image-on-the-v0-4ig97vv85vjb1.png?width=1080&crop=smart&auto=webp&s=28c3ad73cff636f7ba478a0c19d734cd538949d4",
                        date: new Date().toLocaleDateString()
                    }
                ]
            },
            {
                sectionName: "Recent Events",
                forums: [
                    {
                        userId: user?.uid,
                        forumId: 'abcd1234',
                        official: false,
                        public: true,
                        name: "Anime Expo Recap",
                        description: "A quick recap of Anime Expo events",
                        image: "https://preview.redd.it/i-got-bored-so-i-decided-to-draw-a-random-image-on-the-v0-4ig97vv85vjb1.png?width=1080&crop=smart&auto=webp&s=28c3ad73cff636f7ba478a0c19d734cd538949d4",
                        date: new Date().toLocaleDateString()
                    }
                ]
            }
        ]
    });

    const handleForumNum = (e) => {
        const { value } = e.target;
        setNum(parseInt(value, 10)); // Set the section number
    };

    return (
        <section className="community-page">
            <div className="nav-location">
                <Link to={'/'}>Home</Link>
                <MdArrowRightAlt />
                <Link>Forum</Link>
            </div>
            <section className="forum-section">
                <div className="forum-nav">
                    <div className="left-nav">
                        <button value={0} onClick={handleForumNum}>Official Forums</button>
                        <button value={1} onClick={handleForumNum}>Public Forums</button>
                        <button value={2} onClick={handleForumNum}>Recent Events</button>
                    </div>
                    <button>Filter</button>
                </div>
                <div className="forums-list-wrap">
                    {
                        test.forumSection[num]?.forums.map(forum => (
                            <Link 
                                to={`forum/${forum.name}+${forum.forumId}`} 
                                key={forum.forumId} 
                                className="forum-row"
                            >
                                <div className="row-left">
                                    <img src={forum.image} alt="image representing forum" />
                                    <div>
                                        <h3>{forum.name}</h3>
                                        <p>{forum.description}</p>
                                    </div>
                                </div>
                                <div className="row-right">
                                    {forum.date}
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </section>
            <Outlet />
        </section>
    );
}
