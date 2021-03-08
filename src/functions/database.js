import { db } from "../firebase"
import { formatDate, formatTime } from "functions/helpers"

// Users.
export async function getUser(userId) {
    try {
        let doc = await db.collection("users").doc(userId).get()
        let user = doc.data()
        console.log(user)
        user.id = doc.id
        return user
    } catch(error) {
        alert(`location: database.js\n\nfunction: getUser(userId: ${userId})\n\nMessage: ` + error.message)
    }
}

export async function addUser(id, userType) {
    await db.collection("users").doc(id).set({
        type: userType
    })
} 

export async function joinGym(userId, gymId) {
    try {
        await db.collection("users").doc(userId).update({
            gymId: gymId
        })
    } catch(error) {
        alert("DB - Join Gym: " + error.message)
    }
}

// Gyms.
export async function getGym(id) {
    try {
        let doc = await db.collection("gyms").doc(id).get()
        let gym = doc.data()
        gym.id = doc.id
        return gym 
    } catch(error){
        alert("DB - Get Gym: " + error.message)
    }
}

export async function getGyms() {
    try {
        let docs = await db.collection("gyms").get()
        let gymList = []
        docs.forEach(doc => {
            let gym = doc.data()
            gym.id = doc.id
            gymList.push(gym)
        })

        return gymList
    } catch(error) {
        alert("DB - Get Gyms: " + error.message)
    }  
}

export async function addGym(name, address1, address2, town, county, ownerId) {
    await db.collection("gyms").doc(ownerId).set({
        name: name,
        address1: address1,
        address2: address2,
        town: town,
        county: county,
        ownerId: ownerId
    }) 
}

// Events.
export async function addEvent(name, location, date, info, gymId) {
    await db.collection("events").doc().set({
        name: name,
        location: location,
        date: date,
        info: info,
        gymId: gymId
    })
}

export async function getEvents(gymId) {
    if(gymId != null) {
        var docs = await db.collection("events").where("gymId", "==", gymId).get()
    } else {
        var docs = await db.collection("events").get()
    }
    
    if(docs.empty) {
        return []
    }

    let events = []
    docs.forEach(doc => {
        let event = doc.data()
        event.id = doc.id
        event.formattedDate = formatDate(event.date.toDate())
        event.formattedTime = formatTime(event.date.toDate())
        events.push(event)
    }) 

    return events
}

export async function deleteEvent(id) {
    try {
        await db.collection("events").doc(id).delete()
    } catch(error) {
        alert("DB - Delete Event: " + error.message)
    }  
}

