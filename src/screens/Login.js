import React, {useState} from "react"
import { Image, View } from "react-native"
import { Button, Input, Card, Text } from "react-native-elements"
import MyView from "components/MyView"
/* import { useStore } from "src/Main" */
import { auth } from "src/firebase"

function Login({navigation}) {
    // https://reactjs.org/docs/hooks-state.html
    // React keeps track of these variables. If they are changed, any part of the UI uses these values will also be updated without having to refresh the page. 
    // "set" function is used to update the state in the future when changed.
    // https://www.youtube.com/watch?v=1FiIYaRr148 . I found this youtube video explained the concept very well.
     
    // User login for testing
    const [email, setEmail] = useState("jimmyryan@gmail.com")
    const [password, setPassword] = useState("password123")  

    // Gym login for testing
    //const [email, setEmail] = useState("cashelgym@gmail.com")
   //const [password, setPassword] = useState("password1")  

    const [isLoading, setIsLoading] = useState(false) //Loading feature when button to sign in is clicked

    // https://firebase.google.com/docs/auth/web/password-auth
    function signIn(){

        setIsLoading(true) //loading feature will appear
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                setIsLoading(false)
            }).catch(error => {
                setIsLoading(false)
                alert(error.message)
            })  

            //alert(`Name: ${currentUser.name}\nType: ${currentUser.type}`)
    }
    
    //Code got from react native documentation https://reactnativeelements.com/docs/input
    //Inputs allow the user to enter text into the UI.
    //The "set" function used below allows the text entered into the input in the UI by the user to be set to the value 
    //of the email and password variables.
    return (
        <MyView background="#2F0B29">
            <Image source={require("assets/gymconnect.png")} height={200} style={{marginTop: 25, marginBottom: 25, marginLeft: "auto", marginRight: "auto"}}/>
            <View style={{backgroundColor: "#2F0B29", marginLeft: 25, marginRight: 25, elevation: 4}} >
                <Input 
                    label="Email" 
                    value={email} 
                    onChangeText = {text => setEmail(text)}
                    style={{color: "white"}}

                />
                <Input style={{color: "white"}} label="Password" value={password} onChangeText={text => setPassword(text)} secureTextEntry={true}/>
                    <Button title="Login" onPress={signIn} loading={isLoading}
                /> 
            </View>
            <Text 
                style={{color: "white", textAlign: "center", color: "white", marginTop: 25}} 
                onPress={() => navigation.navigate("Register")}
            >
                Click <Text style={{fontWeight: "bold", color: "white"}}>here</Text> to create an account.
            </Text>
        </MyView>
    )
}
  
export default Login

