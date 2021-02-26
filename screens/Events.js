import React from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import { Card, Text } from "react-native-elements"
import MyView from "../components/MyView"



function Events({navigation}) {
   // const [gymName, setGymName] = useState("Gym Name") 
    
    const height = 200
    // https://reactnative.dev/docs/touchableopacity
    // https://reactnavigation.org/docs/params/

/*     useEffect(() => {
        db.collection("gyms").doc(gymId).get().then(doc => {
            setGymName(doc.data().name)
        })
    }, [])  */

    return (
        <MyView>  
           
            <TouchableOpacity onPress={() => navigation.navigate("Events", {type: "timetable"})}>
                <Card containerStyle={{backgroundColor: "#EE4036", height: height}}>
                    <Text style={styles.text}>Timetable</Text>
                </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Events", {type: "classes"})}>
                <Card containerStyle={{backgroundColor: "#262261", height: height}}>     
                    <Text style={styles.text}>View Our Available Classes</Text>
                </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Events", {type: "upcoming" })}>
                <Card containerStyle={{backgroundColor: "#FAAF40", height: height}}>
                    <Text style={styles.text}>See Some Of Our Upcoming Events</Text>
                </Card>
            </TouchableOpacity>
        </MyView>
    )
}

export default Events

const styles = StyleSheet.create({
    text: {
        color: "white"
    }
});



  