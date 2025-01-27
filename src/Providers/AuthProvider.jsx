import { createContext, useEffect, useState } from "react";
import { auth } from "./../Firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const axiosPublic = useAxiosPublic();

  const googleSignin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const createUser = (email, pass) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, pass);
  };

  const signUser = (email, pass) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, pass);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const deleteUserAccount = () => {
    setLoading(true);
    return deleteUser(auth.currentUser);
  }

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const userSettoDb = async(userInfo) => {
    const userData = {
      name: userInfo?.displayName,
      email: userInfo?.email,
      role: "user",
      badge: 'bronze',
    };
    
    await axiosPublic.post('/user', userData);
  }
 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async(currentUser) => {
      if (currentUser) {
        const userInfo = { email: currentUser?.email };
        try {
            const res = await axiosPublic.post("/jwt", userInfo) 
            if (res.data.token) {
              localStorage.setItem("access-token", res.data.token);
              
               
              setUser(currentUser);
              setLoading(false);
            }
          
        } catch (err) {
        console.log
        }
      } else {
        localStorage.removeItem("access-token");
        setUser(currentUser);
        setLoading(false);
      }
    });
    return () => {
      return unsubscribe();
    };
  }, [axiosPublic]);

  const authInfo = {
    user,
    loading,
    createUser,
    signUser,
    logOut,
    updateUserProfile,
    googleSignin,
    filteredPosts, 
    setFilteredPosts,
    deleteUserAccount,
    userSettoDb
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
