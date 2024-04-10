//React...
import { useEffect } from "react"

//React-router...
import { useNavigate } from "react-router-dom"

//Firebase...
import {auth, provider} from "../config/firebase"
import {signInWithPopup} from "firebase/auth"
import { useAuthState } from "react-firebase-hooks/auth"

//React-icons...
import {FcGoogle} from "react-icons/fc"

//Styles...
import "../styles/Login.scss"


export default function Login() {

    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    //Functiont to sign in with google...
    const signUpWithGoogle = async () => {
        try {
            await signInWithPopup(auth, provider);
            //navigate("/")
        } catch (error) {
            console.log("failed to login")
        }
    }

    useEffect(() => {
        if(user) navigate("/")
    }, [user])

    return (
        <section className="login-page">
            <div className="login-overlay"></div>
            <article>
                <h2 className="singIn-title">Sign In</h2>
                <button onClick={signUpWithGoogle}>
                    <FcGoogle/>
                    Sign in with Google
                </button>
            </article>
        </section>
    )
}