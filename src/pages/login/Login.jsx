import { useContext, useState } from "react"
import "./login.scss"
import { signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const {dispatch} = useContext(AuthContext)
  const handleLogin = (e) => {
  e.preventDefault();

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    dispatch({type:"LOGIN", payload: user})
    navigate("/")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setError(true);
  });
}
  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="email" onChange={(e)=>setEmail(e.target.value)} required/>
        <input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)} required/>
        <button type="submit">Login</button>
        {error && (
        <span>Wrong email or pw</span>
        )}
      </form>
      Noch kein Account? Hier gehts zum <Link to="/signup">Signup</Link>
    </div>
  )
}

export default Login