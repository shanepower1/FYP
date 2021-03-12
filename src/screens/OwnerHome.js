import React from "react"
import { Text, Card } from "react-native-elements"
import MyView from "components/MyView"

function OwnerHome() {
    return (
        <MyView>
            <Card>
                <Text>Admin Dashboard</Text>
            </Card>
            <Card>
                <Text>Total Number Of Members: </Text>
            </Card>
            <Card>
                <Text>Total Number Of Classes</Text>
            </Card>

     
        </MyView>
    )
}

export default OwnerHome