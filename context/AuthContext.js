'use client'
import { auth } from '@/firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useContext, useState, useEffect } from 'react';



const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userDataObj, setUserDataObj] = useState(null);
  const [loading, setLoading] = useState(true);

  // AUTH HANDLERS
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    setUserDataObj(null);
    setCurrentUser(null);
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      try {
        // Set user to local context state
        setLoading(true);

        setCurrentUser(user);
        if (!user) {
          console.log("No user found");
          return 
        }

        // If user exists fetch data from firestore db
        console.log("Fetching user data")
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        let firebaseData = {}

        if (docSnap.exists()) {
          console.log("Found user data")
          firebaseData = docSnap.data;
          console.log(firebaseData); // REMOVE LINE LATER REMOVE LINE LATER
        }

        setuserDataObj(firebaseData);

      } catch(error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
      return unsubscribe;
    })
    
  }, [])

  // Values that are passed through the AuthContext.Provider 
  // They end up being return when called the function useAuth
  // To return the values from the user authorization
  const value = {
    currentUser,
    userDataObj,
    setUserDataObj,
    signup,
    login,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}