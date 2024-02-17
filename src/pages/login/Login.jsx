import { useState, useContext } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Typography, TextField, Button, Container, Box, Link as MuiLink } from "@mui/material";
import "../../components/widget/widget.scss"
import { PRIMARY } from "../../components/reusable/Main";

const Login = ({darkmode}) => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        navigate("/");
      })
      .catch((error) => {
        setError(true);
        console.error("Error signing in:", error.message);
      });
  };

  return (
    <div style={{height:'100vh'}}>
       <Container>
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box  component="form" onSubmit={handleLogin} sx={{ mt: 1, padding:'10px', WebkitBoxShadow:'4px 4px 10px 1px rgba(0, 0, 0, 0.47)', boxShadow:'2px 4px 10px 1px rgba(201, 201, 201, 0.47)', borderRadius:'10px' }}>
        <Typography component="h1" variant="h5" sx={{textAlign:'center'}}>
          Sign in to <span style={{color:PRIMARY}}>ME-TRAIN</span>
        </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            color="primary"
          >
            Sign In
          </Button>
          {error && <Typography variant="body2" color="error">Wrong email or password</Typography>}
        </Box>
        <Typography variant="body2" sx={{ mt: 2 }}>
          {"Don't have an account? "}
          <MuiLink component={Link} to="/signup" variant="body2">
            Sign Up
          </MuiLink>
        </Typography>
      </Box>
    </Container>
    </div>
   
  );
};

export default Login;
