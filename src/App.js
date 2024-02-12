import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
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

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<New inputs={userInputs} />} />
          <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
          <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
          <Route path="/add/weight" element={<RequireAuth><AddWeight /></RequireAuth>} />
          <Route path="/add/workout" element={<RequireAuth><AddWorkout /></RequireAuth>} />
          <Route path="/history/workouts" element={<RequireAuth><HistoryWorkouts /></RequireAuth>} />
          <Route path="/history/weight" element={<RequireAuth><HistoryWeights /></RequireAuth>} />
          <Route path="/analyze/progress" element={<RequireAuth><Progress /></RequireAuth>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
