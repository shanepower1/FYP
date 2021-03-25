import React from "react";
import { ScrollView, SafeAreaView, KeyboardAvoidingView } from "react-native";
import { Text } from "react-native-elements";

// Children are the components that are wrapped by MyView.
// Allows me to reuse this code and have a consistent style throughout the application.
function MyView({ children, background }) {
  return (
    // Prevents content being covered by status bar, toolbars etc. on IOS devices. Renders all content within boundary of device.
    // https://reactnative.dev/docs/keyboardavoidingview
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* https://reactnative.dev/docs/safeareaview */}
      <SafeAreaView
        style={{ backgroundColor: background || "white", minHeight: "100%" }}
      >
        {/* https://reactnative.dev/docs/scrollview */}
        <ScrollView
          keyboardShouldPersistTaps={"handled"} //Determines when the keyboard should appear after tapping
          contentContainerStyle={{}}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default MyView;
