import React, {useState, useEffect} from "react"
import { db, auth } from "../firebase"
import { Card, ListItem, Text, SearchBar, Button, Input} from "react-native-elements"
import { View, StyleSheet, TouchableOpacity, Image, Alert } from "react-native"
import MyView from "../components/MyView"
import Events from "./Events"

// https://reactjs.org/docs/hooks-state.html
// React keeps track of these variables. If they are changed, any part of the UI uses these values will also be updated without having to refresh the page. 
// "set" function is used to update the state in the future when changed.
// https://www.youtube.com/watch?v=1FiIYaRr148 . I found this youtube video explained the concept very well.  
function GymList({navigation, route}) {
    const [gyms, setGyms] = useState([])
    const [filteredGyms, setFilteredGyms] = useState([])
    const [search, setSearch] = useState("")
    const [showEvents, setShowEvents] = useState(false)
    const [selectedGymId, setSelectedGymId] = useState([])
    // Runs once when the component is loaded. 
    //https://reactjs.org/docs/hooks-effect.html
    useEffect(() => {
        getGyms()

        db.collection("users").doc(auth.currentUser.uid).get()
            .then(doc => {
                if(doc.data().gymId == null) {
                    setShowEvents(false)
                } else {
                    setShowEvents(true)
                    setSelectedGymId(doc.data().gymId)
                }
            })
    }, [])

    // Runs once when component is loaded and every time the search variable changes.
    //https://reactnativeelements.com/docs/searchbar/
    useEffect(() => {
        if(search.length < 1) { //If there is nothing entered into the search bar no list of registered gyms will appear.
            setFilteredGyms([])
        } else {
            let tempSearch = search.toLowerCase() //tempSearch is what the user will be entering
            let result = gyms.filter(gym =>       //Result will be the gym displayes to the user if it ,atches the below conditions
               gym.name.toLowerCase().includes(tempSearch) //if the name entered into the search bar matches that off a gym in the db it will appear
            || gym.address1.toLowerCase().includes(tempSearch)//if the address entered into the search bar matches that off a gym in the db it will appear 
            || gym.address2.toLowerCase().includes(tempSearch))//if the address entered into the search bar matches that off a gym in the db it will appear
            || gym.town.toLowerCase().includes(tempSearch)//if the  town into the search bar matches that off a gym in the db it will appear
            || gym.county.toLowerCase().includes(tempSearch)//if the county entered into the search bar matches that off a gym in the db it will appear
    
            setFilteredGyms(result)
        }
    }, [search]) 

    //Retrieving the gyms that are saved in the db
    // Creating an empty array called tempList to store the information on the gym retrieved.
    function getGyms() {
        db.collection("gyms").get()
            .then(docs => {
                let tempList = [] //Creating empty array to store the properly formatted information retrieved.
                docs.forEach(doc => {
                    let temp = doc.data() 
                    temp.id = doc.id // Creating new field inside temp called id with the document id.
                    tempList.push(temp)
                })
                setGyms(tempList)
            })
    } 

    function joinGym(gymId) {
        db.collection("users").doc(auth.currentUser.uid).update({
            gymId: gymId
        }).then(() => {
            setShowEvents(true)
            alert("Success")
        }).catch(error => {
            error.message
        })
    }

    function joinAlert(gymName, gymId) {
        Alert.alert(
          gymName,
          'Do you want to join?',
          [
            {
              text: 'Cancel',
              style: 'cancel'
            },
            { text: 'Join', onPress: () => joinGym(gymId) }
          ],
          { cancelable: false }
        );
      }
    
    return (
        <MyView>
            {
                showEvents 
                ?
                <Events gymId={selectedGymId}/>
                :
                <>
                <Input onChangeText={text => setSearch(text)} value={search} placeholder='Search' style={{color: "white"}} /> 
                {
                    // .map loops through the filteredGyms. 
                    // https://reactnativeelements.com/docs/listitem/
                    // Below is the infomration displayed on the gyms when searched for in the search bar

                    filteredGyms.map(gym => (
                        <TouchableOpacity onPress={() => joinAlert(gym.name, gym.id)}>
                            <ListItem key={gym.id} bottomDivider containerStyle={{backgroundColor: "#2F0B29"}}>
                                <ListItem.Content>
                                    <ListItem.Title>
                                        <Text style={{color: "white"}}>{gym.name}</Text>                      
                                    </ListItem.Title>
                                    <ListItem.Subtitle>
                                        <Text style={{color: "white"}}>{gym.address1.trim()}{gym.address2=="" ? "" : ","}{gym.address2}, {gym.town}, {gym.county}</Text>
                                    </ListItem.Subtitle>
                                </ListItem.Content> 
                            </ListItem>        
                        </TouchableOpacity>             
                    ))  
                }
                </>
            }
            

            
        </MyView> 
    )
}




export default GymList