  
import React, { useState } from 'react';
import { db } from "./firebase"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { StyleSheet } from 'react-native';
import { ThemeProvider, Button, Header } from 'react-native-elements'
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

// My components
import Register from "./screens/Register"
import Home from "./screens/Home"
import Event from "./screens/Event"
import Login from "./screens/Login"
import Account from "./screens/Account"
import AddEvent from "./screens/AddEvent"
import Events from "./screens/Events"
import Community from "./screens/Community"


const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const theme = {
  Button: {
    color: "red",
   
 },
}
// Adding Navbar to screen to navigate between screens.
 //Installed react navigation. Code got from react native documents//

 
function TabNavigation() {
  const size=24
  const color="white"

  return (
    <Tab.Navigator 
      initialRouteName="Home" 
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
      <Tab.Screen name="Home" component={Home} options={{
        tabBarIcon: () => <FontAwesome5 name="home" size={size} color={color} />
      }}/> 
      <Tab.Screen name="Events" component={Events} options={{
        tabBarIcon: () => <FontAwesome5 name="users" size={size} color={color} />
      }}/> 
      <Tab.Screen name="Community" component={Community} options={{
        tabBarIcon: () => <FontAwesome5 name="cog" size={size} color={color} />
      }}/>  
      <Tab.Screen name="Account" component={Account} options={{
        tabBarIcon: () => <FontAwesome5 name="users" size={size} color={color} />
      }}/> 
    </Tab.Navigator>
  )
}

export default function App() {
  const [text, setText] = useState('');

//Code off react naitve documentation
    const backgroundColor= "#2F0B29"
return (
    <ThemeProvider theme={theme}>
        <NavigationContainer> 
          <Stack.Navigator mode="modal">
            <Stack.Screen name="Login" options={{headerShown: false}} component={Login}/>
            <Stack.Screen name="Main" 
              options={{
                headerShown: true, 
                headerStyle: {
                  backgroundColor:"#2F0B29",
                  color: "white"
                }
              }} component={TabNavigation} />
            <Stack.Screen name="Add Event" component={AddEvent} />
            <Stack.Screen name="Event" component={Event} />
            <Stack.Screen name="Register" options={{headerShown: false}} component={Register}/>
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
