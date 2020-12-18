import React from "react"
import {Card,Button} from "react-native-elements"
import {auth} from "../firebase"

function Account ({navigation}){
    function signOut (){
        auth.signOut()
        navigation.navigate("Login")
        
    }

    return (
        <Card>
            <Button title="Sign Out" onPress={signOut} />            
        </Card>
    )
}


export default Account