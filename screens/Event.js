import React, {useState, useEffect} from "react"
import { StyleSheet  } from "react-native"
import { Text, Card } from "react-native-elements"
import { db } from "../firebase"



// Code got from https://reactnavigation.org/docs/params/
// Parameters can be passed to a component with React Navigation, these can be retrieved from the route variable. E.g. route.params.eventId
// Passing the event information from eventList to this screen by using the route variable..
function Event ({route}) {  
    const [event, setEvent] = useState("")

    // When event is updated the component is refreshed. 
    // useEffect ensures this code is only ran once when the component is initially loaded. 
    //https://reactjs.org/docs/hooks-effect.html
    useEffect(() => {
         setEvent(route.params.event) 
    })

    //Returning the below event attributes and displaying them on the Event screen.
    return (
        <Card>
            <Card.Title>
            <Text>{event.eventName}</Text>
            </Card.Title>
            <Text>{event.formattedDate}</Text>  
            <Text>{event.formattedTime}</Text>  
            <Text>{event.eventLocation}</Text> 
            <Text>{event.eventInfo}</Text>
            <Card containerStyle={{backgroundColor: "#FAAF40", color: "white", height: 50}}>
            <Text style={styles.text}>Register</Text>       
            </Card> 

       </Card>      
    )
}

export default Event
const styles = StyleSheet.create({
    text: {
        color: "white"
    }
});
