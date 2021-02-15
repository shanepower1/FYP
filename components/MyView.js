import React from "react"
import {ScrollView, SafeAreaView, KeyboardAvoidingView} from "react-native"

// Children are the components that are wrapped by MyView.
function MyView({children, backgroundColor}) {

    
    return (
        // https://reactnative.dev/docs/safeareaview
        // Prevents content being covered by status bar, toolbars etc. on IOS devices. Renders all content within boundary of device.
        <SafeAreaView style={{backgroundColor: "#2F0B29"}}>   
            <ScrollView  
                keyboardShouldPersistTaps={'handled'}
                contentContainerStyle={{
                    padding: 10,
                    minHeight: "100%",  
                }}

                contentContainerStyle={{backgroundColor: "#2F0B29", minHeight: "100%"}}
            >
                {children} 
            </ScrollView>
        </SafeAreaView>     
    )
}

export default MyView