import React from "react"
import { View } from "react-native"
import { Text, Card } from "react-native-elements"

function Event (props) {
    return (
            <Card>
                <Text>{props.event.id}</Text>
                <Text>{props.event.eventName}</Text>
                <Text>{props.event.eventLocation}</Text>
            </Card>
        
    )
}

export default Event