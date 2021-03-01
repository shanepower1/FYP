import React, {useState, useEffect} from "react"
import { auth } from "../firebase"
import Events from "screens/Events"
import GymList from "screens/GymList"

// https://reactjs.org/docs/hooks-state.html
// React keeps track of these variables. If they are changed, any part of the UI uses these values will also be updated without having to refresh the page. 
// "set" function is used to update the state in the future when changed.
// https://www.youtube.com/watch?v=1FiIYaRr148 . I found this youtube video explained the concept very well.  
function UserHome({navigation}) {
    const [showEvents, setShowEvents] = useState(false)

    useEffect(() => {
        if(auth.currentUser.gymId != null) {
            setShowEvents(true)
        }
    }, [])

    return (
        <>
            {
                showEvents ? <Events /> : <GymList showEvents={setShowEvents}/>
            }
        </>
    )
}

export default UserHome