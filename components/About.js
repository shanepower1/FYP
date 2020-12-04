import React from "react"
import { Button, Input, Card, SocialIcon, Header} from "react-native-elements"


function About() {
    return (

        //Code got from react native documentation https://reactnativeelements.com/docs/input

        <Card>

            <SocialIcon
             type='twitter'/>
              <SocialIcon
             type='facebook'/>
              <SocialIcon
             type='instagram'/>
           
            <Input placeholder="Email"/>
            <Input placeholder="Password"/>
            <Button title="Login"/>
                 
                          
        </Card>

    )
}
  

export default About