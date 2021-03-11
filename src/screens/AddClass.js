import React, { useState, useEffect } from "react"
import { Text, Input, Card, Button, Image } from "react-native-elements"
import MyView from "components/MyView"
import { addClass } from "functions/database"
import { useNavigation } from '@react-navigation/native'
import { auth } from "../firebase"
import MyImagePicker from "components/MyImagePicker"
import { uploadImage } from "functions/storage"

function AddClass() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [numSpaces, setNumSpaces] = useState("")


    const navigation = useNavigation() // Only screen components receive navigation as a prop. 

    const [image, setImage] = useState(null);

    // code acquired from the following: https://medium.com/@wcandillon/uploading-images-to-firebase-with-expo-a913c9f8e98d


    function handleAdd() {
        addClass(auth.currentUser.uid, name, description, image)
            .then(ref => {
                uploadImage("classes", ref.id, image) // adding image to uploaded room
                navigation.navigate("Classes") 
            }).catch(error => {
                alert(error.message)
            })
    }

    return (
        <MyView>
            <Card>
                <Input onChangeText={text => setName(text)} value={name} label='Name'/> 
                <Input onChangeText={text => setDescription(text)} value={description} multiline={true} label='Description'/> 
                <Input label="Spaces Available" onChangeText={text => setNumSpaces(text)} value={numSpaces} keyboardType="numeric"/> 
                <MyImagePicker image={image} setImage={setImage}/>
                <Button title="Add Class" onPress={handleAdd} buttonStyle={{marginTop: 20}} />
            </Card>   
        </MyView>   
    )
}

export default AddClass