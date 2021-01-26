import React, { useState } from "react"
import { TextInput, View, Button, StyleSheet, Text } from "react-native"
import { db } from "../firebase"
import { Card, Input,  } from "react-native-elements"
import DateTimePicker from '@react-native-community/datetimepicker'

const styles = StyleSheet.create({

})

//Whatever text is entered to the input box will be set the the database attributes

function AddEvent({navigation}) {
    const [eventName, setEventName] = useState("")
    const [eventLocation, setEventLocation] = useState("")
    const [eventDate, setEventDate] = useState(new Date())
    
//Adding event to firebase
    function addEvent() {
        db.collection("events").doc()
            .set({
                eventName: eventName,
                eventLocation: eventLocation,
                eventDate: eventDate
            }).then(() => {
                navigation.navigate("Events")
            }).catch(error => {
                alert(error.message)
            }) 
    }
        
    const onChange = (event, selectedDate) => {
        setEventDate(selectedDate)
    }

    return (
        <Card>
            <Input style={styles.textInput} onChangeText={text => setEventName(text)} value={eventName}/>
            <Input style={styles.textInput} onChangeText={text => setEventLocation(text)} value={eventLocation}/>
            <DateTimePicker
                value={eventDate}
                mode={"date"}
                display="default"
                onChange={onChange}
            />
            <Button onPress={addEvent} title="Add Event"  />   
        </Card>  
    )
}  

export default AddEvent