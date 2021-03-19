import React, { useState, useEffect } from "react"
import { Text, Input, Card, Button, Image, CheckBox } from "react-native-elements"
import MyView from "components/MyView"
import { addClass } from "functions/database"
import { useNavigation } from '@react-navigation/native'
import { auth } from "../firebase"
import MyImagePicker from "components/MyImagePicker"
import { uploadImage } from "functions/storage"
import { useAuth } from "components/AuthContext"

function AddClass() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [numSpaces, setNumSpaces] = useState("")
    const [isBalanceChecked, setIsBalanceChecked] = useState(false)
    const [isEnduranceChecked, setIsEnduranceChecked] = useState(false)
    const [isStrengthChecked, setIsStrengthChecked] = useState(false)
    const [category, setCategory] = useState(null)

    const navigation = useNavigation() // Only screen components receive navigation as a prop. 
    const { userId } = useAuth()

    const [image, setImage] = useState(null)

    // code acquired from the following: https://medium.com/@wcandillon/uploading-images-to-firebase-with-expo-a913c9f8e98d



    function handleAdd() {
        if(!category) {
            alert("Please select a category")
            return
        }

        addClass(userId, name, description, category)
            .then(ref => {
                uploadImage("classes", ref.id, image).catch(error => {}) // adding image to uploaded room
                navigation.navigate("Classes") 
            }).catch(error => {
                alert(error.message)
            })
    }

    function handleChecked(option) {
        setIsBalanceChecked(false)
        setIsEnduranceChecked(false)
        setIsStrengthChecked(false)

        switch(option) {
            case "endurance": 
                setIsEnduranceChecked(true)
                setCategory("Endurance")
                break
            case "strength": 
                setIsStrengthChecked(true)
                setCategory("Strength")
                break
            case "balance": 
                setIsBalanceChecked(true)
                setCategory("Balance")
                break
        }
    }


    return (
        <MyView>
            <Card>
                <Input onChangeText={text => setName(text)} value={name} label='Name'/> 
                <Input onChangeText={text => setDescription(text)} value={description} multiline={true} label='Description'/> 
                <Input label="Spaces Available" onChangeText={text => setNumSpaces(text)} value={numSpaces} keyboardType="numeric"/> 
                <MyImagePicker image={image} setImage={setImage}/>
                <CheckBox
                    title='Endurance'
                    checked={isEnduranceChecked}
                    onPress={() => handleChecked("endurance")}
                />
                <CheckBox
                    title='Strength'
                    checked={isStrengthChecked}
                    onPress={() => handleChecked("strength")}
                />
                <CheckBox
                    title='Balance / Flexibility'
                    checked={isBalanceChecked}
                    onPress={() => handleChecked("balance")}
                />
                <Button title="Add Class" onPress={handleAdd} buttonStyle={{marginTop: 20}} />
            </Card>   
        </MyView>   
    )
}

export default AddClass