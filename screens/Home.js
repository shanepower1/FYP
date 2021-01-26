import React from "react"
import { ScrollView } from "react-native"
import { Card, Text } from "react-native-elements"
import MyView from "../components/MyView"

function Home() {
    return (
        <MyView>        
            <Card>
                <Text>Welcome</Text>
            </Card>
        </MyView>
    )
}
  

export default Home