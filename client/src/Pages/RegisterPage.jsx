import React, { useState } from "react";
import axios from "axios";
import background from "../assets/background.png";
import FormHeader from "../Components/FormHeader";
// import Cookies from "js-cookie";
import { useCookies } from "react-cookie";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function RegisterPage() {
  const [cookies, setCookie] = useCookies(["token"]);
  useState(() => {
    window.scrollTo(0, 0);
  }, []);
  const { isLoggedIn, login, logout, register } = useAuth();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    password: "",
    confirm_password: "",
    phonenumber: "",
    birthdate: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const validateForm = () => {
  //   let errors = {};
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!formData.email || !emailRegex.test(formData.email)) {
  //     errors.email = "Invalid email address";
  //   }

  //   if (!formData.password || formData.password.length < 8) {
  //     errors.password = "Password must be at least 8 characters long";
  //   }
  //   const jordanianPhoneNumberRegex = /^\+9627[789]\d{7}$/;

  //   if (!jordanianPhoneNumberRegex.test(formData.phonenumber)) {
  //     errors.phonenumber = "Not a valid Jordanian phone number";
  //   }

  //   return Object.keys(errors).length === 0;
  // };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-lone-blocks
    {
      try {
        const response = await axios.post(
          "http://localhost:8080/register",
          formData
        );
        const token = response.data.token;

        console.log("User registered successfully!");
        setCookie("Token", token, { path: "/" });
        navigate("/");
      } catch (error) {
        console.error("Error registering user:", error);

        if (error.response) {
          console.error("Server responded with status:", error.response.status);
          console.error("Response data:", error.response.data);
          setErrors(error.response.data.errors);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error setting up the request:", error.message);
        }
      }
    }
  };
  return (
    <>
      <Header />
      <div
        className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 "
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
        }}
      >
        <div className="max-w-md w-full space-y-8">
          <section class="bg-gray-50 dark:bg-gray-900 ">
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 py-8">
              <div class="p-6 sm:p-8  lg:py-0">
                <div class="flex flex-col   lg:py-0">
                  <FormHeader
                    heading="Signup to create an account"
                    paragraph="Already have an account? "
                    linkName="Login"
                    linkUrl="/login"
                  />
                  <form
                    class=" space-y-4 md:space-y-6 mb-10"
                    onSubmit={handleSubmit}
                  >
                    <div>
                      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Your FirstName
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        class="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-900 focus:border-indigo-900 focus:z-10 sm:text-sm"
                        placeholder="firstName"
                        required=""
                      />
                    </div>
                    <div>
                      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Your LastName
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        class="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-900 focus:border-indigo-900 focus:z-10 sm:text-sm"
                        placeholder="lastName"
                        required=""
                      />
                    </div>
                    <div>
                      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        UserName
                      </label>
                      <input
                        type="text"
                        name="user_name"
                        id="user_name"
                        value={formData.user_name}
                        onChange={handleInputChange}
                        class="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-900 focus:border-indigo-900 focus:z-10 sm:text-sm"
                        placeholder="username"
                        required=""
                      />
                      {/* {errors.user_name && (
                        <p className="text-red-500 tex t-xs mt-1">
                          {errors.user_name}
                        </p>
                      )} */}
                    </div>

                    <div>
                      <label
                        for="email"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        class="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-900 focus:border-indigo-900 focus:z-10 sm:text-sm"
                        placeholder="name@company.com"
                        required=""
                      />
                      {/* {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.email}
                        </p>
                      )} */}
                    </div>
                    <div>
                      <label
                        for="phonenumber"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Phone number
                      </label>
                      <input
                        type="tel"
                        id="phonenumber"
                        name="phonenumber"
                        value={formData.phonenumber}
                        onChange={handleInputChange}
                        class="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-900 focus:border-indigo-900 focus:z-10 sm:text-sm"
                        placeholder="+962799999999"
                        required
                      />
                      {/* {errors.phonenumber && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.phonenumber}
                        </p>
                      )} */}
                    </div>
                    {/* 
                    <div class="relative max-w-sm">
                      <label class="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Birth Date
                      </label>
                      <div class="absolute inset-y-0 left-0 flex items-center pl-3.5 pt-5 pointer-events-none">
                        <svg
                          class="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                        </svg>
                      </div>
                      <input
                        datepicker
                        type="text"
                        name="birthdate"
                        value={formData.birthdate}
                        onChange={handleInputChange}
                        class="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-900 focus:border-indigo-900 focus:z-10 sm:text-sm"
                        placeholder="Select date"
                      />
                    </div> */}

                    <div>
                      <label
                        for="password"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        class="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-900 focus:border-indigo-900 focus:z-10 sm:text-sm"
                        required=""
                      />
                      {/* {errors.password && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.password}
                        </p>
                      )} */}
                    </div>
                    <div>
                      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirm_password"
                        id="confirm_password"
                        value={formData.confirm_password}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        class="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-900 focus:border-indigo-900 focus:z-10 sm:text-sm"
                        required=""
                      />
                      {/* {errors.confirm_password && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.confirm_password}
                        </p>
                      )} */}
                    </div>
                    <button
                      type="submit"
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-950 hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
                    >
                      <span class="relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0">
                        Sign Up
                      </span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
export default RegisterPage;
