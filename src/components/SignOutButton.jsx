import app from "../firebase";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const SignOutButton = () => {
  const history = useNavigate();
  const handleSignOut = async () => {
    try {
      const auth = getAuth(app);
      await signOut(auth);
      history("/");
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  return (
    <button className="signoutBtn" onClick={handleSignOut}>
      Signout
    </button>
  );
};

export default SignOutButton;
