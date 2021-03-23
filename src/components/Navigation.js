import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { FontAwesome5 } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons';

import { useAuth } from "components/AuthContext"

// Screen Components.
import Login from "screens/Login"
import Register from "screens/Register"
import RegisterGym from "screens/RegisterGym"
import OwnerHome from "screens/OwnerHome"
import Event from "screens/Event"
import Account from "screens/Account"
import AddEvent from "screens/AddEvent"
import EventList from "screens/EventList"
import Classes from "screens/Classes"
import Class from "screens/Class"
import AddClass from "screens/AddClass"
import UpdateGym from "screens/UpdateGym"
import ScheduledClass from "screens/ScheduledClass"
import GymList from "screens/GymList"
import AboutUs from "screens/AboutUs"
import UserHome from "screens/UserHome"
import MyBookings from "screens/MyBookings"

const Stack = createStackNavigator()
const Tab = createMaterialTopTabNavigator()

function TabNavigation() {
  const { userType, gymId } = useAuth()

  const iconSize=24
  const iconColor="white"

  return (
    <Tab.Navigator 
      tabBarPosition="bottom" 
      tabBarOptions={{
        showIcon: true,
        pressColor: "white",
        showLabel: false,
        style: { backgroundColor: "#2F0B29" },
        indicatorStyle: {
          backgroundColor: "orange",
        }
    }}>  
      {
        // Tab screens for only standard users.
        userType == "standard" && 
        <>
          <Tab.Screen name="UserHome" component={UserHome} options={{
            tabBarIcon: () => <FontAwesome5 name="home" size={iconSize} color={iconColor} />
          }}/>
        </>
      }
      {
        // Tab screens for only owners.
        userType == "owner" && 
        <>
          <Tab.Screen name="Home" component={OwnerHome} options={{
            tabBarIcon: () => <FontAwesome5 name="home" size={iconSize} color={iconColor} />
          }}/>
        </>
      }
      <Tab.Screen name="Classes" component={Classes} options={{
        tabBarIcon: () => <FontAwesome name="group" size={iconSize} color={iconColor} />
      }}/> 
      <Tab.Screen name="Event List" component={EventList} options={{
        tabBarIcon: () => <FontAwesome5 name="calendar-alt" size={iconSize} color={iconColor} />
      }}/> 
    </Tab.Navigator>
  )
}

// Screens for when user is not signed in. 
function Navigation() {
  const { isSignedIn, userType, gymName, gymId } = useAuth()

  return (
      <NavigationContainer>
          <Stack.Navigator mode="modal">
            {
              // Screens only for signed out users. 
              !isSignedIn &&
                <>
                  <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
                  <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
                  <Stack.Screen name="Register Gym" component={RegisterGym} options={{headerShown: false}}/>
                </>
            }
            {
              gymId==null && 
              <>
                <Stack.Screen name="GymList" component={GymList} options={{headerShown: false}}/>
              </>
            }
            {
              // Screens for all signed in users. 
              isSignedIn && 
              <>
                <Stack.Screen 
                  name={gymName} 
                  component={TabNavigation}
                  options={{
                    headerShown: true, 
                    headerStyle: {
                      backgroundColor:"#2F0B29"
                    }, 
                    headerTintColor: '#fff',
                  }}
                />
                <Stack.Screen name="Event" component={Event} />
                <Stack.Screen name="Class" component={Class} />
                <Stack.Screen name="Account" component={Account} />
              </>
            }
            {
              // Screens only for standard users. 
              userType === "standard" &&
              <>
                <Stack.Screen name="About Us" component={AboutUs} />
                <Stack.Screen name="My Bookings" component={MyBookings} />              
              </>
            }
            {
              // Screens only for owners. 
              userType === "owner" && 
              <>
                <Stack.Screen name="Add Event" component={AddEvent} />
                <Stack.Screen name="Add Class" component={AddClass} />
                <Stack.Screen name="Update Gym" component={UpdateGym} />
                <Stack.Screen name="Scheduled Class" component={ScheduledClass} />
              </>
            }
          </Stack.Navigator>
      </NavigationContainer>     
  )
}

export default Navigation
