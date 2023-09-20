import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { auth } from "../firebase";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = auth.currentUser !== null; // Check if the user is authenticated

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};
export default ProtectedRoute;
