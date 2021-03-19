import React, {useState, useEffect} from "react"
import { Card, ListItem, Avatar, Text } from "react-native-elements"
import { Button } from "react-native"
import MyView from "components/MyView"
import { getEvents, deleteEvent } from "functions/database"
import { auth, db } from "../firebase"
import { FloatingAction } from "react-native-floating-action"
import { Ionicons } from '@expo/vector-icons';
import { formatDate, formatTime} from "functions/helpers"
import { useAuth } from "components/AuthContext"

function EventList({navigation, route}) {
    // https://reactjs.org/docs/hooks-state.html
    // React keeps track of these variables. If they are changed, any part of the UI uses these values will also be updated without having to refresh the page. 
    // "set" function is used to update the state in the future when changed.
    // https://www.youtube.com/watch?v=1FiIYaRr148 . I found this youtube video explained the concept very well.
     
    const [events, setEvents] = useState([])
    const { gymId, userType } = useAuth()
    // Runs when component is loaded, and only runs once even if component is updated. 
    //https://reactjs.org/docs/hooks-effect.html
    useEffect(() => { 
        loadEvents()
    }, []) 

    // https://firebase.google.com/docs/firestore/query-data/get-data.
    function loadEvents(){
        getEvents(gymId)
            .then(events => {
                setEvents(events)
            }).catch(error => {
                //alert(error.message)

            }) 
    }
    //https://firebase.google.com/docs/firestore/manage-data/delete-data. 
    //Function to delete event from the db using the events ID. 

    function removeEvent(id) {
        deleteEvent(id)
            .then(() => {
                loadEvents()
            }).catch(error => {
                alert(error.message)
            })
    }
    
    const fabActions = [
        {
          text: "Refresh",
          icon: <Ionicons name="refresh" size={24} color="white" />,
          name: "refresh",
          position: 1
        },
        {
          text: "Add Event",
          icon: <Ionicons name="add-outline" size={24} color="white" />,
          name: "add",
          position: 2
        },
      ];

    function handleFab(name) {
        if(name == "refresh") {
            loadEvents()
        } else if(name == "add") {
            navigation.navigate("Add Event")
        }
    }

    return (
        <>
            <MyView>  
                <Card>
                  <Card.Title style={{marginBottom: 0}}>Check out our upcoming events!</Card.Title>
                </Card>
                <Card containerStyle={{padding: 0}}> 
                {
                    // .map loops through the events and displays them one by one. 
                    // https://reactnativeelements.com/docs/listitem/
                    //List Item used o display rows of relevent information
                    events.map(event => (
                        <ListItem key={event.id} bottomDivider onPress={() => navigation.navigate("Event", {eventId: event.id})}>
                            <Avatar source={{uri: `https://firebasestorage.googleapis.com/v0/b/shanefyp-e17f7.appspot.com/o/events%2F${event.id}?alt=media&token=cff1649c-2042-4225-90a3-bb655d6d8b2c`}} />
                            <ListItem.Content>
                                <ListItem.Title>
                                    <Text>{event.name}</Text>                      
                                </ListItem.Title>
                                <ListItem.Subtitle>
                                    <Text>{event.location}</Text>                      
                                </ListItem.Subtitle>
                                <ListItem.Subtitle>
                                <Text>{formatDate(event.date)} @ {formatTime(event.date)}</Text> 
                                </ListItem.Subtitle>
                            </ListItem.Content> 
                            <Button title="X" onPress={() => removeEvent(event.id)}/>
                        </ListItem>        
                    ))  
                }
                </Card> 
            </MyView>   

            {
                userType=="owner" &&
                <FloatingAction
                actions={fabActions}
                onPressItem={handleFab}
            />
            }

        </>
    )
}

export default EventList