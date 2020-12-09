  
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { db } from "./firebase"
import AddEvent from "./components/AddEvent"
import Events from "./components/Events"
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack"
import { StyleSheet } from 'react-native';
import { ThemeProvider, Button, Header } from 'react-native-elements'
import Register from "./components/Register"
import About from "./components/About"
import Event from "./components/Event"

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const theme = {
  Button: {
    color: "red",
   
 },
}

function TabNavigation() {
  return (
    <Tab.Navigator initialRouteName="Events">    
      <Tab.Screen name="About" component={About} />
      <Tab.Screen name="Register" component={Register} />
      <Tab.Screen name="Events" component={Events}/>   
    </Tab.Navigator>
  )
}

export default function App() {
  const [text, setText] = useState('');

// Adding Navbar to screen to navigate between screens.
 //Installed react navigation. Code got from react native documents//
  
return (
    <ThemeProvider theme={theme}>
        <NavigationContainer> 
          <Stack.Navigator mode="modal">
            <Stack.Screen name="Main" options={{headerShown: false}} component={TabNavigation} />
            <Stack.Screen name="Add Event" component={AddEvent} />
            <Stack.Screen name="Event" component={Event} />
          </Stack.Navigator>
        </NavigationContainer> 
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
