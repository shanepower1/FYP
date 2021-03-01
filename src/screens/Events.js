import React, {useEffect, useState} from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import { Card, Text } from "react-native-elements"
import MyView from "components/MyView"
import { auth } from "../firebase"
import { getGym } from "functions/database"
import { useNavigation } from '@react-navigation/native'

function Events() {
    const navigation = useNavigation() // Only screen components receive navigation as a prop. 
    
    const [gymId, setGymId] = useState("")
    const [gymName, setGymName] = useState("")
    const height = 200
    // https://reactnative.dev/docs/touchableopacity
    // https://reactnavigation.org/docs/params/

    useEffect(() => {
        if(auth.currentUser.type == "owner") {
            getGym(auth.currentUser.uid)
                .then(gym => {
                    setGymId(gym.id)
                    setGymName(gym.name)
                })

        } else if(auth.currentUser.uid != null) {
            getGym(auth.currentUser.gymId)
                .then(gym => {
                    setGymId(gym.id)
                    setGymName(gym.name)
                })
        }   
    }, [])

    return (
        <MyView>  
            <Text style={{color: "white", textAlign: "center", fontSize: 25, marginTop: 10}}>{gymName}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Event List", {gymId: gymId, type: "timetable"})}>
                <Card containerStyle={{backgroundColor: "#EE4036", height: height}}>
                    <Text style={styles.text}>Timetable-Book Your Slot!</Text>
                </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Event List", {gymId: gymId, type: "classes"})}>
                <Card containerStyle={{backgroundColor: "#262261", height: height}}>     
                    <Text style={styles.text}>View Our Available Classes</Text>
                </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Event List", {gymId: gymId, type: "upcoming" })}>
                <Card containerStyle={{backgroundColor: "#FAAF40", height: height}}>
                    <Text style={styles.text}>See Some Of Our Upcoming Events</Text>
                </Card>
            </TouchableOpacity> 
        </MyView>
    )
}

const styles = StyleSheet.create({
    text: {
        color: "white"
    }
});


export default Events




  