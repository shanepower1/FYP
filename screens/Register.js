import React, {useState} from "react"
import { Button ,Input, Card, Text} from "react-native-elements"
import {Picker, View} from "react-native"
import {auth, db} from "../firebase"
import MyView from "../components/MyView"
import RegisterGym from "../screens/RegisterGym"

function Register({navigation}) { 
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [userType, setUserType] = useState("")

    // https://firebase.google.com/docs/auth/web/password-auth
      function RegisterAccount() {
        auth.createUserWithEmailAndPassword(email, password)
          .then(result => { // result contains newly created users information. 

              // We get the newly created users id and create a document in the db with the same id. 
              //This is the information that will be stored in the database on each newly created user.
              db.collection("users").doc(result.user.uid).set({
                name: name,
                type: "standard"
              })
            }).catch(error => {
              alert(error.message)
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
          <Button title="Register Gym" onPress={() => navigation.navigate("Register Gym")} style={{marginTop: 20}} />
        </Card>
      </MyView>
    )
}
  
export default Register