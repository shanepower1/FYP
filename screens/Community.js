import React from "react"
import { Card, Text } from "react-native-elements"
import {StyleSheet} from "react-native"
import MyView from "../components/MyView"



function Community() {
    return (
//Admin here will be able to view bookings of particular classes, time slots for the gym. 
//The user will also be able to track the classes or times they have booked.
//I will also include an 'About Us' section which will include informatio regarding the particular gym and app.
        <MyView>
           <Card containerStyle={{backgroundColor: "#EE4036", color: "white", height: 150}}>
               <Text style={styles.text}>Manage Bookings</Text>
            </Card>
           <Card containerStyle={{backgroundColor: "", color: "black", height: 150}}>
               <Text style={styles.text}>About Us</Text>       
            </Card>                   
        </MyView>
    
    )
}
  

export default Community
const styles = StyleSheet.create({
    text:{
        color:"black"
    }
});