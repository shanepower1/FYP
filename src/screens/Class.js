import React, {useState, useEffect} from "react"
import { Text, Card, Divider, Input, Button, ListItem } from "react-native-elements"
import { getClass, deleteClass, getSchedule } from "functions/database"
import { useNavigation } from '@react-navigation/native'
import { formatDate, formatTime } from "functions/helpers"
import DateTimeInput from "../components/DateTimeInput"
import { addSchedule } from "../functions/database"
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
                setName(classInfo.name)
                setDescription(classInfo.description)
            })
        
        getSchedule(route.params.id)
            .then(result => {
                setSchedule(result)
            }).catch(error => {
                alert(erorr.message)
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
        addSchedule(auth.currentUser.uid, route.params.id, scheduleDate)
            .then(() => {
                loadInfo()
            }).catch(error => {
                alert(error.message)
            })
    }

    function removeSchedule(id) {
        deleteSchedule(id)
            .then(() => loadInfo())
            .catch(error => alert(error.message))
    }

    function bookClass() {
        //get array [id1, id2, id3]

        array.push(thisfella)

        schedule.update(thisfella)
    }

    return (
        <MyView>
            <Card>
                <Card.Title>{name}</Card.Title>
                <Divider />
                <Text>{description}</Text>
            </Card>
            <Card>
                <Card.Title>Class Schedule</Card.Title>
                <Divider />
                {schedule.map(item => (
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
                                <Button title="Book" onPress={() => bookClass(item.id)}/>
                            }
                        </ListItem>        
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