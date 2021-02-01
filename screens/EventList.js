import React, {useState, useEffect} from "react"
import { db } from "../firebase"
import { Card, ListItem, Avatar, Text } from "react-native-elements"
import { Button, View, Picker, StyleSheet } from "react-native"
import MyView from "../components/MyView"

function EventList({navigation, route}) {
    const [events, setEvents] = useState([])
    const [selectedEvent, setSelectedEvent] = useState(null)
    const [county, setCounty] = useState("all")
    const { type } = route.params


    useEffect(() => {
        getEvents()
    }, [])

    useEffect(() => {
        getEvents()
    }, [county]) 

    //Getting the event information from firebase and displaying it.

    function getEvents(){
        if(county === "all") {
            db.collection("events").get()
            .then(docs => {
                var list = []
                docs.forEach(doc => {
                    var temp = doc.data()
                    temp.id = doc.id
                    list.push(temp) 
                })  

                setEvents(list)
            }).catch(error => {
                console.error(error.message)
            }) 
        } else {
            db.collection("events").where('eventLocation', '==', county).get()
            .then(docs => {
                var list = []
                docs.forEach(doc => {
                    var temp = doc.data()
                    temp.id = doc.id
                    list.push(temp) 
                })  

                setEvents(list)
            }).catch(error => {
                console.error(error.message)
            }) 
        }
        
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
            <View style={styles.container}>
                <Picker
                    selectedValue={county}
                    style={{height: 50, width: "100%"}}
                    onValueChange={(itemValue, itemIndex) =>
                        setCounty(itemValue)
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
                               <Text>{ item.eventDate.toDate().toString()}</Text> 
                            </ListItem.Subtitle>
                            <ListItem.Subtitle>
                               <Text>{ item.eventDate.toDate().toString()}</Text> 
                            </ListItem.Subtitle>
                        </ListItem.Content> 
                        <Button title="X" onPress={() => deleteEvent(item.id)}/>
                    </ListItem>
                    
                ))  
            }
            </Card> 
    
{/*             <Button title="Refresh" onPress={() => getEvents()} /> */}
        </MyView>   
    )
}

const styles = StyleSheet.create({
    container: {
        height: 200,

      }
});

export default EventList