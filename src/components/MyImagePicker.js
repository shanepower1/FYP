import React, { useEffect } from "react"
import { Button, Image } from "react-native-elements"
import * as ImagePicker from 'expo-image-picker' //https://docs.expo.io/versions/latest/sdk/imagepicker/

function MyImagePicker({image, setImage}) {
    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
    }, []);

        //code also from the above link, launches image library
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

    
        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <>
            <Button title="Choose Image" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}  
        </>
    )
}

export default MyImagePicker