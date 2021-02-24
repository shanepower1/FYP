  
import React, { useState, useEffect } from 'react';
import { db, auth } from "./firebase"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { StyleSheet, LogBox } from 'react-native';
import { ThemeProvider, Text } from 'react-native-elements'

import { StatusBar } from 'expo-status-bar';

// My components
import UserNavigation from "./navigation/UserNavigation"
import OwnerNavigation from "./navigation/OwnerNavigation"
import NoAuthNavigation from './navigation/NoAuthNavigation';

//https://reactnative.dev/docs/navigation#react-navigation
//Creating stack and tab navigation
const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const theme = {
  Button: {
    color: "red",  
 },
}

export default function App() {
  // Warning suppression. 
  LogBox.ignoreLogs(['Each child in a list', 'Setting a timer'])

  const [userType, setUserType] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      // If a user is signed in check the DB for their type. Else set userType to null.
      if(user != null) {
        db.collection("users").doc(user.uid).get() 
          .then(doc => {
            setUserType(doc.data().type)
            auth.currentUser.type = doc.data().type
            auth.currentUser.gymId = doc.data().gymId
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
        {
          // If user is null show login & registration.
          // If userType is owner or user show relevant components.

          userType==null ? <NoAuthNavigation /> : userType == "owner" ? <OwnerNavigation /> : <UserNavigation/>
        }
      </NavigationContainer>  
      <StatusBar style="light" translucent={false}/>
    </ThemeProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    maxWidth: "100px",
    backgroundColor: "black"
  },
  text: {
    fontSize: 10,
    color: "white",
    backgroundColor: "grey",
    margin: 20,
    padding: 5
  },
  button: {
    color:"grey"
  }
});
