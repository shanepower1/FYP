import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import Login from "screens/Login"
import Register from "screens/Register"
import RegisterGym from "screens/RegisterGym"

const Stack = createStackNavigator();

// Screens for when user is not signed in. 
//These are the screens that will be viible when no user is signed in.
function NoAuthNavigation() {
    return (
        <Stack.Navigator mode="modal" initialRouteName="Login">
          <Stack.Screen name="Login" options={{headerShown: false}} component={Login}/>
          <Stack.Screen name="Register" options={{headerShown: false}} component={Register}/>
          <Stack.Screen name="Register Gym" options={{headerShown: false}} component={RegisterGym}/>
        </Stack.Navigator>
    )
}

export default NoAuthNavigation