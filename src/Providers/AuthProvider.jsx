import { createContext, useEffect, useState } from "react";
import { auth } from './../Firebase/firebase.config';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
 
 

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();



    const googleSignin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }



    const createUser = (email, pass) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth ,email, pass);
    }

    const signUser = (email, pass) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, pass);
    }


    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
        //   setLoading(true)
           
            console.log("current user: ", currentUser);
            
            if(currentUser){
                // get token and store client
                const userInfo = {email: currentUser?.email};

                axiosPublic.post('/jwt', userInfo)
                .then(res => {

                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token);
                        console.log(res.data.token)
                        setUser(currentUser);
                        setLoading(false);
                    }
                })
            }else{
                // todo:  remove token(if stored)
                localStorage.removeItem('access-token');
            
                setUser(currentUser);
                setLoading(false);
            }
           
        });

        return () => {
            return unsubscribe();
        }

    }, [axiosPublic])

    const authInfo = {
        user,
        loading,
        createUser,
        signUser,
        logOut,
        updateUserProfile ,
        googleSignin
    }
    
    return (
        <AuthContext.Provider value={authInfo} >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;