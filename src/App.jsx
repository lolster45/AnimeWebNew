//React...
import { useState, Suspense, lazy } from "react"
import {HashRouter, Routes, Route, Link} from "react-router-dom"

//componenets...
import LeftNav from "./components/Nav"
import RightNav from "./components/srch-advertise"
import SpinnerPage from "./components/PageTransitionSpinner/SpinnerPage"

//React-redux...
import {Provider} from "react-redux"
import { Store } from "./store"

//Pages...
import Home from "./pages/Home-Folder/index"
const AnimePage = lazy(() => import('./pages/Anime'));
const Manga = lazy(() => import('./pages/Manga'));
const ManhwaPage = lazy(() => import('./pages/Manhwa'));
const ManhuaPage = lazy(() => import('./pages/Manhua'));
const MoreInfo = lazy(() => import('./pages/MoreInfoFolder/MoreInfo'));
const Discovery = lazy(() => import('./pages/Discovery'));
const Community = lazy(() => import('./pages/createPost/CommunityFolder/Community'));
const Collection = lazy(() => import('./pages/CollectionFldr/Collection'));
const Search = lazy(() => import('./pages/SearchFolder/Search'));
const Login = lazy(() => import('./pages/Login'));
const MobileNav = lazy(() => import('./pages/Mobile-nav'))
const ErroPage = lazy(() => import('./pages/ErrorPageFolder/ErrorPage') )

const AdminPage = lazy(() => import('./pages/AdminDashBoard') )

const PrivateRoute = lazy(() => import('./components/PrivateRouteFolder/PrivateRoute'))


import ChatPage from './pages/ChatBox'

//Firebase...
import { auth } from "./config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { signOut } from "firebase/auth"

//styles...
import "./styles/index.scss"
import ForumPage from "./pages/ForumFolder/ForumPage"
import Post from "./pages/createPost/CommunityFolder/Posts"
import ForumPostDetails from "./pages/ForumPostDetailsFolder/ForumPostDetails"

function App() {

  //Firebase...
  const [user] = useAuthState(auth)

  //Layout and mobile nav states...
  const [layout, setLayout] = useState(false);
  const [menu, setMenu] = useState(false);

  //Hamburger menu handler function...
  const handleHamburger = () => {
    setMenu(prev => !prev)
  }

  const userSignOut = async () => {
    await signOut(auth)
    setMenu(prev => !prev)
  }

  return (
    <div className="App">
      <Provider store={Store}>
        <HashRouter>
          <LeftNav />


          <div id="middle-section">
            <MobileNav handleHamburger={handleHamburger}/>
            <div className={`mobile-nav-menu ${menu ? "active" : ""}`}>
              <ul>
                <Link to="/" onClick={handleHamburger}>Home</Link>
                <Link to="/discovery/anime" onClick={handleHamburger}>Discovery</Link>
                <Link to="/bookMarks" onClick={handleHamburger}>Bookmarks</Link>
                <Link to="/chat" onClick={handleHamburger}>Chat</Link>
                {user && <Link to="/community" onClick={handleHamburger}>Community</Link>}
                {!user && 
                    <div>
                        <Link className="login-logOut-btn" to="/login" onClick={handleHamburger}>Sign Up</Link>
                    </div>
                }
                {user && (
                    <button onClick={userSignOut} className="login-logOut-btn" >Log out</button>
                )}
              </ul>   
            </div> 
            <Suspense fallback={<SpinnerPage/>}>
              <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/discovery" element={<Discovery />}>
                  <Route path="anime" element={<AnimePage layout={layout} setLayout={setLayout}/>} />
                  <Route path="anime/moreInfo/:id" element={<MoreInfo />} />
                  <Route path="manga" element={<Manga layout={layout} setLayout={setLayout}/>} />
                  <Route path="manga/moreInfo/:id" element={<MoreInfo />} />
                  <Route path="manhwa" element={<ManhwaPage layout={layout} setLayout={setLayout}/>} />
                  <Route path="manhwa/moreInfo/:id" element={<MoreInfo />} />
                  <Route path="manhua" element={<ManhuaPage layout={layout} setLayout={setLayout}/>} />
                  <Route path="manhua/moreInfo/:id" element={<MoreInfo />} />
                </Route>
                <Route path="/search" element={<Search />} />


                <Route path="/community" element={<Community />}/>
                <Route path='/community/forum/:forunName' element={<ForumPage/>}/>
                <Route path='/community/forum/:forunName/:postId' element={<ForumPostDetails/>}/>



                <Route path="/bookmarks" element={<Collection />} />


                <Route path="/chat" element={<ChatPage/>}/>

                

                <Route path="/login" element={<Login />}/>
                <Route path="/signUp" element={<Login signUp={true} />}/>


                <Route path="/error" element={<ErroPage />} />


                <Route
                    path="/admin-dashboard"
                    element={
                        <PrivateRoute>
                            <AdminPage />
                        </PrivateRoute>
                    }
                />


              </Routes>
            </Suspense>
          </div>


          <RightNav />


        </HashRouter>
      </Provider>
    </div>

  )
}

export default App
