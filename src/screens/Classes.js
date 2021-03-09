import React, { useState, useEffect } from "react"
import { Text, Card, Button, Input, ListItem, Avatar} from "react-native-elements"
import MyView from "components/MyView"
import { getClasses } from "functions/database"
import { NavigationContainer } from "@react-navigation/native"
import { FloatingAction } from "react-native-floating-action"
import { Ionicons } from '@expo/vector-icons';
import { auth } from "../firebase"

function Classes({navigation}) {
    const [classes, setClasses] = useState([])

    useEffect(() => {
        getData()
    }, [])

    function getData() {
        let gymId = auth.currentUser.gymId!=null ? auth.currentUser.gymId : auth.currentUser.uid // Checks if user or owner is signed in and gets gymid. 

        getClasses(gymId)
            .then(result => {
                setClasses(result)
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
          text: "Add Class",
          icon: <Ionicons name="add-outline" size={24} color="white" />,
          name: "add",
          position: 2
        },
      ];

    function handleFab(name) {
        if(name == "refresh") {
            getData()
        } else if(name == "add") {
            navigation.navigate("Add Class")
        }
    }

    return (
        <>
            <MyView>
                <Card containerStyle={{padding: 0}}>
                    {classes.map(item => (
                            <ListItem key={item.id} bottomDivider onPress={() => navigation.navigate("Class", {id: item.id})}>
                                <Avatar source={{uri: item.img_url}} />
                                <ListItem.Content>
                                    <ListItem.Title>
                                        <Text>{item.name}</Text>                      
                                    </ListItem.Title>
                                    <ListItem.Subtitle>
                                        <Text>{item.description}</Text>                      
                                    </ListItem.Subtitle>
                                </ListItem.Content> 
                                <ListItem.Chevron size={25}/>
                            </ListItem>        
                        ))
                    } 
                </Card>    
            </MyView>
            <FloatingAction
                actions={fabActions}
                onPressItem={handleFab}
            />
        </>
    )
}

export default Classes