import React, { useEffect, useState } from "react";
import { Text, Card } from "react-native-elements";
import { useAuth } from "components/AuthContext";
import { getUser, getScheduledClass, getClass } from "functions/database";
import MyView from "components/MyView";
import { formatDate, formatTime } from "functions/format";

function MyBookings() {
  const { userId } = useAuth(); // Accesses userId variable from AuthContext.
  const [bookingInfo, setBookingInfo] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    let user = await getUser(userId); // Load this users' info from the database. 

    let info = []; // Empty array to store schedule documents. 

    // Loops through schedule array which contains ids of the scheduled classes the user signed up to. 
    user.schedule.forEach((id) => { // Loop through the scheduled classes id's. 
      getScheduledClass(id).then((booking) => { // Load the info for each scheduled class from the db. // Contains time, date, classId.
        getClass(booking.classId).then((classInfo) => { // Load class info. 
          let temp = {
            id: booking.id,
            name: classInfo.name,
            date: booking.date,
          }; // Contains the name of the class, and the scheduled time for the class. 

          info.push(temp); // Push this to info array so we can display to the user all their class bookings. 
        });
      });
    });

    // Lets database functions complete before continuing. 
    await delay(1000);

    setBookingInfo(info);
  }

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  return (
    <MyView>
      {bookingInfo.map((item) => (
        <Card key={item.id}>
          <Text>{item.name}</Text>
          <Text>{formatDate(item.date)}</Text>
          <Text>{formatTime(item.date)}</Text>
        </Card>
      ))}
    </MyView>
  );
}

export default MyBookings;
