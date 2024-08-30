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
    const [loading, setLoading] = useState(false);


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
        
        if(!formInput.email || !formInput.password) {
            setEmailError("Email or Password is empty...")
            return;
        }

        setLoading(true);
       
        try {
            await signInWithEmailAndPassword(auth, formInput.email, formInput.password);
            setFormInput({email: "", password: ""});
            navigate("/")
        } 
        catch (error) {
            if(error.code === 'auth/wrong-password') {
                setEmailError("Wrong password....");
                return;
            }
            else if(error.code === 'auth/user-not-found') {
                setEmailError("User does not exists...");
                return;
            }
            else {
                console.error("Error logging in:", error);
            }
        }
        finally {
            setLoading(false);
        }
              
    }

    const [emailError, setEmailError] = useState("")

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();

        if(!formInput.email || !formInput.password) {
            setEmailError("Email or Password is empty...")
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, formInput.email, formInput.password)
            setFormInput({email: "", password: ""});
            navigate("/")
        } 
        catch (error) {
            if(error.code === 'auth/email-already-in-use') {
                setEmailError("email already exists...")
                return;
            }
            else {
                console.error("Error signing up:", error)
            }
        }
    }

    const handleSignUpLoginPageSwap = () => {
        setEmailError("");
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
                                <span>
                                    Email: 
                                    <span className="error-output">{emailError && emailError}</span>
                                </span>
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
                    <button type="button" className="google-btn" onClick={signUpWithGoogle}>
                        <FcGoogle/>
                        Sign {signUp ? "up" : "in"} with Google
                    </button>  
                    <button 
                        className="email-submit-btn"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Continue"}
                    </button>
                    <span className="login-page-link">
                        {!signUp && 
                            <>
                                Don't have an Account? Click 
                                <Link onClick={handleSignUpLoginPageSwap} to='/signUp'>Here</Link>
                            </>
                        }
                        {signUp && 
                            <>
                                Already have an Account? Click 
                                <Link onClick={handleSignUpLoginPageSwap} to='/login'>Here</Link>
                            </>
                        }
                    </span>
            </form>
        </section>
    )
}