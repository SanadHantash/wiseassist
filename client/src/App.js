import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import Home from "./Pages/Home";
import Workshops from "./Pages/Workshops";
import Techtip from "./Pages/Techtip";
import Subscribe from "./Pages/Subscribe";
import TipDetail from "./Pages/TipDetail";
import Contactus from "./Pages/Contactus";
import Subscription from "./Pages/Subscription";

import Courses from "./Pages/Courses";
import Coursesdetails from "./Pages/Coursesdetails";

import AboutUs from "./Pages/AboutUs";
import WorkshopDetails from "./Pages/WorkshopDetails";
import Dashboard from "./Dashboard/pages/Dashboard";
import NotFound from "./Pages/NotFound";
import Profile from "./Pages/Profile";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            {/* {isSignIn ? (
            <Route path="/ProfilePage" element={<ProfilePage />} />
          ) : (
            <Route path="/ProfilePage" element={<NotFound />} />
          )}
        
          <Route path="/cart" element={<CartsPage />} />

          {isAdmin && isSignIn ? (
            <Route path="/Dashboard" element={<Dashboard />} />
          ) : (
            <Route path="/Dashboard" element={<NotFound />} />
          )} */}
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/workshop" element={<Workshops />} />
            <Route path="/techtips" element={<Techtip />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="/TipDetail/:id" element={<TipDetail />} />
            <Route path="/contact" element={<Contactus />} />
            <Route path="/pricing" element={<Subscribe />} />
            <Route path="/subscribe" element={<Subscription />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courseDetails/:id" element={<Coursesdetails />} />
            <Route path="/workshopsDetail/:id" element={<WorkshopDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
