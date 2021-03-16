import React, { useState, useContext} from "react"

const StoreContext = React.createContext()

export function useStore() {
    return useContext(StoreContext)
}

export function StoreProvider({children}) {
    const [userType, setUserType] = useState(null)
    const [gymName, setGymName] = useState("")

    const value = {
        userType, 
        setUserType,
        gymName,
        setGymName
    }

    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    )
}
