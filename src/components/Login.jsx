import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import app from "../firebase";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const history = useNavigate();

  const handleSubmit = (values) => {
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Login successful", user);
        history("/gallery");
      })
      .catch((error) => {
        console.log("Login failed:", error);
        if (error) {
          setEmailError("Incorrect Email or Password");
          setPasswordError("Incorrect Email or Password");
        }
      });
  };
  return (
    <div className="login-container">
      <h2>Login</h2>
      <p>
        <b>Email: </b>user@example.com
      </p>
      <p>
        <b>Password: </b> 1Password
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div className="form-group">
              <label>Email:</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" className="error" />
              {/* Display email error message */}
              {emailError && <div className="error">{emailError}</div>}
            </div>
            <div className="form-group">
              <label>Password:</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" className="error" />
              {/* Display password error message */}
              {passwordError && <div className="error">{passwordError}</div>}
            </div>
            <button type="submit">Login</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
