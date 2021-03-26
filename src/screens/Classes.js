import React, { useState, useEffect } from "react";
import { View, Button } from "react-native";
import { Text, Card, ListItem, Avatar } from "react-native-elements";
import { FloatingAction } from "react-native-floating-action";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MyView from "components/MyView";
import { getClasses } from "functions/database";
import { useAuth } from "components/AuthContext";

// https://reactjs.org/docs/hooks-state.html
  // React keeps track of these variables. If they are changed, any part of the UI uses these values will also be updated without having to refresh the page.
  // "set" function is used to update the state in the future when changed.
  // https://www.youtube.com/watch?v=1FiIYaRr148 . I found this youtube video explained the concept very well.

function Classes() {
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const { gymId, userType } = useAuth(); // Allows access to gymId and userType variables from AuthContext.
  const navigation = useNavigation(); // Allows access to navigation functionality.

 //Loads data once
  useEffect(() => {
    getData();
  }, []);

  function getData() {
      // https://firebase.google.com/docs/firestore/query-data/get-data.
      // Calling getClasses from database.js.
    getClasses(gymId)
      .then((result) => {
        setClasses(result);
        setFilteredClasses(result);
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  // Buttons in floating action button.
  //https://www.npmjs.com/package/react-native-floating-action
  const fabActions = [
    {
      text: "Refresh",
      icon: <Ionicons name="refresh" size={24} color="white" />,
      name: "refresh",
      position: 1,
      color: "#2F0B29",
    },
    {
      text: "Add Class",
      icon: <Ionicons name="add-outline" size={24} color="white" />,
      name: "add",
      position: 2,
      color: "#2F0B29",
    },
  ];

  // Handles floating action button click.
  //https://www.npmjs.com/package/react-native-floating-action
  function handleFab(name) {
    if (name == "refresh") {
      getData();
    } else if (name == "add") {
      navigation.navigate("Add Class");
    }
  }

  // Takes in the category name and returns the correct colour.
  //Simple IF statements for which colour to return
  function getCategoryColor(category) {
    if (category == "Strength") {
      return "#d12115";
    } else if (category == "Endurance") {
      return "#4950d1";
    } else if (category == "Balance") {
      return "#4d9943";
    }
  }

  // Filters classes by category.
  function filterClasses(category) {
    // Loops through classes, checks if category matches passed in category and then returns a filtered list.
    let temp = classes.filter((item) => item.category == category);
    setFilteredClasses(temp);
  }

  return (
    <>
      <MyView>
        <Card>
          <Card.Title style={{ marginBottom: 0 }}> Weekly Classes</Card.Title>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              title="Strength"
              color="#d12115"
              style={{ flex: 1 }}
              onPress={() => filterClasses("Strength")}
            />
            <Button
              title="Endurance"
              color="#4950d1"
              style={{ flex: 1 }}
              onPress={() => filterClasses("Endurance")}
            />
            <Button
              title="Balance/Flexibility/Core"
              color="#4d9943"
              style={{ flex: 1 }}
              onPress={() => filterClasses("Balance")}
            />
          </View>
        </Card>
        {filteredClasses.map((item) => (
          <Card
            containerStyle={{
              padding: 0,
              borderLeftWidth: 10,
              borderLeftColor: getCategoryColor(item.category),
            }}
            key={item.id}
          >
            <ListItem
              key={item.id}
              bottomDivider
              onPress={() => navigation.navigate("Class", { id: item.id })}
            >
              {/* Loads image from my firebase storage. class id is the same as the image name. */}
              <Avatar
                source={{
                  uri: `https://firebasestorage.googleapis.com/v0/b/shanefyp-e17f7.appspot.com/o/classes%2F${item.id}?alt=media&token=cff1649c-2042-4225-90a3-bb655d6d8b2c`,
                }}
              />
              <ListItem.Content>
                <ListItem.Title>
                  <Text>{item.name}</Text>
                </ListItem.Title>
                <ListItem.Subtitle>
                  <Text>{item.description}</Text>
                </ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron size={25} />
            </ListItem>
          </Card>
        ))}
      </MyView>

      {
        //https://www.npmjs.com/package/react-native-floating-action
        userType == "owner" && (
          <FloatingAction
            actions={fabActions}
            onPressItem={handleFab}
            color="#2F0B29"
          />
        )
      }
    </>
  );
}

export default Classes;
