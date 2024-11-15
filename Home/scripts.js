import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAcKXxJwjhm9s7hkcb4tStxz8j_18q1Ua4",
  authDomain: "loginweb-d5158.firebaseapp.com",
  databaseURL: "https://loginweb-d5158-default-rtdb.firebaseio.com",
  projectId: "loginweb-d5158",
  storageBucket: "loginweb-d5158.appspot.com",
  messagingSenderId: "977139409443",
  appId: "1:977139409443:web:c6dbce940932fec4c3c796",
};
const app = initializeApp(firebaseConfig);
let logoutButton = document.getElementById("logout-button");
logoutButton.addEventListener("click", (e) => {
  const auth = getAuth(app);
  signOut(auth)
    .then(() => {
      alert("Sukses logout");
      location.href = "../index.html";
    })
    .catch((error) => {
      console.error("Logout gagal:", error);
    });
});
