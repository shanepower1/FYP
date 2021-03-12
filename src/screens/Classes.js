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
        // Checks if user or owner is signed in and gets gymid. 
        let gymId = auth.currentUser.gymId!=null ? auth.currentUser.gymId : auth.currentUser.uid 

        // Calling getClasses from database.js. 
        getClasses(gymId)
            .then(result => {
                setClasses(result)
            }).catch(error => {
                alert(error.message)
            })
    }

    // Buttons in floating action button. 
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

    // Handles floating action button click. 
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
              <Card><Text>Weekly Classes</Text></Card>
                <Card containerStyle={{padding: 0}}>
                    {classes.map(item => (
                            <ListItem key={item.id} bottomDivider onPress={() => navigation.navigate("Class", {id: item.id})}>
                                {/* Loads image from my firebase storage. class id is the same as the image name. */}
                                <Avatar source={{uri: `https://firebasestorage.googleapis.com/v0/b/shanefyp-e17f7.appspot.com/o/classes%2F${item.id}?alt=media&token=cff1649c-2042-4225-90a3-bb655d6d8b2c`}} />
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
            
            {/* https://github.com/santomegonzalo/react-native-floating-action */}
            
            <FloatingAction
                actions={fabActions}
                onPressItem={handleFab}
            />
        </>
    )
}

export default Classes