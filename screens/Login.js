import React, {useState} from "react"
import { Button, Input, Card, Text } from "react-native-elements"
import {auth} from "../firebase"
import MyView from "../components/MyView"

function Login({navigation}) {

    // https://reactjs.org/docs/hooks-state.html
    // React keeps track of these variables. If they are changed, any part of the UI uses these values will also be updated without having to refresh the page. 
    // "set" function is used to update the state in the future when changed.
    // https://www.youtube.com/watch?v=1FiIYaRr148 . I found this youtube video explained the concept very well.
     
    const [email, setEmail] = useState("spower41@gmail.com")
    const [password, setPassword] = useState("shanepower1")
    const [isLoading, setIsLoading] = useState(false)
    
    // https://firebase.google.com/docs/auth/web/password-auth
    function signIn(){
        setIsLoading(true)
        auth.signInWithEmailAndPassword(email, password)
            .then(result => {
                setIsLoading(false)
                navigation.navigate("Main")
            }).catch(error => {
                setIsLoading(false)
                alert(error.message)
            })
    }
    
    //Code got from react native documentation https://reactnativeelements.com/docs/input
    //Inputs allow the user to enter text into the UI.
    //The "set" function used below allows the text entered into the input in the UI by the user to be set to the value 
    //of the email and password variables.
    return (
        <MyView>
            <Card>     
                <Input placeholder="Email" value={email} onChangeText = {text => setEmail(text)}/>
                <Input placeholder="Password" value={password} onChangeText={text => setPassword(text)} secureTextEntry={true}/>
                <Card.Title onPress={() => navigation.navigate("Register")}>
                    <Text>Create Account</Text>
                </Card.Title>
                <Button title="Login" onPress={signIn} loading={isLoading}/> 
            </Card>
        </MyView>
    )
}
  
export default Login