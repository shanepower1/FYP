import React, {useState, useEffect} from "react"
import { View } from "react-native"
import { Text, Card } from "react-native-elements"
import { formatDate, formatTime} from "functions/helpers"
import { getEvent } from "functions/database"

// Code got from https://reactnavigation.org/docs/params/
// Parameters can be passed to a component with React Navigation, these can be retrieved from the route variable. E.g. route.params.eventId
// Passing the event information from eventList to this screen by using the route variable..
function Event ({route}) {  
    const [event, setEvent] = useState([])

    // When event is updated the component is refreshed. 
    // useEffect ensures this code is only ran once when the component is initially loaded. 
    //https://reactjs.org/docs/hooks-effect.html
    useEffect(() => {
        loadInfo()
    }, [])

    function loadInfo() {
        getEvent(route.params.eventId)
            .then(event => {
                console.log(event)
                setEvent(event)
            }).catch(error => {
                alert(error.message)
            })
    }

    //Returning the below event attributes and displaying them on the Event screen.
    return (
        <Card>
            <Card.Title>
                <Text>{event.name}</Text>
            </Card.Title>
            <Card.Image source={{uri: `https://firebasestorage.googleapis.com/v0/b/shanefyp-e17f7.appspot.com/o/events%2F${route.params.eventId}?alt=media&token=cff1649c-2042-4225-90a3-bb655d6d8b2c`}} />
            <View style={{flexDirection: "row", padding: 10, marginTop: 15}}>
                <View style={{flexGrow: 1}}>
                    <Text style={{fontWeight: "bold"}}>Date</Text>
                    <Text style={{fontWeight: "bold"}}>Time</Text>
                    <Text style={{fontWeight: "bold"}}>Location</Text>
                    <Text style={{fontWeight: "bold"}}>Info</Text>
                </View>
                <View style={{flexGrow: 1}}>
                    <Text>{formatDate(event.date)}</Text>  
                    <Text>{formatTime(event.date)}</Text>   
                    <Text>{event.location}</Text> 
                    <Text>{event.info}</Text>
                </View>
            </View>
       </Card>      
    )
}

export default Event