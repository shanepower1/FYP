import React, {useState, useEffect} from "react"
import { db } from "../firebase"
import { Card, ListItem, Avatar } from "react-native-elements"
import { Button, View } from "react-native"
import Event from "./Event"

function Events() {
    const [events, setEvents] = useState([])
    const [selectedEvent, setSelectedEvent] = useState(0)

    useEffect(() => {
        getEvents()
    }, [])

    function getEvents() {
        db.collection("events").get()
        .then(docs => {
            var list = []
            docs.forEach(doc => {
                console.log(doc.data())
/*                 var temp = doc.data()
                temp.id = doc.id
                list.push(temp) */
            })  

/*             setEvents(list)
            console.log(events)  */

         }).catch(error => {
            console.error(error.message)
        }) 
    }

    function deleteEvent(id) {

    }
    
    //List Item used to display rows of Information , code got off of react native documentation https://reactnativeelements.com/docs/listitem
    return (
        <View>
            <Card>
            {
                /* events.map((item, i) => (
                    <ListItem key={i} bottomDivider onPress={() => setSelectedEvent(item.id)}>
                        <Avatar source={{uri: item.img_url}} />
                        <ListItem.Content>
                        <ListItem.Title>{item.eventName}</ListItem.Title>
                        <ListItem.Subtitle>{item.eventDate}</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron />
                        <Button title="X" />
                    </ListItem>
                    
                ))   */
            }
            </Card>
            <Card>
{/*                 <Event id={selectedEvent} />
 */}            </Card>
        </View>   
    )
}

export default Events