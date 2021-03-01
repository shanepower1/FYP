import React from "react"
import { ScrollView, SafeAreaView, KeyboardAvoidingView } from "react-native"
import { Text } from "react-native-elements"

// Children are the components that are wrapped by MyView.
// Allows me to reuse this code and have a consistent style throughout the application.

function MyView({children, title}) {
    return (
        // https://reactnative.dev/docs/safeareaview
        // Prevents content being covered by status bar, toolbars etc. on IOS devices. Renders all content within boundary of device.
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <SafeAreaView style={{backgroundColor: "#2F0B29", minHeight: "100%"}}>   
                    <ScrollView  
                        keyboardShouldPersistTaps={'handled'} //Determines when the keyboard should appear after tapping
                        contentContainerStyle={{
                            backgroundColor: "#2F0B29",                          
                        }}
                    >
                        <Text>{title}</Text>
                        {children} 
                    </ScrollView>
            </SafeAreaView>  
        </KeyboardAvoidingView>   
    )
}

export default MyView