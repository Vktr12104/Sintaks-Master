import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCHjA8L-Qc8kNECl5d0_F84Bi5z7jb-j70",
  authDomain: "sintakmasterauth.firebaseapp.com",
  databaseURL: "https://sintakmasterauth-default-rtdb.firebaseio.com",
  projectId: "sintakmasterauth",
  storageBucket: "sintakmasterauth.firebasestorage.app",
  messagingSenderId: "834052394660",
  appId: "1:834052394660:web:615bc25adbc65b21566031",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const form = document.getElementById("form-id");
const profileInfo = document.getElementById("profile-info");

async function getUserProfile(email) {
  const profileRef = collection(db, "Profile");
  const q = query(profileRef, where("Email", "==", email));

  try {
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      querySnapshot.forEach((docSnapshot) => {
        const profileId = `profile-info-${email}`;
        let profileInfo = document.getElementById(profileId);

        if (!profileInfo) {
          profileInfo = document.createElement("div");
          profileInfo.id = profileId;
          document.body.appendChild(profileInfo);
        }
        renderProfile(docSnapshot.data(), profileInfo);
      });
    } else {
      if (!profileInfo) {
        profileInfo = document.createElement("div");
        profileInfo.id = profileId;
        profileInfo.classList.add("profile-info-container");
        document.body.appendChild(profileInfo);
      }
      profileInfo.innerHTML = "<p>Data profil tidak ditemukan.</p>";
      const buttonWrapper = document.createElement("div");
      buttonWrapper.classList.add("fill-profile-btn-wrapper");

      const button = document.createElement("button");
      button.classList.add("fill-profile-btn");
      button.innerHTML = "Isi Profil";
      button.onclick = () => {
        window.location.href = "profile-form.html";
      };

      buttonWrapper.appendChild(button);
      profileInfo.appendChild(buttonWrapper);
    }
  } catch (error) {
    console.error("Error getting document: ", error);
    const profileInfo = document.createElement("div");
    profileInfo.id = `profile-info-${email}`;
    document.body.appendChild(profileInfo);
  }
}
onAuthStateChanged(auth, (user) => {
  if (user) {
    getUserProfile(user.email);
    console.log(user);
  } else {
    profileInfo.innerHTML = "Anda belum login. Silakan login terlebih dahulu.";
  }
});
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nama = form["full-name"].value;
    const nik = form["nik"].value;
    const tanggalLahir = form["dob"].value;
    const jenisKelamin = form["gender"].value;
    const domisili = form["domicile"].value;
    const nomorPonsel = parseInt(form["phone"].value, 10);
    const email = form["email"].value;
    try {
      console.log({
        Nama: nama,
        NIK: nik,
        TanggalLahir: tanggalLahir,
        JenisKelamin: jenisKelamin,
        Domisili: domisili,
        NomorPonsel: nomorPonsel,
        Email: email,
      });

      await addDoc(collection(db, "Profile"), {
        Nama: nama,
        NIK: nik,
        TanggalLahir: tanggalLahir,
        JenisKelamin: jenisKelamin,
        Domisili: domisili,
        NomorPonsel: nomorPonsel,
        Email: email,
      });
      alert("Profil berhasil diperbarui!");
      form.reset();
      window.location.href = "index.html";
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  });
} else {
  console.error("Form tidak ditemukan di DOM.");
}
function renderProfile(data) {
  const birthDate = new Date(data.TanggalLahir.seconds * 1000);
  const profileDiv = document.createElement("div");
  profileDiv.classList.add("profile-content");

  const profilePhotoDiv = document.createElement("div");
  profilePhotoDiv.classList.add("profile-photo");
  const profileImage = document.createElement("img");
  profileImage.src = "https://via.placeholder.com/150";
  profileImage.alt = "Profile Picture";
  profilePhotoDiv.appendChild(profileImage);
  profileDiv.appendChild(profilePhotoDiv);

  const profileInfoDiv = document.createElement("div");
  profileInfoDiv.classList.add("profile-info");
  const infoItems = [
    { label: "Nama", value: data.Nama },
    { label: "NIK", value: data.NIK },
    { label: "Tanggal Lahir", value: birthDate.toLocaleDateString() },
    { label: "Jenis Kelamin", value: data.JenisKelamin },
    { label: "Domisili", value: data.Domisili },
    { label: "Nomor Ponsel", value: data.NomorPonsel },
    { label: "Alamat Email", value: data.Email },
    { label: "Profil LinkedIn", value: data.LinkedIn || "-" },
  ];

  infoItems.forEach((item) => {
    const infoItemDiv = document.createElement("div");
    infoItemDiv.classList.add("info-item");
    infoItemDiv.innerHTML = `<strong>${item.label}:</strong> ${item.value}`;
    profileInfoDiv.appendChild(infoItemDiv);
  });

  profileDiv.appendChild(profileInfoDiv);
  profileInfo.appendChild(profileDiv);
}
