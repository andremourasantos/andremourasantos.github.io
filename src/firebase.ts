//Firebase
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAneNAD2jfP63gmC9rlvn2TLF8livxpYxo",
  authDomain: "andremourasantos-2c83a.firebaseapp.com",
  projectId: "andremourasantos-2c83a",
  storageBucket: "andremourasantos-2c83a.appspot.com",
  messagingSenderId: "495363231805",
  appId: "1:495363231805:web:67b7dba4f0dff32d49da54",
  measurementId: "G-RWXZ8BGYKH"
};

const app = initializeApp(firebaseConfig);

export { app };