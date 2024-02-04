import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";

export default function GoolgeSignInButton() {
  const navigate = useNavigate();

  const [userGoogle, setUserGoogle] = useState([]);

  console.log(userGoogle);
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUserGoogle(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    console.log("userGoogle:", userGoogle);

    if (userGoogle.access_token) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userGoogle.access_token}`
        )
        .then(async (res) => {
          console.log("Google User Info:", res.data);

          try {
            const response = await axios.post(
              "http://localhost:8080/google",
              res.data
            );
            console.log("Server response:", response.data);

            const token = response.data.token;
            console.log("Token:", token);

            // Make sure the token is not undefined or null before storing it
            if (token) {
              // Save the token in a cookie named 'token' with an expiry of 1 day (you can change the expiry time)
              Cookies.set("token", token, { expires: 1 });
              navigate("/");
            }

            // Rest of your code...
          } catch (error) {
            console.log("Error:", error);
          }
        })
        .catch((err) => console.log("Google User Info Error:", err.message));
    }
  }, [userGoogle, navigate]);

  return (
    <>
      <div class="flex items-center justify-between mt-4">
        <span class="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

        <a
          href="/"
          class="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
        >
          or login with Social Media
        </a>

        <span class="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
      </div>
      <button
        id="google-sign-in"
        className="w-full bg-white font-bold  border border-solid mt-4  shadow-sm rounded py-3 text-gray-900 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
        onClick={() => login()}
      >
        <div className="bg-white p-2 rounded-full">
          <svg className="w-4" viewBox="0 0 533.5 544.3">
            <path
              d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
              fill="#4285f4"
            />
            <path
              d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
              fill="#34a853"
            />
            <path
              d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
              fill="#fbbc04"
            />
            <path
              d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
              fill="#ea4335"
            />
          </svg>
        </div>
        <span className="ml-4">Sign-In with Google</span>
      </button>
    </>
  );
}
