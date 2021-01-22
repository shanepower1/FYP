import React from "react"
import { ScrollView } from "react-native"
import { Card, Text } from "react-native-elements"
import MyView from "../components/MyView"

function Home() {
    return (
        <MyView>        
           <Card containerStyle={{backgroundColor: "red", color: "white", height: 150}}>Upcoming Events</Card>
           <Card containerStyle={{backgroundColor: "red", color: "white", height: 150}}>Other Stuff</Card>
           <Card containerStyle={{backgroundColor: "red", color: "white", height: 150}}>Other Stuff</Card>
        </MyView>

    )
}
  

export default Home