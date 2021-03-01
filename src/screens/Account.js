import React from "react"
import { StyleSheet } from "react-native"
import { Text, ListItem, Card } from "react-native-elements"
import { auth } from "../firebase.js"
import MyView from "components/MyView"

function Account ({navigation}){
    //Sign out button calling the above SignOut function when pressed.
    
    const chevronSize = 30

    return (
        <MyView title="account">
            <Card containerStyle={{padding: 0}}>
                <ListItem onPress={() => auth.signOut()} bottomDivider style={{fontSize: 50}}>
                    <ListItem.Content>
                        <ListItem.Title style={styles.title}>Sign Out</ListItem.Title>
                        <ListItem.Subtitle style={styles.subtitle}>Return to login screen</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron size={chevronSize}/>
                </ListItem>

                {auth.currentUser.type == "owner" ? 
                <ListItem onPress={() => navigation.navigate("Update Gym")} bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title style={styles.title}>Update Gym Details</ListItem.Title>
                        <ListItem.Subtitle style={styles.subtitle}>Information on gym</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron size={chevronSize}/>
                </ListItem>: null }
            </Card>              
        </MyView>
    )
}

const styles = StyleSheet.create({
    title: {
        
    },
    subtitle: {

    },
})

export default Account