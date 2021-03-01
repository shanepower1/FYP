import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs"
import { FontAwesome5 } from '@expo/vector-icons'

// My components.
import Event from "screens/Event"
import Account from "screens/Account"
import AddEvent from "screens/AddEvent"
import EventList from "screens/EventList"
import UserHome from "screens/UserHome"
import Events from "screens/Events"

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function TabNavigation() {
  const iconSize=24
  const iconColor="white"

  return (
    <Tab.Navigator 
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

      <Tab.Screen name="Home" component={UserHome} options={{
        tabBarIcon: () => <FontAwesome5 name="home" size={iconSize} color={iconColor} />
      }}/> 
      <Tab.Screen name="Account" component={Account} options={{
        tabBarIcon: () => <FontAwesome5 name="user-alt" size={iconSize} color={iconColor} />
      }}/> 
    </Tab.Navigator>
  )
}

// Screens for when user is not signed in. 
function UserNavigation() {
    return (
        <Stack.Navigator mode="modal" initialRouteName="Tab">
            <Stack.Screen 
              name="Tab" 
              options={{
                headerShown: false, 
                headerStyle: {
                  backgroundColor:"#2F0B29"
                }, 
                headerTintColor: '#fff',
              }} component={TabNavigation} 
            />         
            <Stack.Screen name="Add Event" component={AddEvent} />
            <Stack.Screen name="Event" component={Event} />
            <Stack.Screen name="Event List" component={EventList} />
        </Stack.Navigator>
    )
}

export default UserNavigation
