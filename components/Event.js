import React, {useState, useEffect} from "react"
import { View } from "react-native"
import { Text, Card } from "react-native-elements"
import { db } from "../firebase"

function Event ({navigation, route}) {
    const [event, setEvent] = useState([])

    useEffect(() => {
        db.collection("events").doc(route.params.eventId).get()
        .then(doc => {
            setEvent(doc.data())
            console.log("hello")
        }).catch(error => {
            console.log(error.message)
        })
    }, [])

    return (
        <Card>
            <Card.Title>{event.eventName}</Card.Title>
            <Text>{event.eventDate}</Text>
            <Text>{event.eventLocation}</Text>
       </Card>
        
    )
}

export default Event