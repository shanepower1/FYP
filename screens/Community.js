import React from "react"
import { Card, Text } from "react-native-elements"
import {StyleSheet, Image} from "react-native"
import MyView from "../components/MyView"
import { SafeAreaView } from "react-native"


function Community() {
    return (

       //This will link to other features of the app but at the moment it is just currently for design purpose allowing me visualise
       //how I want the app to look
        <MyView>
           <Card containerStyle={{backgroundColor: "#EE4036", color: "white", height: 150}}>
               <Text style={styles.text}>Social Network</Text>
            </Card>
           <Card containerStyle={{backgroundColor: "#FAAF40", color: "white", height: 150}}>
               <Text style={styles.text}>Search for a friend</Text>       
            </Card>  
            <Image source={require('../assets/logo.png')}/>                 
        </MyView>
    
    )
}
  

export default Community
const styles = StyleSheet.create({
    text:{
        color:"white"
    }
});