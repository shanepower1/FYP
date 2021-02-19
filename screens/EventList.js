import React, {useState, useEffect} from "react"
import { db } from "../firebase"
import { Card, ListItem, Avatar, Text } from "react-native-elements"
import { Button, View, Picker, StyleSheet } from "react-native"
import MyView from "../components/MyView"

function EventList({navigation, route}) {
    // https://reactjs.org/docs/hooks-state.html
    // React keeps track of these variables. If they are changed, any part of the UI uses these values will also be updated without having to refresh the page. 
    // "set" function is used to update the state in the future when changed.
    // https://www.youtube.com/watch?v=1FiIYaRr148 . I found this youtube video explained the concept very well.
     
    const [events, setEvents] = useState([])
    
    // Runs when component is loaded, and only runs once even if component is updated. 
    //https://reactjs.org/docs/hooks-effect.html
    useEffect(() => { 
        getEvents()
    }, []) 

    // https://firebase.google.com/docs/firestore/query-data/get-data.
    function getEvents(){
        db.collection("events").get()
            .then(docs => {
                let tempList = [] // Temporary array to store properly formatted event objects. 

                // Loops through documents retrieved from Firebase. 
                docs.forEach(doc => {
                    let temp = doc.data() 
                    temp.id = doc.id // Creating new field inside temp called id with the document id. 
                    
                    let date = doc.data().eventDate.toDate() // Converting timestamp to JavaScript date object. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

                    // Getting individual values from date object for day, month, and year. 
                    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
                    temp.formattedDate = date.getUTCDate() + "/" + date.getUTCMonth() + "/" + date.getUTCFullYear() // Concatenating values together e.g. 21/1/20
                    temp.formattedTime = date.getHours() + ":" + date.getMinutes()
                    
                    tempList.push(temp)
                })  

                setEvents(tempList) // tempList is stored permanently in the events state variable. 
            }).catch(error => {
                console.error(error.message)
            })    
    }
        //https://firebase.google.com/docs/firestore/manage-data/delete-data. 
        //Function to delete event from the db using the events ID. 

    function deleteEvent(id) {
        db.collection("events").doc(id).delete()
            .then(() => {
                getEvents()
            }).catch(error => {
                console.log(error.message)
            })
    }
    
    return (
 
        <MyView>     
             <Button title="Add Event" onPress={() => navigation.navigate("Add Event")} />
             
            <Card> 
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
                                <Text>{event.eventName}</Text>                      
                            </ListItem.Title>
                            <ListItem.Subtitle>
                                <Text>{event.eventLocation}</Text>                      
                            </ListItem.Subtitle>
                            <ListItem.Subtitle>
                               <Text>{ event.formattedDate} @ {event.formattedTime}</Text> 
                            </ListItem.Subtitle>
                        </ListItem.Content> 
                        <Button title="X" onPress={() => deleteEvent(event.id)}/>
                    </ListItem>        
                ))  
            }
            </Card> 
        </MyView>   
    )
}

const styles = StyleSheet.create({
    container: {
        height: 200,

      }
});

export default EventList