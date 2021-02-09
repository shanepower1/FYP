import React from "react"
import {ScrollView, SafeAreaView} from "react-native"

// Children are the components that are wrapped by MyView.
function MyView({children}) {
    return (
        // https://reactnative.dev/docs/safeareaview
        // Prevents content being covered by status bar, toolbars etc. on IOS devices. Renders all content within boundary of device.
        <SafeAreaView>      
            <ScrollView  
                contentContainerStyle={{
                    padding: 10,
                    backgroundColor: "white",
                    minHeight: "100%",  
                }}
            >
                {children} 
            </ScrollView>
        </SafeAreaView>     
    )
}

export default MyView