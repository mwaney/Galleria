import { database } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
function SignUp() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    createUserWithEmailAndPassword(database, email, password).then((data) =>
      console.log(data, "authData")
    );
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input type="email" name="emaila" placeholder="Email" id="" />
      <input type="password" name="password" id="" placeholder="Password" />
      <button type="submit">SignUp</button>
    </form>
  );
}

export default SignUp;
