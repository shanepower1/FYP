import React from "react";
import { LogBox } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "react-native-elements";
import AuthProvider from "components/AuthContext";
import Navigation from "components/Navigation";

const theme = {
  colors: {
    primary: "#47113e",
    secondary: "orange",
  },
  Button: {
    color: "red",
  },
};

export default function Main() {
  //https://stackoverflow.com/questions/35309385/how-do-you-hide-the-warnings-in-react-native-ios-simulator
  LogBox.ignoreLogs(["Setting a timer", "Non-serializable values"]); // Warning suppression.

  return (
 
    //https://reactnativeelements.com/docs/customization/
    <ThemeProvider theme={theme}>
      <AuthProvider> {/* Imported from auth context. This allows the variables stored there to be accessed globally. */}
        <Navigation />
      </AuthProvider>
      <StatusBar style="light" translucent={false} /> { /* Expo component. Controls status bar(the bar on top of the screen with battery, reception etc. ) */}
    </ThemeProvider>
  );
}
