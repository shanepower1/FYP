import { db } from "../firebase"
import { formatDate, formatTime } from "functions/helpers"
import { uploadImage } from "functions/storage"

// Users.
export async function getUser(userId) {
    let doc = await db.collection("users").doc(userId).get()
    let user = doc.data()
    user.id = doc.id
    return user
}

export async function addUser(id, name, userType, gymId) {
    await db.collection("users").doc(id).set({
        name: name,
        type: userType,
        gymId: gymId
    })
} 

export async function joinGym(userId, gymId) {
    await db.collection("users").doc(userId).update({
        gymId: gymId
    })
}

// Gyms.
export async function getGym(id) {
    let doc = await db.collection("gyms").doc(id).get()
    let gym = doc.data()
    gym.id = doc.id
    return gym 
}

export async function getGyms() {
        let docs = await db.collection("gyms").get()
        let gymList = []
        docs.forEach(doc => {
            let gym = doc.data()
            gym.id = doc.id
            gymList.push(gym)
        })

        return gymList
}

export async function addGym(name, address1, address2, town, county, phoneNum, ownerId) {
    await db.collection("gyms").doc(ownerId).set({
        name: name,
        address1: address1,
        address2: address2,
        town: town,
        county: county,
        ownerId: ownerId,
        phoneNum: phoneNum
    }) 
}

export async function updateGym(gymId, name, address1, address2, town, county, openingHours) {
    await db.collection("gyms").doc(gymId).update({
        name: name,
        address1: address1,
        address2: address2,
        town: town,
        county: county,
        openingHours: openingHours
    })  
}

// Events.
export async function addEvent(name, location, date, info, gymId) {
    let ref = await db.collection("events").add({
        name: name,
        location: location,
        date: date,
        info: info,
        gymId: gymId
    })

    return ref
}

export async function getEvent(eventId) {
    let doc = await db.collection("events").doc(eventId).get()

    let event = doc.data()
    event.id = doc.id
    event.date = event.date.toDate()

    return event
}

export async function getEvents(gymId) {
    if(gymId != null) {
        var docs = await db.collection("events").where("gymId", "==", gymId).get()
    } else {
        var docs = await db.collection("events").get()
    }
    
    if(docs.empty) return []

    let events = []
    docs.forEach(doc => {
        let event = doc.data()
        event.id = doc.id
        event.date = doc.data().date.toDate()
        events.push(event)
    }) 

    return events
}

export async function deleteEvent(id) {
    await db.collection("events").doc(id).delete()
}

// Classes.
export async function addClass(gymId, name, description, category) {
    let ref = await db.collection("classes").add({
        gymId: gymId,
        name: name,
        description: description,
        category: category
    })

    return ref
}

export async function getClass(id) {
    let doc = await db.collection("classes").doc(id).get()

    let classInfo = doc.data()
    classInfo.id = doc.id

    return classInfo
}

export async function getClasses(gymId) {
    let docs = await db.collection("classes").where("gymId", "==", gymId).get()

    if(docs.empty) return []

    let classes = []

    docs.forEach(doc => {
        let temp = doc.data()
        temp.id = doc.id
        classes.push(temp)
    })

    return classes
}

export async function deleteClass(classId) {
    await db.collection("classes").doc(classId).delete()
}

// Schedule
export async function getSchedule(classId) {
    let docs = await db.collection("schedule").where("classId", "==", classId).orderBy("date", "asc").get()

    if(docs.empty) return []

    let schedule = []

    docs.forEach(doc => {
        let temp = doc.data()
        temp.id = doc.id
        temp.date = temp.date.toDate()
        schedule.push(temp)
    })

    return schedule
}

export async function addScheduledClass(gymId, classId, date) {
    await db.collection("schedule").doc().set({
        gymId: gymId,
        classId: classId,
        date: date,
        bookings: []
    })
}

export async function getScheduledClass(id) {
    let doc = await db.collection("schedule").doc(id).get()

    let info = doc.data()
    info.id = doc.id
    info.date = info.date.toDate()

    return info
}

// Gets list of bookings from a scheduled class, checks if user has already booked, if not adds their id to bookings arrray.
export async function bookClass(scheduleId, userId) {
    let scheduledClass = await getScheduledClass(scheduleId)

    let bookings = scheduledClass.bookings

    if(!bookings.includes(userId)) {
        bookings.push(userId)

        await db.collection("schedule").doc(scheduleId).update({
            bookings: bookings
        })
    } else {
        alert("Class already booked")
    }
}

export async function deleteSchedule(id) {
    await db.collection("schedule").doc(id).delete()
}
