import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Link as MuiLink,
  TextField,
  Typography,
} from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePrimary } from "../../components/general/Constants";
import InputError from "../../components/general/InputError";
import "../../components/general/Reusable.scss";
import Alertt from "../../components/general/alert/Alert";
import { auth, db, storage } from "../../firebase";
const Signup = ({ inputs }) => {
  const PRIMARY = usePrimary();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [data, setData] = useState({});
  const [uploadProgress, setUploadProgress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    //uploads a profileImageFile to the server
    const uploadFile = () => {
      if (file) {
        const name = new Date().getTime() + file.name;
        const storageRef = ref(storage, name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setData((prev) => ({ ...prev, img: downloadURL }));
            });
          }
        );
      }
    };
    uploadFile();
  }, [file]);

  const getFirebaseAuthErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/invalid-email":
        return "Invalid email address!";
      case "auth/email-already-in-use":
        return "Email already in use!";
      case "auth/weak-password":
        return "The password is too weak (At least 6 characters).";
      default:
        return "An unknown  error occurred!";
    }
  };

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [id]: value }));
  };

  //create new user
  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await setDoc(doc(db, "users", res.user.uid), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      setSuccess(true);
      setError(null);
      setTimeout(() => {
        setSuccess(false);
      }, 4000);
      setTimeout(() => {
        navigate("/login");
      }, 4000);
    } catch (err) {
      const humanReadableError = getFirebaseAuthErrorMessage(err.code);
      setError(humanReadableError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: "100vh" }}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          className="widget-reusable"
          component="form"
          onSubmit={handleAdd}
          sx={{ mt: 1, mb: 10 }}
        >
          <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
            Create a new account for{" "}
            <span style={{ color: PRIMARY }}>workoutGuru</span>
          </Typography>
          {inputs.map((input) => (
            <TextField
              key={input.id}
              margin="normal"
              required
              fullWidth
              id={input.id}
              label={input.label}
              variant="outlined"
              type={input.type}
              placeholder={input.placeholder}
              onChange={handleInput}
            />
          ))}
          <label htmlFor="file">
            <Button
              fullWidth
              variant="outlined"
              component="span"
              startIcon={<DriveFolderUploadOutlinedIcon />}
              sx={{ mt: 2 }}
            >
              Upload Profile Image
            </Button>
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
          </label>
          <Grid container justifyContent="center" sx={{ mt: 2 }}>
            {file && (
              <Grid item xs={12} sm={6}>
                <img
                  src={URL.createObjectURL(file)}
                  alt="Uploaded File"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </Grid>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={
              loading || (uploadProgress !== null && uploadProgress < 100)
            }
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : "Sign up"}
          </Button>
          {error && <InputError title={error} />}
          {success && (
            <Alertt
              severity={"success"}
              type={
                "Your account has been created! You will be redirected to Login"
              }
            />
          )}

          <Typography variant="body2" sx={{ textAlign: "center" }}>
            {"Already have an account? "}
            <MuiLink component={Link} to="/login" variant="body2">
              Login
            </MuiLink>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
