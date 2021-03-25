import { db, auth } from "../firebase";

// Gets a user document from the database.
export async function getUser(userId) {
  // Looks in the users collection and retrieves doc with id of userId.
  let doc = await db.collection("users").doc(userId).get();

  // Creates new variable and adds data from the result.
  let user = doc.data();

  // Creates a field in user called id with the id of the document which is the same as the userId.
  user.id = doc.id;
  return user;
}

// Adds a user to the database.
export async function addUser(id, name, userType, gymId) {
  // Adds a document to the users collection with the passed in id and values.
  await db.collection("users").doc(id).set({
    name: name,
    type: userType,
    gymId: gymId,
    schedule: [],
  });
}

// Updates gymId field in userDocument with the id of the gym they joined.
export async function joinGym(userId, gymId) {
  await db.collection("users").doc(userId).update({
    gymId: gymId,
  });
}

// Retrieves gym document from database.
export async function getGym(id) {
  let doc = await db.collection("gyms").doc(id).get();
  let gym = doc.data();
  gym.id = doc.id;
  return gym;
}

// Gets all gym documents from database.
export async function getGyms() {
  let docs = await db.collection("gyms").get();
  let gymList = []; // Empty array to store gym objects.

  // Loops through documents retrieved from database and pushes them onto GymList.
  docs.forEach((doc) => {
    let gym = doc.data();
    gym.id = doc.id;
    gymList.push(gym);
  });

  return gymList;
}

// Adds a gym document to the database.
export async function addGym(
  name,
  address1,
  address2,
  town,
  county,
  phoneNum,
  ownerId
) {
  await db.collection("gyms").doc(ownerId).set({
    name: name,
    address1: address1,
    address2: address2,
    town: town,
    county: county,
    ownerId: ownerId,
    phoneNum: phoneNum,
  });
}

// Updates gym document.
export async function updateGym(
  gymId,
  name,
  address1,
  address2,
  town,
  county,
  openingHours
) {
  await db.collection("gyms").doc(gymId).update({
    name: name,
    address1: address1,
    address2: address2,
    town: town,
    county: county,
    openingHours: openingHours,
  });
}

// Adds event document to database. .
export async function addEvent(name, location, date, info, gymId) {
  let ref = await db.collection("events").add({
    name: name,
    location: location,
    date: date,
    info: info,
    gymId: gymId,
  });

  return ref; // Returns reference to newly created document. Allows you to access the id or other information.
}

// Retrieves event document from database.
export async function getEvent(eventId) {
  let doc = await db.collection("events").doc(eventId).get();

  let event = doc.data();
  event.id = doc.id;
  event.date = doc.data().date.toDate(); // Converts firebase timestamp to JS date object.

  return event;
}

// Retrieves events from database.
export async function getEvents(gymId) {
  var docs = await db.collection("events").where("gymId", "==", gymId).get();

  if (docs.empty) return []; // If there is no events found an empty array is returned.

  let events = [];
  docs.forEach((doc) => {
    let event = doc.data();
    event.id = doc.id;
    event.date = doc.data().date.toDate(); // Converts firebase timestamp to JS date object.
    events.push(event);
  });

  return events;
}

// Deletes event doc from database.
export async function deleteEvent(id) {
  await db.collection("events").doc(id).delete();
}

// Adds a class to the database for a gym.
export async function addClass(gymId, name, description, category) {
  let ref = await db.collection("classes").add({
    gymId: gymId,
    name: name,
    description: description,
    category: category,
  });

  return ref; // Returns reference to newly created document. Allows you to access the id or other information.
}

// Retrieves a class doc from the database.
export async function getClass(id) {
  let doc = await db.collection("classes").doc(id).get();

  let classInfo = doc.data();
  classInfo.id = doc.id;

  return classInfo;
}

// Retrieves all classes for a specific gym.
export async function getClasses(gymId) {
  let docs = await db.collection("classes").where("gymId", "==", gymId).get();

  if (docs.empty) return [];

  let classes = [];

  docs.forEach((doc) => {
    let temp = doc.data();
    temp.id = doc.id;
    classes.push(temp);
  });

  return classes;
}

// Deletes class doc from the database.
export async function deleteClass(classId) {
  await db.collection("classes").doc(classId).delete();
}

// Retrieves all the schedule docs for a specific class. E.g. each doc represents a specific time/date a class is running.
export async function getSchedule(classId) {
  let docs = await db
    .collection("schedule")
    .where("classId", "==", classId)
    .orderBy("date", "asc")
    .get(); // The results are ordering by ascending date.

  if (docs.empty) return [];

  let schedule = [];

  docs.forEach((doc) => {
    let temp = doc.data();
    temp.id = doc.id;
    temp.date = temp.date.toDate();
    schedule.push(temp);
  });

  return schedule;
}

// Schedules a new time for a specific class. E.g add 7pm 25/03/21 to the Yoga schedule.
export async function addScheduledClass(gymId, classId, date) {
  await db.collection("schedule").doc().set({
    gymId: gymId,
    classId: classId,
    date: date,
    bookings: [],
  });
}

// Retrieves the information about a single scheduled class. E.g. loads information that was created above.
export async function getScheduledClass(id) {
  let doc = await db.collection("schedule").doc(id).get();

  let info = doc.data();
  info.id = doc.id;
  info.date = info.date.toDate();

  return info;
}

// Gets list of bookings from a scheduled class, checks if user has already booked, if not adds their id to bookings arrray.
export async function bookClass(scheduleId, userId) {
  // Calls function above which gets the information for this specific sheduled class.
  let scheduledClass = await getScheduledClass(scheduleId);

  // The bookingsArray keeps track of the user ids which have signed up for this.
  let bookings = scheduledClass.bookings;

  // Checking if user's id is in the bookings array, if it is they have already signed up.
  // If it's not in the bookings array their id is then added.
  if (!bookings.includes(userId)) {
    bookings.push(userId);

    // Updating the scheduled class with the new bookings array which now contains the user's id.
    await db.collection("schedule").doc(scheduleId).update({
      bookings: bookings,
    });

    // We also update the users own schedule with the scheduledClass id.
    let user = await getUser(auth.currentUser.uid);
    let schedule = user.schedule;

    // Adds the scheduledClass id to the schedule array. This schedule lets the user keep track of the scheduled classes they have signed up for.
    schedule.push(scheduleId);

    // Update the user's doc in the database.
    await db.collection("users").doc(auth.currentUser.uid).update({
      schedule: schedule,
    });
  } else {
    alert("Class already booked");
  }
}

// Deletes a scheduled class. E.g. delete 7pm 25/03/21 to the Yoga schedule.
export async function deleteSchedule(id) {
  await db.collection("schedule").doc(id).delete();
}
