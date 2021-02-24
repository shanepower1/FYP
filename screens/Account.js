import React from "react"
import { Card, Button, Text, ListItem } from "react-native-elements"
import { auth } from "../firebase"
import MyView from "../components/MyView"
import UpdateGym from "./UpdateGym"

function Account ({navigation}){
    //Sign out button calling the above SignOut function when pressed.
    return (
        <MyView>
            <Text style={{color: "white", textAlign: "center", fontSize: 30, marginBottom: 10}}>Manage Bookings</Text>           
            <ListItem onPress={() => auth.signOut()} bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>Sign Out</ListItem.Title>
                    <ListItem.Subtitle>Return to login screen</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>

            {auth.currentUser.type == "owner" ? 
            <ListItem onPress={() => navigation.navigate("Update Gym")} bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>Update Gym Details</ListItem.Title>
                    <ListItem.Subtitle>Information on gym</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>: null }
        </MyView>
    )
}


export default Account