import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
// import { GoogleAuthProvider } from "firebase/auth";
import { onAuthStateChanged, updateProfile } from "firebase/auth";

const AuthContext = React.createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  async function initializeUser(user) {
    if (user) {
      setCurrentUser({ ...user });

      const isEmail = user.providerData.some(
        (provider) => provider.providerId === "password"
      );

      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }

    setLoading(false);
  }

  const updateUserProfile = async (displayName) => {
    try {
      await updateProfile(auth.currentUser, { displayName });
      setCurrentUser((prevUser) => ({
        ...prevUser,
        displayName,
      }));
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const value = {
    userLoggedIn,
    currentUser,
    setCurrentUser,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
