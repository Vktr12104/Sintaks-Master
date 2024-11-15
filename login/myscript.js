import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";
import {
  getDatabase,
  set,
  ref,
  update,
} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyCHjA8L-Qc8kNECl5d0_F84Bi5z7jb-j70",
  authDomain: "sintakmasterauth.firebaseapp.com",
  projectId: "sintakmasterauth",
  storageBucket: "sintakmasterauth.firebasestorage.app",
  messagingSenderId: "834052394660",
  appId: "1:834052394660:web:11491144d566e5dc566031",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
let signinButton = document.getElementById("signin-button");
let signupButton = document.getElementById("signup-button");

signupButton.addEventListener("click", (e) => {
  let name = document.getElementById("name").value;
  let nohp = document.getElementById("nohp").value;
  let emailSignup = document.getElementById("email_signup").value;
  let passwordSignup = document.getElementById("psw_signup").value;

  createUserWithEmailAndPassword(auth, emailSignup, passwordSignup).then(
    (userCredential) => {
      const user = userCredential.user;
      set(ref(database, "users/" + user.uid), {
        name: name,
        nohp: nohp,
        email: emailSignup,
        password: passwordSignup,
      })
        .then(() => {
          alert("user telah sukses dibuat");
        })
        .catch((error) => {
          alert(error);
        });
    }
  ),
    then(() => {
      alert("User Telah ditambahkan");
    })
      .catch((error) => {
        alert(error);
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
});

signinButton.addEventListener("click", (e) => {
  let emailSignin = document.getElementById("email_signin").value;
  let passwordSignin = document.getElementById("psw_signin").value;

  signInWithEmailAndPassword(auth, emailSignin, passwordSignin).then(
    (userCredential) => {
      const user = userCredential.user;
      let lgDate = new Date();
      sessionStorage.setItem("userEmail", emailSignin);
      update(ref(database, "users/" + user.uid), {
        last_login: lgDate,
      })
        .then(() => {
          document.body.classList.add("slide-out");

          setTimeout(() => {
            location.href = "http://127.0.0.1:5500/Home/index.html";
          }, 500);
        })
        .catch((error) => {
          alert(error);
        });
    }
  );

  signOut(auth)
    .then(() => {})
    .catch((error) => {});
  document.querySelectorAll(".smooth-transition").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const href = this.getAttribute("href");
      document.body.classList.add("fade-out");
      setTimeout(() => {
        window.location.href = href;
      }, 500);
    });
  });
});
