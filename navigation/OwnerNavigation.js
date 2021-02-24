import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs"
import { FontAwesome5 } from '@expo/vector-icons'

// My components.
import Event from "../screens/Event"
import Account from "../screens/Account"
import AddEvent from "../screens/AddEvent"
import Events from "../screens/Events"
import EventList from "../screens/EventList"
import RegisterGym from "../screens/RegisterGym"
import GymList from "../screens/GymList"
import UpdateGym from '../screens/UpdateGym'

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function TabNavigation() {
  const size=24
  const color="white"

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
      <Tab.Screen name="Events" component={Events} options={{
        tabBarIcon: () => <FontAwesome5 name="home" size={size} color={color} />
      }}/>
      <Tab.Screen name="Add Event" component={AddEvent} options={{
        tabBarIcon: () => <FontAwesome5 name="power-off" size={size} color={color} />
      }}/>  
      <Tab.Screen name="Account" component={Account} options={{
        tabBarIcon: () => <FontAwesome5 name="power-off" size={size} color={color} />
      }}/> 
    </Tab.Navigator>
  )
}

// Screens for when user is not signed in. 
function OwnerNavigation() {
    return ( 
        <Stack.Navigator mode="modal" initialRouteName="Main">
            <Stack.Screen 
              name="Main" 
              options={{
                headerShown: false, 
                headerStyle: {
                  backgroundColor:"#2F0B29"
                }, 
                headerTintColor: '#fff',
            }} component={TabNavigation} />
            <Stack.Screen name="Event" component={Event} />
            <Stack.Screen name="Event List" component={EventList} />
            <Stack.Screen name="Update Gym" component={UpdateGym} />
        </Stack.Navigator>
    )
}

export default OwnerNavigation