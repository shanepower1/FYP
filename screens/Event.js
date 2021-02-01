import React, {useState, useEffect} from "react"
import { View } from "react-native"
import { Text, Card } from "react-native-elements"
import { db } from "../firebase"


//Function to retrieve the event from the database using the event ID and to return information on it in the event page
//Code got from https://reactnavigation.org/docs/params/

function Event ({ route }) {
/*     const [event, setEvent] = useState([])

    useEffect(() => {
        db.collection("events").doc(route.params.eventId).get()
        .then(doc => {
            setEvent(doc.data())
            console.log("")
        }).catch(error => {
            console.log(error.message)
        })
    }, []) */
        //Currently returning the below event attributes, however as developmenet progresses it will display more
    return (
        <Card>
            <Text>Event</Text>
{/*             <Card.Title>
                <Text>{event.eventName}</Text>
            </Card.Title>
            <Text>{event.eventDate}</Text>
            <Text>{event.eventLocation}</Text> */}
       </Card>
        
    )
}

export default Event