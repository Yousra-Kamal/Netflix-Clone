import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDPfPb-GNGGgtwpZBgUVSjDSQLPURczzKo",
  authDomain: "netflix-clone-14a31.firebaseapp.com",
  projectId: "netflix-clone-14a31",
  storageBucket: "netflix-clone-14a31.appspot.com",
  messagingSenderId: "888656465666",
  appId: "1:888656465666:web:58561b54cc499eb813bc1b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Sign Up
const signUp = async (name, email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ); // This will create a new user in the authentication section of Firebase
    const user = response.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email
    });
  } catch (error) {
    console.error(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

// Login
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

// Logout
const logout = async () => {
  signOut(auth);
};

export { signUp, login, logout, auth, db };
