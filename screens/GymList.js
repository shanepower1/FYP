import React, {useState, useEffect} from "react"
import { db } from "../firebase"
import { Card, ListItem, Avatar, Text, SearchBar, Button, Input} from "react-native-elements"
import { View, Picker, StyleSheet, TouchableOpacity } from "react-native"
import MyView from "../components/MyView"

function GymList({navigation, route}) {
    const [gyms, setGyms] = useState([])
    const [filteredGyms, setFilteredGyms] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        getGyms()
    }, [])

    useEffect(() => {
        if(search.length < 1) {
            setFilteredGyms([])
        } else {
            let tempSearch = search.toLowerCase()
            let result = gyms.filter(gym => 
               gym.name.toLowerCase().includes(tempSearch) 
            || gym.address1.toLowerCase().includes(tempSearch) 
            || gym.address2.toLowerCase().includes(tempSearch))
            || gym.town.toLowerCase().includes(tempSearch)
            || gym.county.toLowerCase().includes(tempSearch)
    
            setFilteredGyms(result)
        }
       
    }, [search])

    function getGyms() {
        db.collection("gyms").get()
            .then(docs => {
                let tempList = []
                docs.forEach(doc => {
                    let temp = doc.data()
                    temp.id = doc.id
                    tempList.push(temp)
                })
                setGyms(tempList)
            })
    } 

    return (
        <MyView>
            <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 20, marginBottom: 20}}>
                <Button title="Register Your Gym" onPress={() => navigation.navigate("Register Gym")} style={{width: 200}}/>
                <Button title="Login" onPress={() => navigation.navigate("Login")} style={{width: 200}}/>
            </View>
            <Input onChangeText={text => setSearch(text)} value={search} placeholder='Search' style={{color: "white"}} /> 
            {
                // .map loops through the filteredEvents. 
                // https://reactnativeelements.com/docs/listitem/
                filteredGyms.map(gym => (
                    <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                        <ListItem key={gym.id} bottomDivider containerStyle={{backgroundColor: "#2F0B29"}}>
                            <ListItem.Content>
                                <ListItem.Title>
                                    <Text style={{color: "white"}}>{gym.name}</Text>                      
                                </ListItem.Title>
                                <ListItem.Subtitle>
                                    <Text style={{color: "white"}}>{gym.address1.trim()}{gym.address1=="" ? "," : ""}{gym.address2}, {gym.town}, {gym.county}</Text>
                                </ListItem.Subtitle>
                            </ListItem.Content> 
                        </ListItem>        
                    </TouchableOpacity>             
                ))  
            }
        </MyView> 
    )
}



export default GymList