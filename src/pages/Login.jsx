//React...
import { useEffect, useState } from "react"

//React-router...
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

//Firebase...
import {auth, provider} from "../config/firebase"
import {signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth"
import { useAuthState } from "react-firebase-hooks/auth"
import { doc, getDoc } from "firebase/firestore"
import { database } from "../config/firebase"

//React-icons...
import {FcGoogle} from "react-icons/fc"

//Styles...
import "../styles/Login.scss"


export default function Login({signUp = false}) {

    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    

    const [formInput, setFormInput] = useState({
        email: "",
        password: ""
    })


    const handleInput = (e) => {
        const {name, value} = e.target;

        setFormInput(prev => ({
            ...prev,
            [name]: value
        }))
    }


    const checkIfAdmin = async (userId) => {
        const adminDoc = doc(database, "admins", userId);
        const docSnapshot = await getDoc(adminDoc);
    
        if (docSnapshot.exists()) {
            return true; // The user is an admin
        } else {
            return false; // The user is not an admin
        }
    };


    //Functiont to sign in with google...
    const signUpWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const isAdmin = await checkIfAdmin(result.user.uid);

            if(isAdmin) {
                //navigate to dashboard
                navigate('/admin-dashboard')
                return;
            }
            else {
                //navigate to homescreen as normal user...
                navigate("/")
                return;
            }
        } 
        catch (error) {
            console.log("failed to login", error)
        }
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
       
        try {
            const userCredential = await signInWithEmailAndPassword(auth, formInput.email, formInput.password);
            const user = userCredential.user;
            if(user) {
                navigate("/")
            }
        } catch (error) {
            console.error("Error logging in:", error);
        }
              
    }


    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formInput.email, formInput.password);
            const user = userCredential.user;

            if(user) {
                setFormInput({email: "", password: ""});
                console.log("User signed up:", user);
                navigate("/")
            }


        } 
        catch (error) {
            console.error("Error signing up:", error);
        }
    }



    useEffect(() => {
        if(user) navigate("/")
    }, [user, navigate])

    return (
        <section className="login-page">
            <div className="login-overlay"></div>
            <form onSubmit={signUp ? handleSignUpSubmit : handleLoginSubmit}>


                    <h2 className="signIn-header">{signUp ? "Sign Up" : "Log In"}</h2>

                    <div className="email-login">
                            <label>
                                Email:
                                <input 
                                    type="text"
                                    name="email" 
                                    value={formInput.email}
                                    onChange={handleInput}
                                />
                            </label>
                            <label>
                                Password:
                                <input 
                                    type="password"
                                    name="password" 
                                    value={formInput.password}
                                    onChange={handleInput}
                                />
                            </label>


                    </div>

                    <button className="google-btn" onClick={signUpWithGoogle}>
                        <FcGoogle/>
                        Sign in with Google
                    </button>
            
                   
                    <button className="email-submit-btn">Submit</button>

                    <span className="login-page-link">
                        Don't have an Account? Click 
                        <Link to='/signUp'>Here</Link>
                    </span>
            
            </form>

            
        </section>
    )
}