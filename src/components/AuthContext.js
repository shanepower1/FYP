import React, { useState, useEffect, useContext } from "react";
import { getUser, getGym } from "functions/database";
import { Text } from "react-native";
import { auth } from "src/firebase.js";

// https://reactjs.org/docs/context.html#reactcreatecontext
const AuthContext = React.createContext();

// Importing this in any component gives us access to the variables in AuthProvider.
/* 
    import { useAuth } from "components/AuthContext"
    const { userId, gymName } = useAuth()
*/
export function useAuth() {
  //https://reactjs.org/docs/hooks-reference.html#usecontext
  return useContext(AuthContext);
}

// AuthProvider shares these variables globally.
export default function AuthProvider({ children }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [gymId, setGymId] = useState(null);
  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState("");
  const [gymName, setGymName] = useState("Pick a Gym");

  useEffect(() => {
    // This code is triggered whenever there is change in auth state e.g. User signs in or out.
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // If user exists then someone is signed in. Else nobody is signed in and the values are reset to default.
      if (user) {
        loadData(user.uid);
      } else {
        setIsSignedIn(false);
        setUserName("");
        setUserType("");
        setUserId(null);
        setGymId(null);
        setGymName("Pick a Gym");
      }
    });

    return unsubscribe;
  }, []);

  // Loads users data from the database.
  async function loadData(userId) {
    try {
      // Delays for 1000ms so new users can be finished creating. If we don't do this it can cause errors.
      await delay(1000);

      // getUser function is imported from database.js.
      var userInfo = await getUser(userId);

      /* 
                If user has a gymId, they are either an gym owner or a user who has signed up to a gym. 
                So we load the gyms information. If the user doesn't have a gymId, there is no reason to load this. 
            */
      if (userInfo.gymId != null) {
        // getGym is imported from firebase.js, it retrieves the information about a single gym form the database.
        let gymInfo = await getGym(userInfo.gymId);

        // Sets gymName and GymId variables which can then be accessed globablly.
        setGymName(gymInfo.name);
        setGymId(gymInfo.id);
      }

      // Sets values which can be accessed globally.
      setUserName(userInfo.name);
      setUserType(userInfo.type);
      setUserId(userInfo.id);
      setIsSignedIn(true);
    } catch (error) {
      alert(error.message);
    }
  }

  // https://www.codegrepper.com/code-examples/javascript/function+sleep+%28ms%29+%7B+++++return+new+Promise%28resolve+%3D%3E+setTimeout%28resolve%2Cms%29%29%3B+%7D
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  // These variables are stored in an object called value which is passed down to all it's children.
  const value = {
    isSignedIn,
    userName,
    userType,
    userId,
    gymName,
    setGymName,
    gymId,
    setGymId,
  };

  return (
    // Provides value to all the children, which means it is passed down to every component. https://reactjs.org/docs/context.html#contextprovider
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}
