import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // You need to create an AuthContext to manage authentication.

const PrivateRoute = ({ element, ...rest }) => {
  const { user } = useAuth(); // Use your authentication context to check the user's authentication status.

  return (
    <Route
      {...rest}
      element={user ? element : <Navigate to="/" />} // Redirect to login if not authenticated.
    />
  );
};

export default PrivateRoute;
