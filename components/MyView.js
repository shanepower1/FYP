import React from "react"
import {ScrollView, SafeAreaView} from "react-native"

function MyView({children}) {
    return (
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