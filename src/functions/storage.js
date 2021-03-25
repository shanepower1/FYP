import { storage } from "../firebase";
// https://firebase.google.com/docs/storage/web/upload-files
// Uploads image to Firebase storage. Pass in folder name, image id, and actual image.
export async function uploadImage(folder, id, image) {
  try {
    const response = await fetch(image);
    const blob = await response.blob();
    const ref = storage.ref().child(`${folder}/${id}`);
    const snapshot = await ref.put(blob);
    return snapshot.downloadURL;
  } catch (error) {}
}
