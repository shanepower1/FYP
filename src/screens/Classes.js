import React from "react"
import { Text, Card, Button, Input } from "react-native-elements"
import MyView from "components/MyView"

function Classes() {

    return (
        <MyView>
            <Card>
                <Text>Yoga</Text>
                <Text>Classes</Text>
                <Text>Classes</Text>
                <Button title="Edit" />
            </Card>
            <Text style={{color: "white"}}>Class Dates</Text>
            <Card>
                <Text>Yoga</Text>
                <Text>Classes</Text>
            </Card>      
            <Card>
                <Text>Yoga</Text>
                <Text>01/03/21</Text>
            </Card>   
            <Card>
                <Text>Yoga</Text>
                <Text>01/03/21</Text>
            </Card>   
            <Card>
                <Text>Yoga</Text>
                <Text>01/03/21</Text>
            </Card>     
            <Card>
                <Text>Yoga</Text>
                <Text>01/03/21</Text>
            </Card>
            <Card>
                <Input placeholder="Date" />
                <Button title={"Add Class"}/>   
            </Card>  
        </MyView>
    )
}

export default Classes