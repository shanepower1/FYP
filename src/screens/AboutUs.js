import React, { useState, useEffect } from "react"
import MyView from "components/MyView"
import { Text, Card } from "react-native-elements"
import { useAuth } from "components/AuthContext"
import { getGym } from "functions/database"

function AboutUs() {
    const { gymId } = useAuth()

    const [name, setName] = useState("")
    const [address, setAddress] = useState("") 
    const [number, setNumber] = useState("")
    const [openingHours, setOpeningHours] = useState("")

    useEffect(() => {
        getGym(gymId)
            .then(gym => {
                setName(gym.name)
                let address2 = gym.address2!="" ? gym.address2 + "," : ""
                setAddress(`${gym.address1}, ${address2}${gym.town}, ${gym.county}`)  
                setNumber(gym.phoneNum)
                setOpeningHours(gym.openingHours)
            }).catch()
    }, [])

    return (
        <MyView>
            <Card>
                <Card.Title>Gym Details</Card.Title>
                <Text>{name}</Text>
                <Text>{address}</Text>
                <Text>{number}</Text>
            </Card>
            <Card>
                <Card.Title>Opening Hours</Card.Title>
                <Text>{openingHours}</Text>
            </Card>
        </MyView>
    )    
}

export default AboutUs