import React, {useEffect, useState} from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import { Card, Text } from "react-native-elements"
import MyView from "components/MyView"
import { auth } from "../firebase"
import { getGym } from "functions/database"
import { useNavigation } from '@react-navigation/native'
import { useAuth } from "components/AuthContext"

function UserHome() {
    const navigation = useNavigation() // Only screen components receive navigation as a prop. 
    
    const height = 200

    const { gymId, gymName, setGymId, setGymName} = useAuth()
    // https://reactnative.dev/docs/touchableopacity
    // https://reactnavigation.org/docs/params/

    useEffect(() => {
        getData()
    }, [])

    function getData() {
        getGym(gymId)
            .then(gym => {
                setGymId(gym.id)
                setGymName(gym.name)
            })

    }

    return (
        <MyView>  
            <TouchableOpacity onPress={() => navigation.navigate("About Us")}>
                <Card containerStyle={{padding: 0}} >
                    <Card.Image source={require("assets/gymconnect.png")}>
                        <Text style={styles.text}>About Us</Text>
                    </Card.Image>
                </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Classes", {gymId: gymId, type: "classes"})}>
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
        color: "white",
        textAlign: "center",
    }
});


export default UserHome




  