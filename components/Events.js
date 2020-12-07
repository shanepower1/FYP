import React, { useState, useEffect } from "react"
import { db } from "../firebase"
import { Card, ListItem, Avatar } from "react-native-elements"
import { Button, View } from "react-native"
import Event from "./Event"

function Events({ navigation }) {
    console.log("hello")

    return (
        <View>
            <Button title="Add Event" onPress={() => navigation.navigate("Add Event")} />
        </View>
    )
}

export default Events