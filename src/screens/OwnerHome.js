import React from "react"
import { Text, Card } from "react-native-elements"
import MyView from "components/MyView"

function OwnerHome() {
    return (
        <MyView>
            <Card>
                <Text>You are signed in as an owner</Text>
            </Card>
        </MyView>
    )
}

export default OwnerHome