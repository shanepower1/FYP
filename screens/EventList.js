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
    const [filteredEvents, setFilteredEvents] = useState([])
    const [selectedCounty, setSelectedCounty] = useState("all")
    const type = route.params.type // TODO
    
    // Runs when component is loaded, and only runs once even if component is updated. 
    useEffect(() => { 
        getEvents()
    }, []) 

    // Runs code whenever county variable changes. 
    useEffect(() => {
        // If "all" is selcted in picker, set filtered events to full list of events. 
        if(selectedCounty == "all") {
            setFilteredEvents(events)
        } 
        
        // If a county is selected in picker, loop through events and only add events with selected county to filtered list. 
        else {
            let tempList = []
            events.forEach(event => {                
                if(event.eventLocation == selectedCounty) {
                    tempList.push(event)
                } 
            })
            
            setFilteredEvents(tempList)
        }   
    
    }, [selectedCounty]) 

    // https://firebase.google.com/docs/firestore/query-data/get-data.
    //TODO
    function getEvents(){
        db.collection("events").get()
            .then(docs => {
                let tempList = []
                docs.forEach(doc => {
                    let temp = doc.data()
                    temp.id = doc.id
                    
                    let date = doc.data().eventDate.toDate()

                    // Getting individual values from date object for day, month, and year. 
                    temp.formattedDate = date.getUTCDate() + "/" + date.getUTCMonth() + "/" + date.getUTCFullYear() // Concatenating values together e.g. 21/1/20
                    temp.formattedTime = date.getHours() + ":" + date.getMinutes()
                    
                    tempList.push(temp)
                })  

                setEvents(tempList)
                setFilteredEvents(tempList)
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
            <View style={styles.container}>
                <Picker
                    selectedValue={selectedCounty}
                    style={{height: 50, width: "100%"}}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedCounty(itemValue)
                    }
                >
                    <Picker.Item label="All Counties" value="all"/>
                    <Picker.Item label="Tipperary" value="Tipperary" />
                    <Picker.Item label="Cork" value="Cork" />
                    <Picker.Item label="Limerick" value="Limerick" />
                    <Picker.Item label="Clare" value="Clare" />
                    <Picker.Item label="Waterford" value="Waterford" />
                    <Picker.Item label="Kerry" value="Kerry" />
                </Picker>
            </View>
             
             <Button title="Add Event" onPress={() => navigation.navigate("Add Event")} />
             
            <Card> 
            {
                // .map loops through the filteredEvents. 
                // https://reactnativeelements.com/docs/listitem/
                filteredEvents.map(event => (
                    <ListItem key={event.id} bottomDivider onPress={() => navigation.navigate("Event", {
                        event: event
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