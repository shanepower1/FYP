import React, { useState } from "react"
import { Button } from "react-native"
import { Card, Input } from "react-native-elements"
import MyView from "components/MyView"
import { addEvent } from "functions/database";
import DateTimeInput from "components/DateTimeInput"
import { auth } from "../firebase"

function AddEvent({navigation}) {
    // https://reactjs.org/docs/hooks-state.html
    // React keeps track of these variables. If they are changed, any part of the UI uses these values will also be updated without having to refresh the page. 
    // "set" function is used to update the state in the future when changed.
    // https://www.youtube.com/watch?v=1FiIYaRr148 . I found this youtube video explained the concept very well.
    
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [date, setDate] = useState(new Date())
    const [info, setInfo] = useState("")

    // https://firebase.google.com/docs/firestore/manage-data/add-data#web
    // Adds a new event document to the Events collection in Firestore. 
    // Adding the below attributes to the event document in the db with the assinged value entered in the UI in the relevant fields.
    function handleAdd() {
        addEvent(name, location, date, info, auth.currentUser.uid)
            .then(() => {
                navigation.navigate("Event List")
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
                <Input label="Name" onChangeText={text => setName(text)} value={name}/> 
                <Input label="Location" onChangeText={text => setLocation(text)} value={location}/>
                <Input label="Info" onChangeText={text => setInfo(text)} value={info}/> 
                <DateTimeInput date={date} setDate={setDate} mode="date"/>
                <Button onPress={handleAdd} title="Add Event"  />   
            </Card>  
        </MyView>   
    )
}  

export default AddEvent