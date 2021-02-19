  
import React, { useState } from 'react';
import { db, auth } from "./firebase"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { StyleSheet, LogBox } from 'react-native';
import { ThemeProvider } from 'react-native-elements'
import { FontAwesome5 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

// My components
import Register from "./screens/Register"
import Event from "./screens/Event"
import Login from "./screens/Login"
import Account from "./screens/Account"
import AddEvent from "./screens/AddEvent"
import Events from "./screens/Events"
import EventList from "./screens/EventList"
import RegisterGym from "./screens/RegisterGym"
import GymList from "./screens/GymList"
import { AuthProvider } from "contexts/AuthContext"

//https://reactnative.dev/docs/navigation#react-navigation
//Creating stack and tab navigation
const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const theme = {
  Button: {
    color: "red",  
 },
}

function TabNavigation() {
  const size=24
  const color="white"
//Adding bottom Navbar to navigate between screens assigned to the Navbar
//https://reactnavigation.org/docs/tab-based-navigation/
  return (
    <Tab.Navigator 
      initialRouteName="Events" 
      shifting={true} 
      tabBarPosition="bottom" 
      tabBarOptions={{
        showIcon: true,
        pressColor: "white",
        showLabel: false,
        style: {backgroundColor: "#2F0B29"},
        indicatorStyle: {
          backgroundColor: "orange",
        }
    }}>  
       {/*https://reactnavigation.org/docs/tab-based-navigation*/}
       {/*Adding icons to the tab navigator*/}
      
      <Tab.Screen name="Events" component={Events} options={{
        tabBarIcon: () => <FontAwesome5 name="home" size={size} color={color} />
      }}/> 
      <Tab.Screen name="Account" component={Account} options={{
        tabBarIcon: () => <FontAwesome5 name="power-off" size={size} color={color} />
      }}/> 
    </Tab.Navigator>
  )
}

export default function App() {
  const [text, setText] = useState('');
  LogBox.ignoreLogs(['Each child in a list'])


  const backgroundColor= "#2F0B29"

  // get user type

  return (
    //https://reactnavigation.org/docs/stack-navigator/
    // Navigation added to manage the transition between multiple screens with each screen being placed on top of eachother on the stack.
    <AuthProvider>
      <ThemeProvider theme={theme}>
          <NavigationContainer> 
            <Stack.Navigator mode="modal" initialRouteName="Login">
              <Stack.Screen name="Gym List" options={{headerShown: false}} component={GymList}/>
              <Stack.Screen name="Register Gym" component={RegisterGym} />
              <Stack.Screen name="Login" options={{headerShown: false}} component={Login}/>
              <Stack.Screen name="Main" 
                options={{
                  headerShown: true, 
                  headerStyle: {
                    backgroundColor:"#2F0B29"
                  }, 
                  headerTintColor: '#fff',
                }} component={TabNavigation} />
              <Stack.Screen name="Add Event" component={AddEvent} />
              <Stack.Screen name="Event" component={Event} />
              <Stack.Screen name="Event List" component={EventList} />
              <Stack.Screen name="Register" options={{headerShown: false}} component={Register}/>
            </Stack.Navigator>
          </NavigationContainer> 
          <StatusBar style="light" />
      </ThemeProvider>
    </AuthProvider> 
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
