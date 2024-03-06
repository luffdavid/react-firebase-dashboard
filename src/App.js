import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import Profile from "./pages/profile/Profile";
import AddWorkout from "./pages/add/Add";
import WorkoutLog from "./pages/progress/WorkoutLog";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import "./style/dark.scss";
import { doc, getDoc } from "@firebase/firestore";
import { db } from "./firebase";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Signup from "./pages/signup/Signup";
import { userInputs } from "./formSource";
import ResponsiveNavigation from "./components/general/sidebar/ResponsiveNavigation";
import Navbar from "./components/general/navbar/Navbar";
import { grey } from "@mui/material/colors";
import { useWorkoutContext } from "./context/workouts/WorkoutContext";
import { getWorkouts } from "./services/api/workoutService";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const { workouts, setWorkouts } = useWorkoutContext();
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: {
            main: darkMode ? "#815eff" : "#6439FF",
          },
          secondary: {
            main: darkMode ? grey[500] : grey[600],
          },
          type: "light",
          background: {
            default: darkMode ? "#131313" : "rgb(242,241,246);",
          },
        },
      }),
    [darkMode]
  );

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  useEffect(() => {
    const getProfileDetails = async () => {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProfileData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };
    if (currentUser) {
      getProfileDetails();
    }
    return () => {
      // Cleanup: DO NOT DELETE THIS
    };
  }, [currentUser]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const workoutsData = await getWorkouts(currentUser.uid);
        const sortedWorkouts = workoutsData.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setWorkouts(sortedWorkouts);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    fetchData();
  }, [currentUser.uid, setWorkouts]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={darkMode ? "app dark" : "app"}>
        <BrowserRouter>
          <div className="">
            {currentUser ? <ResponsiveNavigation /> : <></>}
            <div className="homeContainer">
              {currentUser ? (
                <Navbar profileData={profileData} isDarkMode={darkMode} />
              ) : (
                <></>
              )}
              <Routes>
                <Route
                  path="/login"
                  element={!currentUser ? <Login /> : <Navigate to="/" />}
                />
                <Route
                  path="/signup"
                  element={
                    !currentUser ? (
                      <Signup inputs={userInputs} />
                    ) : (
                      <Navigate to="/" />
                    )
                  }
                />
                <Route
                  path="/"
                  element={
                    <RequireAuth>
                      <Dashboard
                        profileData={profileData}
                        workouts={workouts}
                      />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <RequireAuth>
                      <Profile profileData={profileData} />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/add/workout"
                  element={
                    <RequireAuth>
                      <AddWorkout />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/progress/workouts"
                  element={
                    <RequireAuth>
                      <WorkoutLog />
                    </RequireAuth>
                  }
                />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
