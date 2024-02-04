import React, { useState } from "react";
import background from "../assets/background.png";

import axios from "axios";
import { useNavigate } from "react-router-dom";

function VerifyCode() {
  const [verificationCode, setVerificationCode] = useState([]);
  const navigate = useNavigate();

  const handleVerificationCodeSubmit = async (e) => {
    e.preventDefault();
    try {
      let codeAsString = "";
      for (let i = 0; i < 6; i++) {
        const inputFieldName = `code${i}`;
        const inputFieldValue = e.target.elements[inputFieldName].value;
        codeAsString += inputFieldValue;
      }
      console.log("Verification code sent:", codeAsString);

      const response = await axios.post("http://localhost:8080/verifycode", {
        code: codeAsString,
      });

      navigate("/reset-password");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data); // Server response data
        console.log(error.response.status); // Server status code
        console.log(error.response.headers); // Server headers
      } else {
        console.log("Error message:", error.message); // General error message
      }
    }
  };
  return (
    <div
      className="flex justify-center items-center min-h-screen  py-12"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
      }}
    >
      <div className="bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="flex flex-col items-center justify-center text-center space-y-2">
          <div className="font-semibold text-3xl">
            <p>Email Verification</p>
          </div>
          <div className="flex flex-row text-sm font-medium text-gray-400">
            <p>We have sent a code to your email ba**@dipainhouse.com</p>
          </div>
        </div>

        <form onSubmit={handleVerificationCodeSubmit}>
          <div className="grid grid-cols-6 gap-4 mt-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="w-16 h-16">
                <input
                  className="w-full h-full flex items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                  type="text"
                  name={`code${index}`}
                  value={verificationCode[index] || ""}
                  onChange={(e) => {
                    const updatedCode = [...verificationCode];
                    updatedCode[index] = e.target.value;
                    setVerificationCode(updatedCode);
                  }}
                  maxLength={1}
                  required
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col space-y-5 mt-8">
            <div>
              <button className="flex items-center justify-center w-full border rounded-xl outline-none py-5 bg-indigo-950 border-none text-white text-sm shadow-sm">
                Verify Account
              </button>
            </div>

            <div className="flex items-center justify-center text-sm font-medium space-x-1 text-gray-500">
              <p>Didn't receive code?</p>{" "}
              <a
                className="flex items-center text-indigo-950"
                href="http://"
                target="_blank"
                rel="noopener noreferrer"
              >
                Resend
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VerifyCode;
