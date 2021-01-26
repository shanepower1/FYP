import React from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import { Card, Text } from "react-native-elements"
import MyView from "../components/MyView"

function Events({navigation}) {
    //List Item used to display rows of Information , code got off of react native documentation https://reactnativeelements.com/docs/listitem
    const height = 100
    return (
        <MyView>  
            <TouchableOpacity onPress={() => navigation.navigate("Event List", {
                type: "upcoming"
            })}>
                <Card containerStyle={{backgroundColor: "#EE4036", height: height}}>
                    <Text style={styles.text}>Upcoming Events</Text>
                </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Event List", {
                type: "previous"
            })}>
                <Card containerStyle={{backgroundColor: "#262261", height: height}}>     
                    <Text style={styles.text}>Previous Events</Text>
                </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Event List", {
                type: "live" 
            })}>
                <Card containerStyle={{backgroundColor: "#FAAF40", height: height}}>
                    <Text style={styles.text}>Live on the App</Text>
                </Card>
            </TouchableOpacity>
        </MyView>
    )
}

export default Events

const styles = StyleSheet.create({
    text: {
        color: "white"
    }
});



  