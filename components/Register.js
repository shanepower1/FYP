import React from "react"
import { Button ,Input, Card} from "react-native-elements"





function Register() { 
  
//Code got from react native documentation https://reactnativeelements.com/docs/input
    return (

      <Card>
        
            <Input placeholder="First Name"/>
            <Input placeholder="Second Name"/>
            <Input placeholder="Address"/>
            <Input placeholder="Phone Number"/>
            <Input placeholder="Password"/>
            <Button title="Register"/> 

            </Card>
              )
            }
  
export default Register