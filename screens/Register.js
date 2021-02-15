import React, {useState} from "react"
import { Button ,Input, Card, Text} from "react-native-elements"
import {auth, db} from "../firebase"
import MyView from "../components/MyView"

function Register({navigation}) { 
    const [email, setEmail] = useState
    ("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    // https://firebase.google.com/docs/auth/web/password-auth
      function RegisterAccount (){
      auth.createUserWithEmailAndPassword(email, password)
        .then(result => {
            AddUserInfo(result.user.uid)
          }).catch(error => {
          alert(error.message)
        })
    }

    // Add documents with same id as newly created user to store user info. 
    //This is the information that will be stored in the database on each newly created user.
    function AddUserInfo(id) {
      db.collection("users").doc(id).set({
        name: name,

      })
    }

    //Code got from react native documentation https://reactnativeelements.com/docs/input
    //Inputs allow the user to enter text into the UI.
    //The "set" function used below allows the text entered into the input in the UI by the user to be set to the value 
    //of the name, email and password variables.
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