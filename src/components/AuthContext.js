import React, { useState, useEffect, useContext} from "react"
import { getUser, getGym } from "functions/database"
import { Text } from "react-native"
import { auth } from "src/firebase.js"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export default function AuthProvider({ children }) {
    const [isSignedIn, setIsSignedIn] = useState(false)
    const [userId, setUserId] = useState(null)
    const [gymId, setGymId] = useState(null)
    const [userName, setUserName] = useState("")
    const [userType, setUserType] = useState("")
    const [gymName, setGymName] = useState("Pick a Gym")

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user) {
                loadData(user.uid)
            } else {
                setIsSignedIn(false)
                setUserName("")
                setUserType("")
                setUserId(null)
                setGymName("Pick a Gym")
            }
        })
  
      return unsubscribe
    }, [])

    async function loadData(userId) {
        try {
            var userInfo = await getUser(userId)
            
            if(userInfo.gymId != null){
                let gymInfo = await getGym(userInfo.gymId)
                setGymName(gymInfo.name)
                setGymId(gymInfo.id)
            }

            setUserName(userInfo.name)
            setUserType(userInfo.type)
            setUserId(userInfo.id)
            setIsSignedIn(true)

        } catch(error) {
            alert(error.message)
        }
    }
  
    const value = {
        isSignedIn,
        userName,
        userType,
        userId,
        gymName,
        setGymName,
        gymId,
        setGymId,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
