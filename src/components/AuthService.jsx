import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../firebase";

const auth = getAuth(app);
const isAuthenticated = () => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      resolve(!!user);
    });
  });
};

export default {
  isAuthenticated,
};
