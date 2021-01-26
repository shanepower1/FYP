import React from "react"
import { Card, Text } from "react-native-elements"
import MyView from "../components/MyView"


function Community() {
    return (
        <MyView>
           <Card containerStyle={{backgroundColor: "blue", color: "white", height: 150}}>
               <Text>Online Meeting</Text>
            </Card>
           <Card containerStyle={{backgroundColor: "red", color: "white", height: 150}}>
               <Text>Tips</Text>       
            </Card>
           <Card containerStyle={{backgroundColor: "yellow", color: "white", height: 150}}>
               <Text>other</Text>
            </Card>                                  
        </MyView>
    )
}
  

export default Community