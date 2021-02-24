import React, {useEffect, useState} from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import { Card, Text } from "react-native-elements"
import MyView from "../components/MyView"
import { getGym } from "../firebase/db"


function Events({navigation, gymId}) {
    const [gym, setGym] = useState([]) 
    const height = 200
    // https://reactnative.dev/docs/touchableopacity
    // https://reactnavigation.org/docs/params/

    useEffect(() => {
        getGym(gymId)
    }, [])

    return (
        <MyView>  
            <Text style={{color: "white", textAlign: "center", fontSize: 20}}>Gym Name</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Events", {type: "timetable"})}>
                <Card containerStyle={{backgroundColor: "#EE4036", height: height}}>
                    <Text style={styles.text}>Timetable-Book Your Slot!</Text>
                </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Events", {type: "classes"})}>
                <Card containerStyle={{backgroundColor: "#262261", height: height}}>     
                    <Text style={styles.text}>View Our Available Classes</Text>
                </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Event List", {type: "upcoming" })}>
                <Card containerStyle={{backgroundColor: "#FAAF40", height: height}}>
                    <Text style={styles.text}>See Some Of Our Upcoming Events</Text>
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



  