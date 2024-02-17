import React, { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { PRIMARY } from "../../components/reusable/Main";

const New = ({ inputs }) => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState({});
  const [uploadProgress, setUploadProgress] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const uploadFile = () => {
      if (file) {
        const name = new Date().getTime() + file.name;
        const storageRef = ref(storage, name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [id]: value }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await setDoc(doc(db, "users", res.user.uid), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      navigate("/login");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box component="form" onSubmit={handleAdd} sx={{ mt: 1, mb:10, padding:'10px', WebkitBoxShadow:'4px 4px 10px 1px rgba(0, 0, 0, 0.47)', boxShadow:'2px 4px 10px 1px rgba(201, 201, 201, 0.47)', borderRadius:'10px' }}>
        <Typography component="h1" variant="h5" sx={{textAlign:'center'}}>
          Create a new account for <span style={{color:PRIMARY}}>ME-TRAIN</span>
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
                <img src={URL.createObjectURL(file)} alt="Uploaded File" style={{ maxWidth: "100%", height: "auto" }} />
              </Grid>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading || (uploadProgress !== null && uploadProgress < 100)}
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : "Register"}
          </Button>
          <Typography variant="body2" align="center">
            Already have an account?{" "}
            <Link to="/login" variant="body2">
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default New;
