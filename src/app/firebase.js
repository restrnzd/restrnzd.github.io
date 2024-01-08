import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyBS9Iy01nGihdBZcVcX26sdYG6qS_2EBWQ",
  authDomain: "rest-zavala.firebaseapp.com",
  projectId: "rest-zavala",
  storageBucket: "rest-zavala.appspot.com",
  messagingSenderId: "789112399672",
  appId: "1:789112399672:web:066a317555f49780fb83cd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
