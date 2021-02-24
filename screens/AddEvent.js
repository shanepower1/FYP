import React, { useState } from "react"
import { TextInput, View, Button, StyleSheet, Text } from "react-native"
import { db } from "../firebase"
import { Card, Input } from "react-native-elements"
import DateTimePicker from '@react-native-community/datetimepicker'
import MyView from "../components/MyView"

const styles = StyleSheet.create({

})

function AddEvent({navigation}) {
    // https://reactjs.org/docs/hooks-state.html
    // React keeps track of these variables. If they are changed, any part of the UI uses these values will also be updated without having to refresh the page. 
    // "set" function is used to update the state in the future when changed.
    // https://www.youtube.com/watch?v=1FiIYaRr148 . I found this youtube video explained the concept very well.
    
    const [eventName, setEventName] = useState("")
    const [eventLocation, setEventLocation] = useState("")
    const [eventDate, setEventDate] = useState(new Date())
    const [eventInfo, setEventInfo] = useState("")

    // https://firebase.google.com/docs/firestore/manage-data/add-data#web
    // Adds a new event document to the Events collection in Firestore. 
    // Adding the below attributes to the event document in the db with the assinged value entered in the UI in the relevant fields.
    function addEvent() {
        db.collection("events").doc() //*Left empty so firebase generates a random id  
            .set({
                eventName: eventName,
                eventLocation: eventLocation.trim(),// trim removes whitespace before and after
                eventDate: eventDate,
                eventInfo: eventInfo
            }).then(() => {
                navigation.navigate("Events") 
            }).catch(error => {
                alert(error.message)
            }) 
    }
    
    //Code got from react native documentation https://reactnativeelements.com/docs/input
    //Inputs allow the user to enter text into the UI.
    //The "set" function used below allows the text entered into the input in the UI by the user to be set to the 
    //value of the eventName, eventLocation and event info variables.
    return (
        <MyView>
            <Card>
                <Input style={styles.textInput} onChangeText={text => setEventName(text)} value={eventName}/> 
                <Input style={styles.textInput} onChangeText={text => setEventLocation(text)} value={eventLocation}/>
                <Input style={styles.textInput} onChangeText={text => setEventInfo(text)} value={eventInfo}/>

                {/* https://github.com/react-native-datetimepicker/datetimepicker */}
                {/*Allows the admin to choose a date and time for each event, N.B - this is not compatible with web*/}
                <DateTimePicker
                    value={eventDate}
                    mode={"datetime"}
                    display="default"
                    onChange={(event, date) => setEventDate(date)}
                />

                <Button onPress={addEvent} title="Add Event"  />   
            </Card>  
        </MyView>   
    )
}  

export default AddEvent