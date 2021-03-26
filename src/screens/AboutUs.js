import React, { useState, useEffect } from "react";
import { Text, Card } from "react-native-elements";

import MyView from "components/MyView";
import { useAuth } from "components/AuthContext";
import { getGym } from "functions/database";

// https://reactjs.org/docs/hooks-state.html
  // React keeps track of these variables. If they are changed, any part of the UI uses these values will also be updated without having to refresh the page.
  // "set" function is used to update the state in the future when changed.
  // https://www.youtube.com/watch?v=1FiIYaRr148 . I found this youtube video explained the concept very well.
function AboutUs() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [openingHours, setOpeningHours] = useState("");

  // Accessing gymId variables from AuthContext
  const { gymId } = useAuth();

  // onLoad I retrieve this gyms information from the database.
    // https://firebase.google.com/docs/firestore/query-data/get-data.

  useEffect(() => {
    getGym(gymId) // Same variable as above, retrieved from AuthContext
      .then((gym) => {
        // Returs an object with this gyms info.
        setName(gym.name);
        let address2 = gym.address2 != "" ? gym.address2 + "," : ""; // Adds a comma if address2 is not blank.
        setAddress(`${gym.address1}, ${address2}${gym.town}, ${gym.county}`); // Putting all the address strings together.
        setNumber(gym.phoneNum);
        setOpeningHours(gym.openingHours);
      })
      .catch();
  }, []);
//Displaying the below values
  return (
    <MyView>
      <Card>
        <Card.Title>Gym Details</Card.Title>
        <Text>{name}</Text>
        <Text>{address}</Text>
        <Text>{number}</Text>
      </Card>
      <Card>
        <Card.Title>Opening Hours</Card.Title>
        <Text>{openingHours}</Text>
      </Card>
    </MyView>
  );
}

export default AboutUs;
