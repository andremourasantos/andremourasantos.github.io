//Firebase
import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

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
if(import.meta.env.PROD){
  const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider('6Lescm4pAAAAACbd1jjcFPPb-AEbQJ5ouVeLy-1n'),
    isTokenAutoRefreshEnabled: true
  });
} else {
  console.warn("As the application is on DEV environment, AppCheck wasn't initialized.");
}

export { app };