import React, { useState } from "react"
import { TextInput, View, Button, StyleSheet, Text } from "react-native"
import { db } from "../firebase"
import { Card, Input,  } from "react-native-elements"

const styles = StyleSheet.create({

})

//Whatever text is entered to the input box will be set the the database attributes

function AddEvent() {
    const [eventName, setEventName] = useState("")
    const [eventLocation, setEventLocation] = useState("")
    const [eventDate, setEventDate] = useState ("")
    
//Adding event to firebase

    function addEvent() {
        db.collection("events").doc()
            .set({
                eventName: eventName,
                eventLocation: eventLocation,
                eventDate: eventDate
            }).then(() => {
                alert("Success")
            }).catch(error => {
                alert(error.message)
            })
    }
        
    return (

        <Card>
            <Input style={styles.textInput} onChangeText={text => setEventName(text)} value={eventName}/>
            <Input style={styles.textInput} onChangeText={text => setEventLocation(text)} value={eventLocation}/>
            <Input style={styles.textInput} onChangeText={text => setEventDate(text)} value={eventDate}/>

            <Button onPress={addEvent} title="Add Event"  />   
            </Card>  
    )
}  

export default AddEvent