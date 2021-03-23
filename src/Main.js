  
import React from 'react'
import { LogBox } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { ThemeProvider } from 'react-native-elements'
import { Text } from "react-native"
import AuthProvider from "components/AuthContext"
import Navigation from "components/Navigation"

const theme = {
  colors: {
    primary: "#47113e",
    secondary: "orange"
  },
  Button: {
    color: "red",  
 },
}

export default function Main() {
  //https://stackoverflow.com/questions/35309385/how-do-you-hide-the-warnings-in-react-native-ios-simulator
  LogBox.ignoreLogs(['Setting a timer', 'Non-serializable values'])  // Warning suppression. 

  return (
    //https://reactnavigation.org/docs/stack-navigator/
    // Navigation added to manage the transition between multiple screens with each screen being placed on top of eachother on the stack.
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Navigation /> 
      </AuthProvider>  
      <StatusBar style="light" translucent={false}/>
    </ThemeProvider>
  )
}


