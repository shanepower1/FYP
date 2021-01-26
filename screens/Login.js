import React, {useState} from "react"
import { Button, Input, Card, Text } from "react-native-elements"
import {auth} from "../firebase"
import MyView from "../components/MyView"

function Login({navigation}) { 
    const [email, setEmail] = useState("spower41@gmail.com")
    const [password, setPassword] = useState("shanepower1")
    const [isLoading, setIsLoading] = useState(false)
    
    //Code got from https://firebase.google.com/docs/auth/web/password-auth#create_a_password-based_account
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