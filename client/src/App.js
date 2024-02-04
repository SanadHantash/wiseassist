import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import Home from "./Pages/Home";
import Workshops from "./Pages/Workshops";
import Techtip from "./Pages/Techtip";
import Subscribe from "./Pages/Subscribe";
import TipDetail from "./Pages/TipDetail";
import Subscription from "./Pages/Subscription";

import Courses from "./Pages/Courses";
import Coursesdetails from "./Pages/Coursesdetails";

import AboutUs from "./Pages/AboutUs";
import WorkshopDetails from "./Pages/WorkshopDetails";

import NotFound from "./Pages/NotFound";
import Profile from "./Pages/Profile";
import EmailForgot from "./Pages/EmailForgot";
import VerifyCode from "./Pages/VerifyCode";
import ResetPass from "./Pages/ResetPass";
import CoursesOnsite from "./Pages/CoursesOnsite";
import Success from "./Pages/Success";
import PremiumSubscribe from "./Components/CheckoutForm";
import Contact from "./Pages/Contact";
import Contactus from "./Pages/Contactus";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

import { useAuth } from "./Context/AuthContext";
function App() {
  const { isLoggedIn } = useAuth();
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/workshop" element={<Workshops />} />

            {isLoggedIn ? (
              <>
                <Route path="/profile" element={<Profile />} />
              </>
            ) : (
              <Route path="/profile" element={<LoginPage />} />
            )}
            <>
              <Route path="/techtips" element={<Techtip />} />
            </>
            <Route path="/TipDetail/:id" element={<TipDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<Contactus />} />
            <Route path="/pricing" element={<Subscribe />} />
            <Route path="/subscribe" element={<Subscription />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courseDetails/:id" element={<Coursesdetails />} />
            <Route
              path="/onsiteCourseDetails/:id"
              element={<CoursesOnsite />}
            />
            <Route path="/workshopsDetail/:id" element={<WorkshopDetails />} />
            <Route path="/emailForgot" element={<EmailForgot />} />
            <Route path="/verify-code" element={<VerifyCode />} />
            <Route path="/reset-password" element={<ResetPass />} />
            <Route path="/premium-subscribe" element={<PremiumSubscribe />} />
            <Route path="/successs" element={<Success />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
