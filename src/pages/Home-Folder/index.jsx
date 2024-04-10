    //React..
    import { useEffect } from "react"
    import { Link } from "react-router-dom"
    import { LazyLoadImage } from "react-lazy-load-image-component";

    //React-slick...
    import Slider from "react-slick"
    import "slick-carousel/slick/slick.css"; 
    import "slick-carousel/slick/slick-theme.css";

    //Home data...
    import {settings, settingsMain, images, manhwa, trendingSlider} from "./Home-data"

    //firebase...
    import {auth, database} from "../../config/firebase"
    import { useAuthState } from "react-firebase-hooks/auth"
    import { setDoc, doc, getDoc,  } from "firebase/firestore"

    //Styles...
    import "../../styles/SubHome.scss"


    export default function Home () {
        //Firebase...
        const [user] = useAuthState(auth)
       
        const handleAnimeClick = (e) => {
            localStorage.setItem("currentAnimePage", "1")
            //dispatch(nameInput({type: e.currentTarget.getAttribute("data-name")}))
        }   

        const createUserInfo = async () => {
            try {
                await setDoc(doc(database, "userInfo", user?.uid), {
                    userId: user?.uid,
                    userBookmarks: []
                });
                const storedData = localStorage.getItem("arrayOfIDS");
                let data = [];
                if (storedData) {
                    data = JSON.parse(storedData);
                }
                data.push(user.uid);
                localStorage.setItem("arrayOfIDS", JSON.stringify(data));
            } catch (error) {
                console.log("Error creating user info:", error);
            }
        };
        
        const haveAccount = async () => {
            try {
                if (user) {
                    const res = await getDoc(doc(database, "userInfo", user?.uid));
                    return res.exists();
                }
                return false;
            } catch (error) {
                console.log("Error checking account:", error);
                return false;
            }
        };
        
        useEffect(() => {
            if (user) {
                const storedIDS = localStorage.getItem("arrayOfIDS");
                if (storedIDS) {
                    const newStored = JSON.parse(storedIDS);
                    if (!newStored.includes(user.uid)) {
                        console.log("Adding user ID to local storage:", user.uid);
                        newStored.push(user.uid);
                        localStorage.setItem("arrayOfIDS", JSON.stringify(newStored));
                    } else {
                        console.log("User ID already exists in local storage:", user.uid);
                    }
                } 
                else {
                    haveAccount().then((hasAccount) => {
                        if (!hasAccount) {
                            console.log("Creating user info and adding user ID to local storage:", user.uid);
                            const arrayOfIDS = [user.uid];
                            localStorage.setItem("arrayOfIDS", JSON.stringify(arrayOfIDS));
                            createUserInfo(); // Call createUserInfo() only when creating a new user info
                        } else {
                            console.log("User account exists in Firestore:", user.uid);
                        }
                    });
                }
            }
        }, [user]);
        

        return (
            <section className="subHome-page">               
                <main>
                    <h1 className="trending-title">Trending</h1> 
                    <div className="image-gradient">        
                        <Slider {...settingsMain}>
                            {
                                trendingSlider.map(item => {
                                    return (
                                        <div key={item.id} className="trending-slides">
                                            <LazyLoadImage
                                                className="main-image"
                                                src={item.image}
                                                alt="image of trendings show on home page"
                                                offset={100}
                                            />
                                            <h2 className="main-title">{item.title}</h2>
                                            <p className="carousel-synopsis">{item.synopsis}</p>
                                            <Link 
                                                to={`discovery/anime/moreInfo/${item.id}`}
                                                data-name="anime"
                                                className="more-info-btn" 
                                                onClick={handleAnimeClick}
                                            >
                                                More Information  
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>
                    <div className="image-gradient mobile">     
                        {/* Only shows up when device is mobile */}
                        <Slider {...settingsMain}>
                            {
                                trendingSlider.map(item => {
                                    return (
                                        <div key={item.id} className="trending-slides">
                                            <LazyLoadImage
                                                className="main-image"
                                                src={item.image}
                                                alt="image of trendings show on home page"
                                                offset={10}
                                            />
                                            <h2 className="main-title">
                                                <img src={item.mobileImage}/>
                                            </h2>
                                            <p className="carousel-synopsis">{item.synopsis}</p>
                                            <Link 
                                                to={`discovery/anime/moreInfo/${item.id}`}
                                                data-name="anime"
                                                className="more-info-btn" 
                                                onClick={handleAnimeClick}
                                            >
                                                More Information  
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>
                    <h1 className="rec-title">Editors Favorites</h1>
                    <Slider {...settings} className="carousel-wrap" id="sliderId">
                        {
                            images.map((item,i) => (
                                <Link 
                                    key={i} 
                                    to={`discovery/anime/moreInfo/${item.id}`}
                                    data-name="anime"
                                >
                                    <LazyLoadImage
                                        src={item.image}
                                        alt="image of trendings content on home page"
                                        offset={10}
                                        effect="blur"
                                    />
                                    <p>
                                        {item.title}
                                    </p>
                                </Link>
                            ))
                        }
                    </Slider>
                    <h1 className="rec-title">Manhwa</h1>
                    <Slider {...settings} className="carousel-wrap">
                        {
                            manhwa.map((item,i) => (
                                <Link 
                                    key={i} 
                                    to={`discovery/manga/moreInfo/${item.id}`}
                                    onClick={handleAnimeClick} 
                                    data-name="manga"
                                >   
                                     <LazyLoadImage
                                        src={item.image}
                                        alt="image of trendings content on home page"
                                        offset={100}
                                        effect="blur"
                                    />
                                    <p>{item.title}</p>
                                </Link>
                            ))
                        }
                    </Slider>
                </main>
                <footer 
                    style={{margin: "0 auto", textAlign: "center", color: "white", padding: "10px"}}
                >
                    @ 2024 AnimeFun - A project built with ReactJS by me
                </footer>
            </section>
        )
    }