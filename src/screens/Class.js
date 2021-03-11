import React, {useState, useEffect} from "react"
import { TouchableNativeFeedback } from "react-native"
import { Text, Card, Divider, Input, Button, ListItem } from "react-native-elements"
import { getClass, deleteClass, getSchedule, addScheduledClass, deleteSchedule, bookClass } from "functions/database"
import { useNavigation } from '@react-navigation/native'
import { formatDate, formatTime } from "functions/helpers"
import DateTimeInput from "components/DateTimeInput"
import { auth } from "../firebase"
import MyView from "components/MyView"

function Class({route}) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [schedule, setSchedule] = useState([])
    const navigation = useNavigation() // Only screen components receive navigation as a prop. 
    const [scheduleDate, setScheduleDate] = useState(new Date())

    useEffect(() => {  
        loadInfo()
    }, [])

    function loadInfo() {
        getClass(route.params.id)
            .then(classInfo => {
                setId(classInfo.id)
                setName(classInfo.name)
                setDescription(classInfo.description)
            })
        
        getSchedule(route.params.id)
            .then(result => {
                result.forEach(scheduledClass => {
                    // Checking if this user has already booked and then adding a boolean field to decide if booking button should be displayed. 
                    if(scheduledClass.bookings.includes(auth.currentUser.uid)){
                        scheduledClass.alreadyBooked = true
                    } else {
                        scheduledClass.alreadyBooked = false
                    }                
                })
                setSchedule(result)
            }).catch(error => {
                alert(error.message)
            })   
    }

    function remove() {
        deleteClass(route.params.id)
            .then(() => {
                navigation.goBack()        
            }).catch(error => {
                alert(error.message)
            })
    }

    function scheduleClass() {
        addScheduledClass(auth.currentUser.uid, route.params.id, scheduleDate)
            .then(() => {
                loadInfo()
            }).catch(error => {
                alert(error.message)
            })
    }

    function removeSchedule(id) {
        deleteSchedule(id)
            .then(() => {
                loadInfo()
            })
            .catch(error => {
                alert(error.message)
            })
    }

    function book(id) {
        bookClass(id, auth.currentUser.uid)
            .then(() => loadInfo())
            .catch(error => alert(error.message))
    }

    return (
        <MyView>
            <Card>
                <Card.Title>{name}</Card.Title>
                <Card.Image source={{uri: `https://firebasestorage.googleapis.com/v0/b/shanefyp-e17f7.appspot.com/o/classes%2F${route.params.id}?alt=media&token=cff1649c-2042-4225-90a3-bb655d6d8b2c`}} />
                <Text>{description}</Text>
            </Card>
            <Card>
                <Card.Title>Class Schedule</Card.Title>
                <Divider />
                {schedule.map(item => (
                    <TouchableNativeFeedback onPress={() => navigation.navigate("Scheduled Class", {info: item})}>
                        <ListItem key={item.id} bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title>
                                    <Text>{formatDate(item.date)}</Text>                      
                                </ListItem.Title>
                                <ListItem.Subtitle>
                                    <Text>{formatTime(item.date)}</Text>                      
                                </ListItem.Subtitle>
                                <ListItem.Subtitle>
                                </ListItem.Subtitle>
                            </ListItem.Content> 
                            {
                                auth.currentUser.type == "owner"
                                ?
                                <Button title="X" onPress={() => removeSchedule(item.id)}/>
                                :
                                item.alreadyBooked ? 
                                <Text>booked</Text> 
                                :
                                <Button title="Book" onPress={() => book(item.id)}/>
                            }
                        </ListItem>        
                    </TouchableNativeFeedback>        
                    )) 
                }
            </Card>
            { 
                auth.currentUser.type == "owner" &&
                <>
                    <Card>
                        <DateTimeInput date={scheduleDate} setDate={setScheduleDate} mode="datetime"/>
                        <Button title="Schedule Class" onPress={scheduleClass}/>
                    </Card>
                    <Card containerStyle={{padding: 0}}>
                        <Button title="Delete" onPress={remove}/>  
                    </Card>
                </>
            }   
        </MyView>
    )
}

export default Class