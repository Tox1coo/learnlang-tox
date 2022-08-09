/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
	apiKey: "AIzaSyBwN7lCylS997sb8n-PkC-9GY9pXXWpqtI",
	authDomain: "learnlanguage-tox.firebaseapp.com",
	databaseURL: "https://learnlanguage-tox-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "learnlanguage-tox",
	storageBucket: "learnlanguage-tox.appspot.com",
	messagingSenderId: "1096226881337",
	appId: "1:1096226881337:web:749166ef32cf70d0a3b2e8",
	measurementId: "G-YDHGFRRHC0"
};

export const app = initializeApp(firebaseConfig)
export const storage = getStorage()