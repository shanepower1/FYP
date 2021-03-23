import React, { useState, useEffect } from "react"
import { Text, ListItem, Card } from "react-native-elements" 
import { getUser } from "functions/database"
import MyView from "components/MyView"

function ScheduledClass({route}) {
    const [bookedUsers, setBookedUsers] = useState([])

    useEffect(() => {
        console.log(bookedUsers)
    }, [bookedUsers])

    useEffect(() => { 
        loadData()
    }, [])

    async function loadData() { 
        let tempUsers = []

        route.params.info.bookings.forEach(userId => {
            getUser(userId).then(user => {
                tempUsers.push(user)
              
            })
        })  

        await delay(1000);

        setBookedUsers(tempUsers)
    }

    const delay = ms => new Promise(res => setTimeout(res, ms));

    return (
        <MyView>
            <Card containerStyle={{padding: 0}}>
                {
                    bookedUsers.map(item => (
                        <ListItem key={item.id}>
                            <ListItem.Content>
                                <ListItem.Title>
                                    <Text>{item.name}</Text>                      
                                </ListItem.Title>
                            </ListItem.Content> 
                        </ListItem>        
                    ))
                } 
            </Card>    
        </MyView>
    )
}

export default ScheduledClass