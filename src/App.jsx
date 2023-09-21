// import "./App.css";
// import Gallery from "./components/Gallery";
// import Login from "./components/Login";
// import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// import galleryImages from "./data/data";
// import { useEffect, useState } from "react";
// import { isAuthenticated } from "./components/AuthService";

// function App() {
//   const [authenticated, setAuthenticated] = useState(false);

//   // useEffect(() => {
//   //   isAuthenticated.then((userAuthenticated) => {
//   //     console.log("User authenticated:", userAuthenticated);
//   //     setAuthenticated(userAuthenticated);
//   //   });
//   // }, []);

//   useEffect(() => {
//     isAuthenticated()
//       .then((userAuthenticated) => {
//         console.log("User authenticated:", userAuthenticated);
//         setAuthenticated(userAuthenticated);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         setAuthenticated(false); // Handle errors and set authenticated to false
//       });
//   });
//   return (
//     <BrowserRouter>
//       <div className="App">
//         <h1 className="mainHeader">Galleria</h1>
//         <Routes>
//           <Route path="/" element={<Login />} />

//           <Route
//             path="/gallery"
//             element={
//               authenticated ? (
//                 <Gallery galleryImages={galleryImages} />
//               ) : (
//                 <Navigate to="/" />
//               )
//             }
//           />
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;

import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth"; // Import Firebase Auth functions
import Gallery from "./components/Gallery";
import Login from "./components/Login";
import galleryImages from "./data/data";
import firebaseApp from "./firebase"; // Adjust the import path for your Firebase initialization

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const auth = getAuth(firebaseApp);

  // Check authentication status when the component mounts
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true); // User is authenticated
      } else {
        setAuthenticated(false); // User is not authenticated
      }
    });

    return () => {
      // Unsubscribe when the component unmounts
      unsubscribe();
    };
  }, [auth]);

  // Handle user login (you can adjust this logic as needed)
  const handleLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Successful login
    } catch (error) {
      console.error("Error during login:", error);
      // Handle login error
    }
  };

  return (
    <BrowserRouter>
      <div className="App">
        <h1 className="mainHeader">Galleria</h1>
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/gallery"
            element={
              authenticated ? (
                <Gallery galleryImages={galleryImages} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
