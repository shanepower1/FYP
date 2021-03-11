import { storage } from "../firebase"

// Uploads image to Firebase storage. Pass in folder name, image id, and actual image. 
export async function uploadImage(folder, id, image){
    const response = await fetch(image);
    const blob = await response.blob();
    const ref = storage.ref().child(`${folder}/${id}`);
    const snapshot = await ref.put(blob);
    return snapshot.downloadURL;
}