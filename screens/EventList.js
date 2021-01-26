import React, {useState, useEffect} from "react"
import { db } from "../firebase"
import { Card, ListItem, Avatar, Text } from "react-native-elements"
import { Button, View } from "react-native"
import MyView from "../components/MyView"

function EventList({navigation, route}) {
    const [events, setEvents] = useState([])
    const [selectedEvent, setSelectedEvent] = useState(null)
    const { type } = route.params

    useEffect(() => {
        getEvents()
    }, [])

//Getting the event information from firebase and displaying it.

    function getEvents() {
        db.collection("events").get()
        .then(docs => {
            var list = []
            docs.forEach(doc => {
                var temp = doc.data()
                temp.id = doc.id
                list.push(temp) 
            })  

            setEvents(list)
            console.log(events) 

         }).catch(error => {
            console.error(error.message)
        }) 
    }
        //Function to delete event using the events ID.

    function deleteEvent(id) {
        db.collection("events").doc(id).delete()
            .then(() => {
                getEvents()
            }).catch(error => {
                console.log(error.message)
            })
    }
    
    //List Item used to display rows of Information , code got off of react native documentation https://reactnativeelements.com/docs/listitem
    return (
        <MyView>
            <Button title="Add Event" onPress={() => navigation.navigate("Add Event")} />
            <Card>
            {
                events.map((item, i) => (
                    <ListItem key={i} bottomDivider onPress={() => navigation.navigate("Event", {
                        eventId : item.id
                    })}>
                        <Avatar source={{uri: item.img_url}} />
                        <ListItem.Content>
                            <ListItem.Title>
                                <Text>{item.eventName}</Text>                          
                            </ListItem.Title>
                            <ListItem.Subtitle>
                                <Text>{item.eventDate}</Text>
                            </ListItem.Subtitle>
                        </ListItem.Content>
                        <Button title="X" onPress={() => deleteEvent(item.id)}/>
                    </ListItem>
                    
                ))  
            }
            </Card>
    
            <Button title="Refresh" onPress={() => getEvents()} />
        </MyView>   
    )
}

export default EventList