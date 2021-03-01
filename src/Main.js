  
import React, { useState, useEffect } from 'react'
import { LogBox } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { ThemeProvider, Text } from 'react-native-elements'
import { auth } from "./firebase.js"
import { NavigationContainer } from '@react-navigation/native'

// My components
import UserNavigation from "navigation/UserNavigation"
import OwnerNavigation from "navigation/OwnerNavigation" 
import NoAuthNavigation from 'navigation/NoAuthNavigation' 

// Functions
import { getUser } from "functions/database"

const theme = {
  Button: {
    color: "red",  
 },
}

export default function Main() {
  // Warning suppression. 
  LogBox.ignoreLogs(['Each child in a list', 'Setting a timer'])

  const [userType, setUserType] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      // If a user is signed in check the DB for their type. Else set userType to null.
      if(currentUser !== null) {
        getUser(currentUser.uid).then(user => {    
          setUserType(user.type)
          auth.currentUser.type = user.type
          auth.currentUser.gymId = user.gymId
        })  
      } else {
        setUserType(null)
      }
    })

    return unsubscribe
  }, []) 
  
  return (
    //https://reactnavigation.org/docs/stack-navigator/
    // Navigation added to manage the transition between multiple screens with each screen being placed on top of eachother on the stack.
    <ThemeProvider theme={theme}>
      <NavigationContainer> 
        {/* 
            Inline conditional rendering https://reactjs.org/docs/conditional-rendering.html
            userType == null -> load <NoAuthNavigation />
            userType == standard -> load <UserNavigation />
            userType == owner -> load <OwnerNavigation />
        */}
        {userType==null ? <NoAuthNavigation /> : userType=="standard" ? <UserNavigation /> : userType=="owner" ? <OwnerNavigation /> : <Text>User Type Error</Text>}
      </NavigationContainer>  
      <StatusBar style="light" translucent={false}/>
    </ThemeProvider>
  )
}


