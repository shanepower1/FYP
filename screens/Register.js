import React, {useState} from "react"
import { Button ,Input, Card, Text} from "react-native-elements"
import {auth, db} from "../firebase"
import MyView from "../components/MyView"

function Register({navigation}) { 
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    //Code got from https://firebase.google.com/docs/auth/web/password-auth#create_a_password-based_account
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
      <MyView>
      <Card>     
        <Input placeholder="Name" value={name} onChangeText={text => setName(text)}/>
        <Input placeholder="Email" value={email} onChangeText = {text => setEmail(text)}/>
        <Input placeholder="Password" value={password} onChangeText={text => setPassword(text)} secureTextEntry={true}/>
        <Card.Title onPress={() => navigation.navigate("Login")}>
          <Text>Back To Login</Text>            
        </Card.Title>
        <Button title="Register" onPress={RegisterAccount}/> 
      </Card>
      </MyView>
    )
}
  
export default Register