import React from "react"
import { StyleSheet } from "react-native"
import { Text, ListItem, Card } from "react-native-elements"
import { auth } from "../firebase.js"
import MyView from "components/MyView"
import { useAuth } from "components/AuthContext"

function Account ({navigation}){
    const { isSignedIn, userType, gymName } = useAuth()

    const chevronSize = 30
//Below is a card consisting of a sign out button for both users.
//The button once pressed will call the sign out function
//Also on another card is update gym detials which is only
//visible to the gym owner users.
    return (
        <MyView>
            <Card containerStyle={{padding: 0}}>
                <ListItem onPress={() => auth.signOut()} bottomDivider style={{fontSize: 50}}>
                    <ListItem.Content>
                        <ListItem.Title style={styles.title}>Sign Out</ListItem.Title>
                        <ListItem.Subtitle style={styles.subtitle}>Return to login screen</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron size={chevronSize}/>
                </ListItem>
                
                {userType == "owner" ? 
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