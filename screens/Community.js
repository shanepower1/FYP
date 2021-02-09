import React from "react"
import { Card, Text } from "react-native-elements"
import {StyleSheet} from "react-native"
import MyView from "../components/MyView"


function Community() {
    return (
        <MyView>
           <Card containerStyle={{backgroundColor: "#EE4036", color: "white", height: 150}}>
               <Text style={styles.text}> Online Meeting</Text>
            </Card>
           <Card containerStyle={{backgroundColor: "#262261", color: "white", height: 150}}>
               <Text style={styles.text}>Meet a friend</Text>       
            </Card>
           <Card containerStyle={{backgroundColor: "#FAAF40", color: "white", height: 150}}>
               <Text style={styles.text}>Q&A</Text>
            </Card>                                  
        </MyView>
    )
}
  

export default Community
const styles = StyleSheet.create({
    text:{
        color:"white"
    }
});