import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import Profile from "./pages/profile/Profile";
import AddWeight from "./pages/add/AddWeight";
import AddWorkout from "./pages/add/AddWorkout";
import HistoryWorkouts from "./pages/history/HistoryWorkouts";
import HistoryWeights from "./pages/history/HistoryWeights";
import Progress from "./pages/analytics/Progress";
import Home from "./pages/start/Home";
import Login from "./pages/login/Login";
import New from "./pages/signup/New";
import { userInputs } from "./formSource"; 
import "./style/dark.scss";
import Navbar from "./components/navbar/Navbar";
import { doc, getDoc } from "@firebase/firestore";
import { db } from "./firebase";
import Sidebar from "./components/sidebar/Sidebar";
import { ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import {PRIMARY} from "./components/reusable/Main"
function App() {
  const [darkMode, setDarkMode] = useState(useMediaQuery('(prefers-color-scheme: dark)'));
  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: {
             //main: '#131313',
            main: "#6439FF",
          },
          type: 'light',
          background: {
            default: darkMode ? '#131313' : 'rgb(242,241,246);',
          },
        },
      }),
      
    [darkMode],
  );


  const {currentUser } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };


  useEffect(() => {
    const getProfileDetails = async () => {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setProfileData(docSnap.data()); // Setzen Sie den Zustand auf die Profildaten
        } else {
            console.log("No such document!");
        }
    };

    if (currentUser) {
        getProfileDetails();
    }

    return () => {
        // Cleanup
    };
}, [currentUser]);

  return (
    <ThemeProvider theme={theme}>
    <div>            
      <BrowserRouter>
      <div className="home">
            {currentUser ? <Sidebar /> : <></>}
            <div className="homeContainer">
            {currentUser ? <Navbar profileData={profileData}/>  : <></>}
                   
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<New inputs={userInputs} />} />
          <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
          <Route path="/profile" element={<RequireAuth><Profile   profileData={profileData} /></RequireAuth>} />
          <Route path="/add/weight" element={<RequireAuth><AddWeight /></RequireAuth>} />
          <Route path="/add/workout" element={<RequireAuth><AddWorkout /></RequireAuth>} />
          <Route path="/history/workouts" element={<RequireAuth><HistoryWorkouts /></RequireAuth>} />
          <Route path="/history/weight" element={<RequireAuth><HistoryWeights /></RequireAuth>} />
          <Route path="/analyze/progress" element={<RequireAuth><Progress /></RequireAuth>} />
        </Routes>
        </div>
      </div>
      </BrowserRouter>
      </div>
      </ThemeProvider>
  );
}

export default App;
