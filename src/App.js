import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import Profile from "./pages/profile/Profile";
import AddWeight from "./pages/add/AddWeight";
import AddWorkout from "./pages/add/AddWorkout";
import HistoryWorkouts from "./pages/progress/HistoryWorkouts";
import HistoryWeights from "./pages/progress/HistoryWeights";
import Home from "./pages/dashboard/Home";
import Login from "./pages/login/Login";
import New from "./pages/signup/New";
import { userInputs } from "./formSource"; 
import "./style/dark.scss";
import Navbar from "./components/navbar/Navbar";
import { doc, getDoc } from "@firebase/firestore";
import { db } from "./firebase";
import Sidebar from "./components/sidebar/Sidebar";
import { CssBaseline, ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import {PRIMARY} from "./components/reusable/Main"
import MobileBar from "./components/sidebar/MobileBar";
import ResponsiveNavigation from "./components/sidebar/ResponsiveNavigation";
function App() {
  const { darkMode } = useContext(DarkModeContext);
  const isTabletOrBigger = useMediaQuery('(min-width: 768px)');
  
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: {
            main: darkMode ? '#815eff' : "#6439FF",
          },
          // error: {
          //   main: '#CF6679', // Ändere diese Farbe entsprechend deiner Präferenz
          // },
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
      <CssBaseline />
     <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
      <div className="">
        {/* //home */}
             {currentUser ? <ResponsiveNavigation  /> : <></>} 
            {/* {currentUser ? <MobileBar/> : <></>} */}
            <div className="homeContainer">
            {currentUser ? <Navbar profileData={profileData} isDarkMode={darkMode}/>  : <></>}
                   
        <Routes>
          <Route path="/login"  element={!currentUser ? <Login/> : <Navigate to="/" />} />
          <Route path="/signup" element={!currentUser ? <New inputs={userInputs} /> : <Navigate to="/" />} />
          <Route path="/" element={<RequireAuth><Home profileData={profileData}/></RequireAuth>} />
          <Route path="/profile" element={<RequireAuth><Profile   profileData={profileData} /></RequireAuth>} />
          <Route path="/add/workout" element={<RequireAuth><AddWorkout /></RequireAuth>} />
          
          <Route path="/progress/workouts" element={<RequireAuth><HistoryWorkouts /></RequireAuth>} />
          <Route path="/progress/weight" element={<RequireAuth><HistoryWeights /></RequireAuth>} />
        </Routes>
        </div>
      </div>
      </BrowserRouter>
      </div>
      </ThemeProvider>
  );
}

export default App;
