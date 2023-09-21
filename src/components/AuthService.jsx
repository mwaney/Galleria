// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import app from "../firebase";

// const auth = getAuth(app);
// export const isAuthenticated = () => {
//   return new Promise((resolve, reject) => {
//     onAuthStateChanged(
//       auth,
//       (user) => {
//         // resolve(!!user);
//         if (user) {
//           // User is authenticated
//           resolve(true);
//         } else {
//           // User is not authenticated
//           resolve(false);
//         }
//       },
//       (error) => {
//         console.log(error);
//         reject(error);
//       }
//     );
//   });
// };
// const authService = {
//   isAuthenticated,
// };

// export default authService;

// authService.jsx
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../firebase";

const auth = getAuth(app);

export const isAuthenticated = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe(); // Stop listening for further changes
        resolve(!!user); // Resolve with true if user is authenticated, false otherwise
      },
      (error) => {
        console.log(error);
        reject(error); // Reject with the error if there's an issue
      }
    );
  });
};
