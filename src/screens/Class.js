import React, { useState, useEffect } from "react";
import { TouchableNativeFeedback } from "react-native";
import {
  Text,
  Card,
  Divider,
  Input,
  Button,
  ListItem,
} from "react-native-elements";
import {
  getClass,
  deleteClass,
  getSchedule,
  addScheduledClass,
  deleteSchedule,
  bookClass,
} from "functions/database";
import { useNavigation } from "@react-navigation/native";
import { formatDate, formatTime } from "functions/format";
import DateTimeInput from "components/DateTimeInput";
import { auth } from "../firebase";
import MyView from "components/MyView";
import { useAuth } from "components/AuthContext";

// Route contains parameters passed from navigation. navigation.navigate("Class", {name: "jimmy"})
function Class({ route }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [category, setCategory] = useState("");
  const [scheduleDate, setScheduleDate] = useState(new Date());

  const navigation = useNavigation(); // Allows access to navigation functionality.
  const { userId, userType } = useAuth(); // Accesses userId and userType variables from AuthContext.

  // onLoad retrieves info from database.
  useEffect(() => {
    loadInfo();
  }, []);

  function loadInfo() {
    // Retrieves class document from database and sets values.
    // https://firebase.google.com/docs/firestore/query-data/get-data.

    getClass(route.params.id)
      .then((classInfo) => {
        setName(classInfo.name);
        setDescription(classInfo.description);
        setCategory(classInfo.category);
      })
      .catch((error) => {
        alert(error.message);
      });

    // Gets schedule documents from database for this class.
    getSchedule(route.params.id)
      .then((result) => {
        result.forEach((scheduledClass) => {
          // Checking if this user has already booked and then adding a boolean field to decide if booking button should be displayed.
          if (scheduledClass.bookings.includes(userId)) {
            // If bookings array already contains current users' id then set alreadyBooked to true.
            scheduledClass.alreadyBooked = true;
          } else {
            scheduledClass.alreadyBooked = false;
          }
        });
        setSchedule(result);
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  // Deletes class from database.
    //https://firebase.google.com/docs/firestore/manage-data/delete-data.
  function remove() {
    deleteClass(route.params.id)
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  // Adds a new timeslot to this class.
  function scheduleClass() {
    addScheduledClass(userId, route.params.id, scheduleDate)
      .then(() => {
        loadInfo();
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  // Removes a specific timeslot from this class.
 //https://firebase.google.com/docs/firestore/manage-data/delete-data.

  function removeSchedule(id) {
    deleteSchedule(id)
      .then(() => {
        loadInfo();
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  // Books this user into timeslot for this class.
  function book(id) {
    bookClass(id, userId)
      .then(() => loadInfo())
      .catch((error) => alert(error.message));
  }

  return (
    <MyView>
      <Card>
        <Card.Title>{name}</Card.Title>
        {/* Links to storage in my firebase. */}
        <Card.Image
          source={{
            uri: `https://firebasestorage.googleapis.com/v0/b/shanefyp-e17f7.appspot.com/o/classes%2F${route.params.id}?alt=media&token=cff1649c-2042-4225-90a3-bb655d6d8b2c`,
          }}
        />
      </Card>
      <Card>
        <Card.Title style={{ marginBottom: 0 }}> Description</Card.Title>
        <Text>{description}</Text>
      </Card>
      <Card>
        <Card.Title>Class Schedule</Card.Title>
        <Divider />
        {schedule.map((item) => (
          <TouchableNativeFeedback
            key={item.id}
            onPress={() =>
              navigation.navigate("Scheduled Class", { info: item })
            }
          >
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title>
                  <Text>{formatDate(item.date)}</Text>
                </ListItem.Title>
                <ListItem.Subtitle>
                  <Text>{formatTime(item.date)}</Text>
                </ListItem.Subtitle>
                <ListItem.Subtitle></ListItem.Subtitle>
              </ListItem.Content>
              {
                // If user is an owner the delete button will be shown. If they are a standard user they see either a book button or "already booked" text
                userType == "owner" ? (
                  <Button title="X" onPress={() => removeSchedule(item.id)} />
                ) : item.alreadyBooked ? (
                  <Text>booked</Text>
                ) : (
                  <Button title="Book" onPress={() => book(item.id)} />
                )
              }
            </ListItem>
          </TouchableNativeFeedback>
        ))}
      </Card>
      {
        // If user type is owner thecomponents that let them schedule classes will be displayed.
        userType == "owner" && (
          <>
            <Card>
              <DateTimeInput
                date={scheduleDate}
                setDate={setScheduleDate}
                mode="datetime"
              />
              <Button title="Schedule Class" onPress={scheduleClass} />
            </Card>
            <Card containerStyle={{ padding: 0 }}>
              <Button title="Delete" onPress={remove} />
            </Card>
          </>
        )
      }
    </MyView>
  );
}

export default Class;
