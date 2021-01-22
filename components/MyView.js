import React from "react"
import {ScrollView} from "react-native"

function MyView({children}) {
    return (
        <ScrollView  
            contentContainerStyle={{
                padding: 10,
                backgroundColor: "white",
                minHeight: "100%",
             
            }}
        >
            {children}
        </ScrollView>
    )
}

export default MyView