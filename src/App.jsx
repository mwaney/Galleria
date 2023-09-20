import "./App.css";
import Gallery from "./components/Gallery";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import galleryImages from "./data/data";
import { useEffect, useState } from "react";
import authService from "./components/AuthService";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    authService.isAuthenticated().then((userAuthenticated) => {
      setAuthenticated(userAuthenticated);
    });
  }, []);
  return (
    <BrowserRouter>
      <h1 className="mainHeader">Galleria</h1>
      <div className="App">
        <Routes>
          <Route path="/" Component={Login} />
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
