import React, { useState, useEffect } from "react"
import { Text, Card, Button, Input } from "react-native-elements"
import MyView from "components/MyView"
import { getGym, updateGym } from "functions/database"
import { auth } from "../firebase"

function UpdateGym() {
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [address1, setAddress1] = useState("")
    const [address2, setAddress2] = useState("")
    const [town, setTown] = useState("")
    const [county, setCounty] = useState("")

    useEffect(() => {
        getGym(auth.currentUser.uid).then(gym => {
            setId(gym.id)
            setName(gym.name)
            setAddress1(gym.address1)
            setAddress2(gym.address2)
            setTown(gym.town)
            setCounty(gym.county)
        })
    }, [])

    function update() {
        updateGym(id, name, address1, address2, town, county)
            .then(() => {
                alert("Success!")
            }).catch(error => {
                alert(error.message)
            })
    }

    return (
        <MyView>
            <Card>
                <Input onChangeText={text => setName(text)} value={name} label='Name'/> 
                <Input onChangeText={text => setAddress1(text)} value={address1} label='Address 1'/> 
                <Input onChangeText={text => setAddress2(text)} value={address2} label='Address 2'/> 
                <Input onChangeText={text => setTown(text)} value={town} label='Town'/> 
                <Input onChangeText={text => setCounty(text)} value={county} label='County'/> 
                <Button title="Update" onPress={update}/>
            </Card>
        </MyView>     
    )
}

export default UpdateGym