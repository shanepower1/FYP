import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Card, Text } from "react-native-elements";
import MyView from "components/MyView";
import { auth } from "../firebase";
import { getGym } from "functions/database";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "components/AuthContext";

function UserHome() {
  const navigation = useNavigation(); // Allows access to navigation funciontality. 

  const height = 200;

  const { gymId, gymName, setGymId, setGymName } = useAuth(); // Accesses variables from AuthContext. 

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    getGym(gymId).then((gym) => {
      setGymId(gym.id);
      setGymName(gym.name);
    });
  }

  return (
    <MyView>
      <TouchableOpacity onPress={() => navigation.navigate("About Us")}>
        <Card containerStyle={{ padding: 10 }}>
          <Card.Image source={require("assets/aboutus.png")}>
            <Text style={styles.text}>About Us</Text>
          </Card.Image>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Classes", { gymId: gymId, type: "classes" })
        }
      >
        <Card containerStyle={{ padding: 10 }}>
          <Card.Image source={require("assets/Capture.png")}>
            <Text style={styles.text}>View Our Available Classes</Text>
          </Card.Image>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Event List", { gymId: gymId, type: "upcoming" })
        }
      >
        <Card containerStyle={{ padding: 10 }}>
          <Card.Image source={require("assets/event.png")}>
            <Text style={styles.text}>Upcoming Events</Text>
          </Card.Image>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Account")}>
        <Card containerStyle={{ padding: 10 }}>
          <Card.Image source={require("assets/weights.png")}>
            <Text style={styles.text}>My Account</Text>
          </Card.Image>
        </Card>
      </TouchableOpacity>
    </MyView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    textAlign: "center",
    marginTop: "auto",
    marginBottom: "auto",
    fontSize: 22,
    textShadowColor: "black",
    textShadowRadius: 5,
    fontWeight: "bold",
  },
});

export default UserHome;
