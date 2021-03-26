import React, { useState } from "react";
import { Input, Card, Button, CheckBox } from "react-native-elements";

import MyView from "components/MyView";
import MyImagePicker from "components/MyImagePicker";
import { addClass } from "functions/database";
import { uploadImage } from "functions/storage";
import { useAuth } from "components/AuthContext";
import { useNavigation } from "@react-navigation/native";
 // https://reactjs.org/docs/hooks-state.html
  // React keeps track of these variables. If they are changed, any part of the UI uses these values will also be updated without having to refresh the page.
  // "set" function is used to update the state in the future when changed.
  // https://www.youtube.com/watch?v=1FiIYaRr148 . I found this youtube video explained the concept very well.
function AddClass() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [numSpaces, setNumSpaces] = useState("");
  const [category, setCategory] = useState(null);

  // Variables to store whether checkboxes are selected or not.
  const [isBalanceChecked, setIsBalanceChecked] = useState(false);
  const [isEnduranceChecked, setIsEnduranceChecked] = useState(false);
  const [isStrengthChecked, setIsStrengthChecked] = useState(false);

  const navigation = useNavigation(); // Allows access to navigation functionality.
  const { userId } = useAuth(); // userId retrieved from AuthContext.

  const [image, setImage] = useState(null);

  // Handles form submit.
  function handleAdd() {
    // If no category is selected prompt user, else add to database and upload image.
    if (!category) {
      alert("Please select a category");
    } else {
      addClass(userId, name, description, category)// https://firebase.google.com/docs/firestore/manage-data/add-data#web

        .then((ref) => {
          // Reference to newly created document I then use documents id to name the picture.
          // Upload image code in functions/storage.
          uploadImage("classes", ref.id, image).catch((error) => {});
          navigation.navigate("Classes");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  }

  // Handles checkboxes. It unselects all of them, and reselects the newest one. So only one can be selected at a time.
  function handleChecked(option) {
    setIsBalanceChecked(false);
    setIsEnduranceChecked(false);
    setIsStrengthChecked(false);
  
    switch (option) {
      case "endurance":
        setIsEnduranceChecked(true);
        setCategory("Endurance");
        break;
      case "strength":
        setIsStrengthChecked(true);
        setCategory("Strength");
        break;
      case "balance":
        setIsBalanceChecked(true);
        setCategory("Balance");
        break;
    }
  }

  return (
    <MyView>
      <Card>
        <Input
          onChangeText={(text) => setName(text)}
          value={name}
          label="Name"
        />
        <Input
          onChangeText={(text) => setDescription(text)}
          value={description}
          multiline={true}
          label="Description"
        />
        <Input
          onChangeText={(text) => setNumSpaces(text)}
          value={numSpaces}
          keyboardType="numeric"
          label="Spaces Available"
        />

        {/* https://reactnativeelements.com/docs/checkbox/ */}
        <CheckBox
          title="Endurance"
          checked={isEnduranceChecked}
          onPress={() => handleChecked("endurance")}
        />
        <CheckBox
          title="Strength"
          checked={isStrengthChecked}
          onPress={() => handleChecked("strength")}
        />
        <CheckBox
          title="Balance / Flexibility / Core"
          checked={isBalanceChecked}
          onPress={() => handleChecked("balance")}
        />

        <MyImagePicker image={image} setImage={setImage} />
        <Button
          title="Add Class"
          onPress={() => handleAdd()}
          buttonStyle={{ marginTop: 20 }}
        />
      </Card>
    </MyView>
  );
}

export default AddClass;
