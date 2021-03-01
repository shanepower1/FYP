import React, { useState, useEffect } from "react"
import { Text, Card } from "react-native-elements"
import MyView from "components/MyView"
import { getGym } from "functions/database"
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
    return (
        <MyView>
            <Card>
                <Text>ID: {id}</Text>
                <Text>Name: {name}</Text>
                <Text>Address1: {address1}</Text>
                {address2=="" ? null : <Text>{address2}</Text>}
                <Text>Town: {town}</Text>
                <Text>County: {county}</Text>
            </Card>
        </MyView>     
    )
}

export default UpdateGym