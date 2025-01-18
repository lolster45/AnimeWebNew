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

        const createUserOnLocalStorage = (arr) => {
           // console.log("Adding user ID to local storage:", user.uid);

            arr.push(user.uid);

            localStorage.setItem("arrayOfIDS", JSON.stringify(arr));
        }

        const createUserInfoOnFirebase = async () => {
            try {
                await setDoc(doc(database, "userInfo", user?.uid), {
                    email: user?.email,
                    userId: user?.uid,
                    userBookmarks: []
                });
            } catch (error) {
                console.log("Error creating user info:", error);
            }
        };
        
        const checkIfHasFirebaseAccount = async () => {
            try {

                const res = await getDoc(doc(database, "userInfo", user?.uid));
                return res.exists();
                
            } 
            catch (error) {
                console.log("Error checking account:", error);
                return false;
            }
        };


        const checkActStatus = async () => {
            //Purposes is to create local and firebase account if not present but checks firebase first since the local storage check failed in finding their user uid...
            const res = await checkIfHasFirebaseAccount();

            if (!res) {
                console.log("Creating user info and adding user ID to local storage:", user.uid);
                const arrayOfIDS = [user.uid];
                localStorage.setItem("arrayOfIDS", JSON.stringify(arrayOfIDS));//creates local storage of user Id...
                createUserInfoOnFirebase(); // Call createUserInfoOnFirebase() only when creating a new user info
                return;
            } 
            else {
                //path of local storage not finding user Id but finding it on firebase database...

                createUserOnLocalStorage([])
                console.log("User account exists in Firestore:", user.uid);
                return;
            }
        }


        


        
        useEffect(() => {
            if (user) {
                const storedIDS = localStorage.getItem("arrayOfIDS");

                if (storedIDS) {//Path of local storage array already existing on user end...
                    const localStorageArrayOfIds = JSON.parse(storedIDS);

                    if (!localStorageArrayOfIds.includes(user.uid)) {//Does not find user.uid on local...
                        
                        
                        checkIfHasFirebaseAccount()
                        .then(res => {
                            if(!res) {
                                createUserInfoOnFirebase();
                            }
                            else {
                                console.log("found firebase account...")
                            }
                        });
                        createUserOnLocalStorage(localStorageArrayOfIds);
                        return;

                    } 
                    else {//User account exists on local storage but not on database...
                        console.log("checking firebase...")
                        checkIfHasFirebaseAccount()
                            .then(res => {
                                if(!res) {
                                   createUserInfoOnFirebase();
                                }
                                else {
                                    console.log("found firebase account...")
                                }
                            });


                        //console.log("User ID already exists and found firebase account", user.uid);
                        return;
                    }
                } 
                else { //path of local storage not existing on user end...
                    checkActStatus();
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
                    <h1 className="rec-title">
                        Editors Favorites
                    </h1>
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
                    style={{margin: "0 auto", textAlign: "center", color: "gray", padding: "10px"}}
                >
                    @ 2025 AnimeFun - A project built with ReactJS by me
                </footer>
            </section>
        )
    }