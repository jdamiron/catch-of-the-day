import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCXq7-Zq0-hh7FzeGGYQJRHUoKrJXem-Kw",
  authDomain: "catch-of-the-day-jeremiah-1.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-jeremiah-1.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

//Named Export
export { firebaseApp };

export default base;
