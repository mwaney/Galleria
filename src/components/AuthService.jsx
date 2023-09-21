import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../firebase";

const auth = getAuth(app);

export const isAuthenticated = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(!!user);
      },
      (error) => {
        console.log(error);
        reject(error);
      }
    );
  });
};
