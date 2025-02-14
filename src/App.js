import { doc, getDoc } from "@firebase/firestore";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import StartingApp from "./components/general/StartingApp/StartingApp";
import Navbar from "./components/general/navbar/Navbar";
import ResponsiveNavigation from "./components/general/sidebar/ResponsiveNavigation";
import { AuthContext } from "./context/AuthContext";
import { DarkModeContext } from "./context/darkModeContext";
import { useWorkoutContext } from "./context/workouts/WorkoutContext";
import { db } from "./firebase";
import { userInputs } from "./formSource";
import AddWorkout from "./pages/add/Add";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Progress from "./pages/progress/Progress";
import Signup from "./pages/signup/Signup";
import { getWeightMeasurements } from "./services/api/weightService";
import { getWorkouts } from "./services/api/workoutService";
import "./style/dark.scss";

function App() {
  const [showLogo, setShowLogo] = useState(true);
  const { darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const { workouts, setWorkouts } = useWorkoutContext();
  const [weights, setWeights] = useState(null);
  const [workoutsLoading, setWorkoutsLoading] = useState(false);
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
    const timeout = setTimeout(() => {
      setShowLogo(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const getProfileDetails = async () => {
      const docRef = doc(db, "users", currentUser?.uid);
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
    const fetchWorkoutData = async () => {
      try {
        const weightsData = await getWeightMeasurements(currentUser?.uid);
        const sortedWeights = weightsData.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setWeights(sortedWeights);
      } catch (error) {
        console.error("Error fetching weights:", error);
      }
    };

    fetchWorkoutData();
  }, [currentUser?.uid, setWeights]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setWorkoutsLoading(true);
        const workoutsData = await getWorkouts(currentUser?.uid);
        const sortedWorkouts = workoutsData.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setWorkouts(sortedWorkouts);
        setWorkoutsLoading(false);
      } catch (error) {
        console.error("Error fetching workouts:", error);
        setWorkoutsLoading(false);
      }
    };

    fetchData();
  }, [currentUser?.uid, setWorkouts]);

  return (
    <div>
      {showLogo ? (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div style={{ height: "100vh" }}>
            <StartingApp />
          </div>
        </ThemeProvider>
      ) : (
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
                            weights={weights}
                            workoutsLoading={workoutsLoading}
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
                      path="/add"
                      element={
                        <RequireAuth>
                          <AddWorkout />
                        </RequireAuth>
                      }
                    />
                    <Route
                      path="/progress"
                      element={
                        <RequireAuth>
                          <Progress
                            workouts={workouts}
                            weights={weights}
                            workoutsLoading={workoutsLoading}
                          />
                        </RequireAuth>
                      }
                    />
                  </Routes>
                </div>
              </div>
            </BrowserRouter>
          </div>
        </ThemeProvider>
      )}
    </div>
  );
}

export default App;
