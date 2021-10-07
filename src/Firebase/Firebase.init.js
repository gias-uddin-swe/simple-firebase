import { initializeApp } from "firebase/app";
import firebaseConfig from "./Firebase.config";

const firebaseInitialize = () => {
  initializeApp(firebaseConfig);
};
export default firebaseInitialize;
