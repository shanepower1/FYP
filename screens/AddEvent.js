import React, { useState } from "react"
import { TextInput, View, Button, StyleSheet, Text } from "react-native"
import { db } from "../firebase"
import { Card, Input } from "react-native-elements"
import DateTimePicker from '@react-native-community/datetimepicker'

const styles = StyleSheet.create({

})

function AddGym({navigation}) {
    // https://reactjs.org/docs/hooks-state.html
    // React keeps track of these variables. If they are changed, any part of the UI uses these values will also be updated without having to refresh the page. 
    // "set" function is used to update the state in the future when changed.
    // https://www.youtube.com/watch?v=1FiIYaRr148 . I found this youtube video explained the concept very well.
    
    const [gymName, setGymName] = useState("")
    const [gymLocation, setGymLocation] = useState("")
    const [gymEmail, setGymEmail] = useState("")
    const [gymSignUpDate, setGymSignUpDate] = useState(new Date())
    
    // https://firebase.google.com/docs/firestore/manage-data/add-data#web
    // Adds a new event document to the Events collection in Firestore. 
    // 
    function AddGym() {
        db.collection("events").doc()
            .set({
                gymName: gymName,
                gymLocation: gymLocation.trim(),// trim removes whitespace before and after
                gymEmail: gymEmail,
                gymSignUpDate:GymSignUpDate
            }).then(() => {
                navigation.navigate("Events")
            }).catch(error => {
                alert(error.message)
            }) 
    }
    
    //Code got from react native documentation https://reactnativeelements.com/docs/input
    //Inputs allow the user to enter text into the UI.
    //The "set" function used below allows the text entered into the input in the UI by the user to be set to the 
    //value of the eventName and eventLocation variables.
    return (
        <Card>
            <Input style={styles.textInput} onChangeText={text => setGymName(text)} value={gymName}/> 
            <Input style={styles.textInput} onChangeText={text => setGymLocation(text)} value={gymLocation}/>
            <Input style={styles.textInput} onChangeText={text => setGymEmail(text)} value={gymEmail}/>

            {/* https://github.com/react-native-datetimepicker/datetimepicker */}
            {/*Allows the admin to choose a date and time for each event, N.B - this is not compatible with web*/}
            <DateTimePicker
                value={eventDate}
                mode={"datetime"}
                display="default"
                onChange={(Gym, date) => setGymSignUpDate(date)}
            />

            <Button onPress={AddGym} title="Add Your Gym"  />   
        </Card>  
    )
}  

export default AddGym