import { useState, useContext } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Typography, TextField, Button, Container, Box, Link as MuiLink, CircularProgress } from "@mui/material";
import "../../components/widget/widget.scss"
import { PRIMARY } from "../../components/reusable/Main";
import "../../components/reusable/Reusable.scss"
import InputError from "../../components/reusable/InputError";
const Login = ({darkmode}) => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsLoading(false);
        setError(null);
        dispatch({ type: "LOGIN", payload: user });
        navigate("/");
      })
      .catch((error) => {
        setError(true);
        setIsLoading(false);
        console.error("Error signing in:", error.message);
      });
  };

  return (
    <div style={{height:'100vh'}}>
       <Container>
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box className="widget-reusable" component="form" onSubmit={handleLogin} sx={{ mt: 1}}>
        <Typography component="h1" variant="h5" sx={{textAlign:'center'}}>
          Sign in to <span style={{color:PRIMARY}}>workoutTracker</span>
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
            disabled={isLoading} 
          >
            {isLoading ? <CircularProgress size={24} /> : "Sign in"}
          </Button>
          {error && 
          <InputError title={"Wrong email or password"} /> }

          <Typography variant="body2" sx={{ mt: 2, textAlign:'center'}}>
          {"Don't have an account? "}
          <MuiLink component={Link} to="/signup" variant="body2">
            Sign Up
          </MuiLink>
        </Typography>
        </Box>
        
      </Box>
    </Container>
    </div>
   
  );
};

export default Login;
