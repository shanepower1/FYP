import React, { useState } from "react"
import { Text, Input, Card, Button } from "react-native-elements"
import MyView from "components/MyView"
import { addClass } from "functions/database"
import { useNavigation } from '@react-navigation/native'
import { auth } from "../firebase"

function AddClass() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    const navigation = useNavigation() // Only screen components receive navigation as a prop. 

    function handleAdd() {
        addClass(auth.currentUser.uid, name, description)
            .then(() => {
                navigation.navigate("Classes")
            }).catch(error => {
                alert(error.message)
            })
    }

    return (
        <MyView>
            <Card>
                <Input onChangeText={text => setName(text)} value={name} label='Name'/> 
                <Input onChangeText={text => setDescription(text)} value={description} label='Description'/> 
                <Button title="Add Class" onPress={handleAdd} />
            </Card>   
        </MyView>   
    )
}

export default AddClass