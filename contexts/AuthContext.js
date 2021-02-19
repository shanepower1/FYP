import React, { useContext, useEffect, useState } from "react"
import { View } from "react-native"
import { Text } from "react-native-elements"
import { auth } from "api/firebase"
import Signin from "screens/Signin"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [userType, setUserType] = useState("")
  const [loading, setLoading] = useState(true)

  function signUp(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function signIn(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function signOut() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  if (loading) {
    return <Text h1 style={{color: "black"}}>Loading.......</Text>
  }

  const value = {
    currentUser,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateEmail,
    updatePassword,
  }

  if (!currentUser) {
    return <Signin />
  } else {
    return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    )
  }
}
