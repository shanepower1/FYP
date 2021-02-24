import React, {useState} from "react"
import { Button ,Input, Card, Text} from "react-native-elements"
import {Picker, View} from "react-native"
import {auth, db} from "../firebase"
import MyView from "../components/MyView"
import RegisterGym from "../screens/RegisterGym"

function Register({navigation}) { 
    const [email, setEmail] = useState("")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")
    const [name, setName] = useState("")
    const [userType, setUserType] = useState("")

    // https://firebase.google.com/docs/auth/web/password-auth
    function RegisterAccount() {
      auth.createUserWithEmailAndPassword(email, password1)
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
          <Input placeholder="Password1" value={password1} onChangeText={text => setPassword(text)} secureTextEntry={true}/>
          <Input placeholder="Password2" value={password2} onChangeText={text => setPassword(text)} secureTextEntry={true}/>
          <Card.Title onPress={() => navigation.navigate("Login")}>
            <Text>Back To Login</Text>            
          </Card.Title>
          <Button title="Register" onPress={RegisterAccount}/> 
        </Card>
        <Text style={{color: "white", textAlign: "center", color: "white", marginTop: 25}} onPress={() => navigation.navigate("Register Gym")}>Own a gym? Click <Text style={{fontWeight: "bold", color: "white"}}>here</Text> to register.</Text>
      </MyView>
    )
}
  
export default Register