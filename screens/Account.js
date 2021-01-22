import React from "react"
import {Card,Button} from "react-native-elements"
import {auth} from "../firebase"
import MyView from "../components/MyView"

function Account ({navigation}){
    function signOut (){
        auth.signOut()
        navigation.navigate("Login")
        
    }

    return (
        <MyView>
        <Card>
            <Button title="Sign Out" onPress={signOut} />            
        </Card>
        </MyView>
    )
}


export default Account