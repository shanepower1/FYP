import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

//https://console.firebase.google.com/u/1/project/shanefyp-e17f7/settings/general/web:YzFlMTA1OWMtYmY5ZS00ZjczLTg5YTItZDExMGI5MDZmOTM2
//The above link is where i got the below code that linked firebase to my project
const app = firebase.initializeApp({
  apiKey: "AIzaSyASV-SPk1hRXInFYpLM2wwJXBQPBhlpHuA",
  authDomain: "shanefyp-e17f7.firebaseapp.com",
  databaseURL: "https://shanefyp-e17f7.firebaseio.com",
  projectId: "shanefyp-e17f7",
  storageBucket: "shanefyp-e17f7.appspot.com",
  messagingSenderId: "219494304736",
  appId: "1:219494304736:web:2bf53c07d5ecf3e1e57985",
  measurementId: "G-PM54G8M8NC",
});

//This will prevent me having to type firebase.auth() each time, i can now refer to it as just auth. Same with db
export const auth = firebase.auth();
export const storage = firebase.storage();
export const db = firebase.firestore();
