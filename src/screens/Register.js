import React, { useState } from "react"
import { View, Image } from "react-native"
import { Button ,Input, Card, Text} from "react-native-elements"
import { auth, db } from "../firebase"
import MyView from "components/MyView"
import { addUser } from "functions/database"

function Register({navigation}) { 
    const [email, setEmail] = useState("")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")
    const [name, setName] = useState("")

    // https://firebase.google.com/docs/auth/web/password-auth
    function RegisterAccount() {
      auth.createUserWithEmailAndPassword(email, password1)
        .then(result => { // result contains newly created users information. 
            addUser(result.user.uid, name, "standard", null)
        }).catch(error => {
            alert(error.message)
        })
    }

    //Code got from react native documentation https://reactnativeelements.com/docs/input
    //Inputs allow the user to enter text into the UI.
    //The "set" function used below allows the text entered into the input in the UI by the user to be set to the value 
    //of the name, email and password variables.
    return (
      <MyView background="#2F0B29">
        <View style={{backgroundColor: "#2F0B29", marginLeft: 25, marginRight: 25, elevation: 4}} >
        <Image source={require("assets/gymconnect.png")} height={200} style={{marginTop: 25, marginBottom: 25, marginLeft: "auto", marginRight: "auto"}}/>
          <Input style={{color: "white"}} label="Name" value={name} onChangeText={text => setName(text)}/>
          <Input style={{color: "white"}} label="Email" value={email} onChangeText = {text => setEmail(text)}/>
          <Input style={{color: "white"}} label="Password 1" value={password1} onChangeText={text => setPassword1(text)} secureTextEntry={true}/>
          <Input style={{color: "white"}} label="Password 2" value={password2} onChangeText={text => setPassword2(text)} secureTextEntry={true}/>
          <Card.Title onPress={() => navigation.navigate("Login")}>
            <Text style={{color:"white"}}>Back To Login</Text>            
          </Card.Title>
          <Button title="Register" onPress={RegisterAccount}/> 
        </View>
        <Text style={{color: "white", textAlign: "center", color: "white", marginTop: 25}} onPress={() => navigation.navigate("Register Gym")}>Own a gym? Click <Text style={{fontWeight: "bold", color: "white"}}>here</Text> to register.</Text>
      </MyView>
    )
}


  
export default Register