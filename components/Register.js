import React, {useState} from "react"
import { Button ,Input, Card} from "react-native-elements"
import {auth, db} from "../firebase"

function Register({navigation}) { 
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    function RegisterAccount (){
      auth.createUserWithEmailAndPassword(email, password)
        .then(result => {
            AddUserInfo(result.user.uid)
          }).catch(error => {
          alert(error.message)
        })
    }

    function AddUserInfo(id) {
      db.collection("users").doc(id).set({
        name: name
      })
    }

    //Code got from react native documentation https://reactnativeelements.com/docs/input
    return (
      <Card>     
        <Input placeholder="Name" value={name} onChangeText={text => setName(text)}/>
        <Input placeholder="Email" value={email} onChangeText = {text => setEmail(text)}/>
        <Input placeholder="Password" value={password} onChangeText={text => setPassword(text)} secureTextEntry={true}/>
        <Card.Title onPress={() => navigation.navigate("Login")}>Back To Login</Card.Title>

        <Button title="Register" onPress={RegisterAccount}/> 
      </Card>
    )
}
  
export default Register