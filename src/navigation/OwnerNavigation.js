import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { Text } from "react-native-elements"
import { createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs"
import { FontAwesome5 } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'; 
import { auth } from "../firebase"

// My components.
import Event from "screens/Event"
import Account from "screens/Account"
import AddEvent from "screens/AddEvent"
import Events from "screens/Events"
import EventList from "screens/EventList"
import UpdateGym from "screens/UpdateGym"
import OwnerHome from "screens/OwnerHome"
import Classes from "screens/Classes"
import AddClass from "screens/AddClass"
import Class from "screens/Class"

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function TabNavigation() {
  const iconSize=24
  const iconColor="white"

  return (
    <Tab.Navigator 
      initialRouteName="Add Event" 
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
      <Tab.Screen name="Home" component={OwnerHome} options={{
        tabBarIcon: () => <FontAwesome5 name="home" size={iconSize} color={iconColor} />
      }}/> 
      <Tab.Screen name="Classes" component={Classes} options={{
        tabBarIcon: () => <FontAwesome name="group" size={iconSize} color={iconColor} />
      }}/>  
      <Tab.Screen name="Event List" component={EventList} options={{
        tabBarIcon: () => <FontAwesome5 name="list" size={iconSize} color={iconColor} />
      }}/>  
      <Tab.Screen name="Account" component={Account} options={{
        tabBarIcon: () => <FontAwesome5 name="user-alt" size={iconSize} color={iconColor} />
      }}/> 
    </Tab.Navigator>
  )
}

// Screens for when user is not signed in. 
function OwnerNavigation() {
    return ( 
        <Stack.Navigator mode="modal" initialRouteName="Tab">
            <Stack.Screen 
              name="Gym Name" 
              options={{
                headerShown: true, 
                headerStyle: {
                  backgroundColor:"#2F0B29"
                }, 
                headerTintColor: '#fff',
            }} component={TabNavigation} />
            <Stack.Screen name="Add Event" component={AddEvent} />
            <Stack.Screen name="Event" component={Event} />
            <Stack.Screen name="Update Gym" component={UpdateGym} />
            <Stack.Screen name="Add Class" component={AddClass} />
            <Stack.Screen name="Class" component={Class} />
        </Stack.Navigator>
    )
} 

export default OwnerNavigation