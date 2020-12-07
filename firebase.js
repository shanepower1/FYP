

import firebase from 'firebase'
import "firebase/auth"
import "firebase/firestore"

const app = firebase.initializeApp({
    apiKey: "AIzaSyASV-SPk1hRXInFYpLM2wwJXBQPBhlpHuA",
    authDomain: "shanefyp-e17f7.firebaseapp.com",
    databaseURL: "https://shanefyp-e17f7.firebaseio.com",
    projectId: "shanefyp-e17f7",
    storageBucket: "shanefyp-e17f7.appspot.com",
    messagingSenderId: "219494304736",
    appId: "1:219494304736:web:2bf53c07d5ecf3e1e57985",
    measurementId: "G-PM54G8M8NC"
})

export const auth = firebase.auth()
export const db = firebase.firestore()