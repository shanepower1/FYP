import React, { useState } from "react"
import { View } from "react-native"
import { auth, db } from "../firebase"
import { Card, Input, Button, Text } from "react-native-elements"
import MyView from "components/MyView"
import { addUser, addGym } from "functions/database"

// https://reactjs.org/docs/hooks-state.html
// React keeps track of these variables. If they are changed, any part of the UI uses these values will also be updated without having to refresh the page. 
// "set" function is used to update the state in the future when changed.
// https://www.youtube.com/watch?v=1FiIYaRr148 . I found this youtube video explained the concept very well.   
//Assigning all the attributes that will be required when registering a gym to the app.
function RegisterGym({navigation}) {
    const [name, setName] = useState("Gym Name")
    const [address1, setAddress1] = useState("address1")
    const [address2, setAddress2] = useState("address2")
    const [town, setTown] = useState("town")
    const [county, setCounty] = useState("county")
    const [email, setEmail] = useState("gym@gym.com")
    const [phoneNum, setPhoneNum] = useState("18736873264")
    const [password1, setPassword1] = useState("password")
    const [password2, setPassword2] = useState("password")

    // This will ensure both a valid email and number is entered
    // https://emailregex.com/
    //This email regex will ensure a valid email is entered when the user is registering the gym.
    const emailFormat = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    // https://stackoverflow.com/questions/273141/regex-for-numbers-only#:~:text=Your%20regex%20will%20match%20anything,%5B0%2D9%5D%2B%24%22)%3B
    //This number regex will ensure that when registering that the user will enter a valid number
    const numberFormat = /^[0-9]*$/

    //Adding some form validation for when a user is registering their gym
    //This will ensure all accurate information is being stored in the database.
    function handleAddGym() {
        if(name.length < 1) {
            alert("Please enter a name") //Must input a proper name for the gym
        } else if(address1.length < 1) {
            alert("Please enter an addresss") // Address line 1 must be a proper name
        } else if(town.length < 1) {
            alert("Please enter a town") // The town where the gym is located must be a prope namme
        } else if(county.lenth < 1){
              alert('Plese enter a county') // The county the gym is located in must be a inputted properly.
        } else if(email.length < 1) {
            alert("Please enter an email")   
        } else if(!emailFormat.test(email)) {
            alert("Email badly formatted") // Email must be entered and formatted properly
        } else if(phoneNum < 1) {
            alert("Please enter a phone number")
        } else if(!numberFormat.test(phoneNum)) {
            alert("Phone numbers must only contain numbers") //Phone number must be entered and must only be numbers entered.
        } else if(password1.length < 6) {
            alert("Password must container 6 or more characters")
        } else if(password1 != password2) {
            alert("Passwords don't match") //Password 1 must have more than 6 charecters and match password2 in order to successfully add to the database.
        } else {

            // https://firebase.google.com/docs/auth/web/password-auth
            // Adding document to "gyms" collection in firebase. If "gyms" collection doesn't exist it will create it. 
            auth.createUserWithEmailAndPassword(email, password1)
                .then(result => { //result contains newly created user information  
                    addUser(result.user.uid, "owner")
                    addGym(name, address1, address2, town, county, result.user.uid)     
                    alert("Success")
                }).catch(error => {
                    alert(error.message)
                })
           
        }
    }
              //Code got from react native documentation https://reactnativeelements.com/docs/input
              //Inputs allow the user to enter text into the UI.
              //The "set" function used below allows the text entered into the input in the UI by the user to be set to the value 
              //of the name, email etc.
    return (
        <MyView>
            <Card>
                <Input onChangeText={text => setName(text)} value={name} label='Name'/> 
                <Input onChangeText={text => setAddress1(text)} value={address1} label='Address 1'/>
                <Input onChangeText={text => setAddress2(text)} value={address2} label='Address 2'/>
                <Input onChangeText={text => setTown(text)} value={town} label='Town'/>
                <Input onChangeText={text => setCounty(text)} value={county} label='County'/>
                <Input onChangeText={text => setEmail(text)} value={email} keyboardType="email-address" label='Email Address'/>
                <Input onChangeText={text => setPhoneNum(text)} value={phoneNum} keyboardType="numeric" label='Phone Number'/>
                <Input onChangeText={text => setPassword1(text)} value={password1} secureTextEntry={true} label='Password'/>
                <Input onChangeText={text => setPassword2(text)} value={password2} secureTextEntry={true} label='Password 2'/>
                <Card.Title onPress={() => navigation.navigate("Login")}>
                    <Text>Back To Login</Text>            
                </Card.Title>
                <Button onPress={handleAddGym} title="Register Gym" />   
            </Card>  
            <Text 
                style={{color: "white", textAlign: "center", color: "white", marginTop: 25}} 
                onPress={() => navigation.navigate("Login")}
            >
                Click <Text style={{fontWeight: "bold", color: "white"}}>here</Text> to register as user.
            </Text>
            <View style={{height: 25}}/>
        </MyView>  
    )
}

export default RegisterGym