import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Login from "./components/Login";
import galleryImages from "./data/data";
import firebaseApp from "./firebase";
import Gallery3 from "./components/Gallery3";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const auth = getAuth(firebaseApp);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    });

    return () => {
      // Unsubscribe when the component unmounts
      unsubscribe();
    };
  }, [auth]);

  const handleLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error during login:", error);
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
                <Gallery3 images={galleryImages} />
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
