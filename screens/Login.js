import React, {useState} from "react"
import { Button ,Input, Card, Text } from "react-native-elements"
import {auth} from "../firebase"
import MyView from "../components/MyView"

function Login({navigation}) { 
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    function signIn(){
        auth.signInWithEmailAndPassword(email, password)
            .then(result => {
                navigation.navigate("Main")
            }).catch(error => {
                alert(error.message)
            })
    }
    
    //Code got from react native documentation https://reactnativeelements.com/docs/input
    return (
        <MyView>
        <Card>     
            <Input placeholder="Email" value={email} onChangeText = {text => setEmail(text)}/>
            <Input placeholder="Password" value={password} onChangeText={text => setPassword(text)} secureTextEntry={true}/>
            <Card.Title onPress={() => navigation.navigate("Register")}>Register Account</Card.Title>
            <Button title="Login" onPress={signIn}/> 
        </Card>
        </MyView>
    )
}
  
export default Login