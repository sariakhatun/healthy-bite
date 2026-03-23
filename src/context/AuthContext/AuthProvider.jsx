import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';

let googleProvider = new GoogleAuthProvider()
const AuthProvider = ({children}) => {
    let [loading,setLoading]=useState(true)
    let [user,setUser]=useState(null)

    let createUser = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
        
    }

    let loginUser = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    let singInWithGoogle = () =>{
        setLoading(true)
        return signInWithPopup(auth,googleProvider)

    }

    let logOut= ()=>{
        setLoading(true)
        return signOut(auth)
    }

    useEffect(()=>{

        let unSubscribe = onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser);
            console.log("user from provider",currentUser)
            setLoading(false)
        })
        return ()=>{
            unSubscribe()
        }
    
    },[])

   let authInfo={
    createUser,
    loginUser,
    user,
    loading,
    singInWithGoogle,
    logOut,
    

    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;