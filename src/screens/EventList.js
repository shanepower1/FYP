import React, {useState, useEffect} from "react"
import { Card, ListItem, Avatar, Text } from "react-native-elements"
import { Button } from "react-native"
import MyView from "components/MyView"
import { getEvents, deleteEvent } from "functions/database"

function EventList({navigation, route}) {
    // https://reactjs.org/docs/hooks-state.html
    // React keeps track of these variables. If they are changed, any part of the UI uses these values will also be updated without having to refresh the page. 
    // "set" function is used to update the state in the future when changed.
    // https://www.youtube.com/watch?v=1FiIYaRr148 . I found this youtube video explained the concept very well.
     
    const [events, setEvents] = useState([])
    
    // Runs when component is loaded, and only runs once even if component is updated. 
    //https://reactjs.org/docs/hooks-effect.html
    useEffect(() => { 
        loadEvents()
    }, []) 

    // https://firebase.google.com/docs/firestore/query-data/get-data.
    function loadEvents(){
        getEvents().then(events => {
                setEvents(events)
            }).catch(error => {
                alert(error.message)
            })
    }
    //https://firebase.google.com/docs/firestore/manage-data/delete-data. 
    //Function to delete event from the db using the events ID. 

    function removeEvent(id) {
        deleteEvent(id)
            .then(() => {
                loadEvents()
            }).catch(error => {
                console.log(error.message)
            })
    }
    
    return (
        <MyView>     
            <Button title="Add Event" containerStyle={{marginBottom: 10}} onPress={() => navigation.navigate("Add Event")} />
            <Button title="Refresh" onPress={loadEvents} />
             
            <Card containerStyle={{padding: 0}}> 
            {
                // .map loops through the events and displays them one by one. 
                // https://reactnativeelements.com/docs/listitem/
                //List Item used o display rows of relevent information
                events.map(event => (
                    <ListItem key={event.id} bottomDivider onPress={() => navigation.navigate("Event", {
                        event: event, // Pass event object to Event.js where we can then display it. 
                    })}>
                        <Avatar source={{uri: event.img_url}} />
                        <ListItem.Content>
                            <ListItem.Title>
                                <Text>{event.name}</Text>                      
                            </ListItem.Title>
                            <ListItem.Subtitle>
                                <Text>{event.location}</Text>                      
                            </ListItem.Subtitle>
                            <ListItem.Subtitle>
                               <Text>{event.formattedDate} @ {event.formattedTime}</Text> 
                            </ListItem.Subtitle>
                        </ListItem.Content> 
                        <Button title="X" onPress={() => removeEvent(event.id)}/>
                    </ListItem>        
                ))  
            }
            </Card> 
        </MyView>   
    )
}

export default EventList