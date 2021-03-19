import React, {useState, useEffect} from "react"
import { TouchableOpacity, View, Image } from "react-native"
import { Input, ListItem, Text, Card } from "react-native-elements"
import { Alert } from "react-native"
import MyView from "components/MyView"
import { getGyms, getUser, joinGym, getGym } from "functions/database"
import { useAuth } from "components/AuthContext"
import { FontAwesome } from '@expo/vector-icons'; 


// https://reactjs.org/docs/hooks-state.html
// React keeps track of these variables. If they are changed, any part of the UI uses these values will also be updated without having to refresh the page. 
// "set" function is used to update the state in the future when changed.
// https://www.youtube.com/watch?v=1FiIYaRr148 . I found this youtube video explained the concept very well.  
function GymList() {
    const [gyms, setGyms] = useState([])
    const [filteredGyms, setFilteredGyms] = useState([])
    const [search, setSearch] = useState("")

    const { setGymName, userId, setGymId } = useAuth()

    // Runs once when the component is loaded. 
    //https://reactjs.org/docs/hooks-effect.html
    useEffect(() => {
        getGyms()
            .then(gyms => {
                setGyms(gyms)
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

    function handleJoinGym(gymId, gymName) {
        joinGym(userId, gymId)
            .then(() => {
                setGymId(gymId)
                setGymName(gymName) 
            }).catch(error => {
                alert(error.message)
            })
    }

    function joinAlert(gymId, gymName) {
        Alert.alert(
          gymName,
          'Do you want to join?',
          [
            {
              text: 'Cancel',
              style: 'cancel'
            },
            { text: 'Join', onPress: () => handleJoinGym(gymId, gymName) }
          ],
          { cancelable: false }
        );
    }

    return (
        <>
            {
                <MyView background="#2F0B29">
                    <Image source={require("assets/gymconnect.png")} height={200} style={{marginTop: 25, marginBottom: 25, marginLeft: "auto", marginRight: "auto"}}/>
                    <Input 
                        leftIcon={
                            <View style={{paddingRight: 10}}>
                                <FontAwesome name="search" size={24} color="white" style={{marginTop: 7}}  />
                            </View> 
                        } 
                        placeholderTextColor="lightgrey" 
                        onChangeText={text => setSearch(text)} 
                        value={search} placeholder='First lets search for your gym' 
                        style={{color: "white", marginTop: 10}}
                    /> 
                    <View>
                        {
                            // .map loops through the filteredGyms. 
                            // https://reactnativeelements.com/docs/listitem/
                            // Below is the infomration displayed on the gyms when searched for in the search bar
        
                            filteredGyms.map(item => (
                                <TouchableOpacity key={item.id} onPress={() => joinAlert(item.id, item.name)}>
                                    <ListItem bottomDivider containerStyle={{backgroundColor: "#00000000"}}>
                                        <ListItem.Content>
                                            <ListItem.Title>
                                                <Text style={{color: "white"}}>{item.name}</Text>                      
                                            </ListItem.Title>
                                            <ListItem.Subtitle>
                                                <Text style={{color: "white"}}>{item.address1.trim()}{item.address2=="" ? "" : ","}{item.address2}, {item.town}, {item.county}</Text>
                                            </ListItem.Subtitle>
                                        </ListItem.Content> 
                                        <ListItem.Chevron color="white" size={25}/>
                                    </ListItem>        
                                </TouchableOpacity>             
                            ))  
                        }    
                    </View>   
                </MyView>
            }
        </>
    )
}

export default GymList