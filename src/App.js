import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { Selection_page } from "./pages/Selection_page";
import { Squat } from "./pages/Squats";
import { Bic_curl } from "./pages/Bicep";
import { Shoulder } from "./pages/Shoulder_press";
import { Tricep } from "./pages/Triceps";
import { LoginPage } from "./pages/Login_Page";
import { About } from "./pages/AboutPage";
import { MyWorkout } from "./pages/MyWorkout";
import { Profile } from "./pages/Profile";
import { LateralRaises } from "./pages/LateralRaises";
import { Plank } from "./pages/Plank";
import { UserContext, UserProvider } from "./UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/selection" element={<Selection_page />} />
          <Route path="/shoulder" element={<Shoulder />} />
          <Route path="/bic" element={<Bic_curl />} />
          <Route path="/squat" element={<Squat />} />
          <Route path="/tri" element={<Tricep />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/About" element={<About />} />
          <Route path="/MyWorkout" element={<MyWorkout />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/LateralRaises" element={<LateralRaises />} />
          <Route path="/Crunch" element={<Plank />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
