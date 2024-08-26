//React...
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

//Firebase...
import { doc, getDoc } from "firebase/firestore";
import { auth, database } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";


export default function PrivateRoute({ children }) {
    const [user] = useAuthState(auth);
    const [isAdmin, setIsAdmin] = useState(null); // Initially set to null to indicate loading

    useEffect(() => {
        const checkAdmin = async () => {
            if (user) {
                const adminDoc = doc(database, "admins", user.uid);
                const docSnapshot = await getDoc(adminDoc);
                setIsAdmin(docSnapshot.exists());
            } else {
                setIsAdmin(false);
            }
        };

        checkAdmin();
    }, [user]);

    if (isAdmin === null) {
        return <div>Loading...</div>; // Show a loading state while checking
    }

    return isAdmin ? children : <Navigate to="/" />;
}
