import React, {useState, useEffect} from "react"
import { View } from "react-native"
import { Text, Card } from "react-native-elements"
import { db } from "../firebase"



// Code got from https://reactnavigation.org/docs/params/
// Parameters can be passed to a component with React Navigation, these can be retrieved from the route variable. E.g. route.params.eventId
function Event ({route}) {  
    const [event, setEvent] = useState("")

    // When event is updated the component is refreshed. 
    // useEffect ensures this code is only ran once when the component is initially loaded. 
    useEffect(() => {
        setEvent(route.params.event)
    })

    //Currently returning the below event attributes, however as developmenet progresses it will display more
    return (
        <Card>
            <Text>Event</Text>
            <Card.Title>
                <Text>{event.eventName}</Text>
            </Card.Title>
            <Text>{event.formattedDate}</Text>  
            <Text>{event.formattedTime}</Text>  
            <Text>{event.eventLocation}</Text> 
       </Card>      
    )
}

export default Event