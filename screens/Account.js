import React from "react"
import {Card,Button} from "react-native-elements"
import {auth} from "../firebase"
import MyView from "../components/MyView"

function Account ({navigation}){
    function signOut (){
        // Ends the firebase auth session. https://firebase.google.com/docs/auth/web/password-auth
        auth.signOut()
        navigation.navigate("Login")    
    }
        //Sign out button calling the above SignOut function when pressed.
    return (
        <MyView>
            <Card>
                <Button title="Sign Out" onPress={signOut} />            
            </Card>
        </MyView>
    )
}


export default Account