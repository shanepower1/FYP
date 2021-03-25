import React from "react";
import { StyleSheet } from "react-native";
import { Text, ListItem, Card } from "react-native-elements";
import { auth } from "../firebase.js";
import MyView from "components/MyView";
import { useAuth } from "components/AuthContext";

function Account({ navigation }) {
  const { userType } = useAuth();

  return (
    <MyView>
      <Card containerStyle={{ padding: 0 }}>
        <ListItem
          onPress={() => auth.signOut()}
          bottomDivider
          style={{ fontSize: 50 }}
        >
          <ListItem.Content>
            <ListItem.Title style={styles.title}>Sign Out</ListItem.Title>
            <ListItem.Subtitle style={styles.subtitle}>
              Return to login screen
            </ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron size={30} />
        </ListItem>

        {userType == "standard" && ( // Only displayed for standard users.
          <ListItem
            onPress={() => navigation.navigate("My Bookings")}
            bottomDivider
            style={{ fontSize: 50 }}
          >
            <ListItem.Content>
              <ListItem.Title style={styles.title}>My Bookings</ListItem.Title>
              <ListItem.Subtitle style={styles.subtitle}>
                View details about your class bookings
              </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron size={30} />
          </ListItem>
        )}

        {userType == "owner" && ( // Only displayed for owners.
          <ListItem
            onPress={() => navigation.navigate("Update Gym")}
            bottomDivider
          >
            <ListItem.Content>
              <ListItem.Title style={styles.title}>
                Update Gym Details
              </ListItem.Title>
              <ListItem.Subtitle style={styles.subtitle}>
                Information on gym
              </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron size={chevronSize} />
          </ListItem>
        )}
      </Card>
    </MyView>
  );
}

const styles = StyleSheet.create({
  title: {},
  subtitle: {},
});

export default Account;
