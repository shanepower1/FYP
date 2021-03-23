import React, { useEffect } from "react"
import { Text, Card, Button } from "react-native-elements"
import MyView from "components/MyView"
import { useAuth } from "components/AuthContext"
import { auth } from "../firebase"
 
function OwnerHome({navigation}) {
    return (
        <MyView>
            <Card>
            <Card.Title style={{marginBottom:0}}>Admin Dashboard</Card.Title> 
            </Card>
            <Card>
                <Text>Total Number Of Members: </Text>
            </Card>
            <Card>
                <Text>Total Number Of Classes</Text>
            </Card>
            <Card containerStyle={{padding: 0}}>
                <Button title="Update Gym Information" onPress={() => navigation.navigate("Update Gym")} />
            </Card>
            <Card containerStyle={{padding: 0}}>
                <Button title="Sign Out" onPress={() => auth.signOut()} />
            </Card>
        </MyView>
    )
}

export default OwnerHome