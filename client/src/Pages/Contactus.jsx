import React, { useState, useEffect } from "react";
import contact from "../assets/contact.jpg";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Faq from "../Components/Faq";

function Contactus() {
  const [isSignIn, setSignin] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  return (
    <>
      <Header
        setSignin={setSignin}
        setAdmin={setAdmin}
        isAdmin={isAdmin}
        isSignIn={isSignIn}
      />
      <div
        className="w-full dark:bg-gray-500"
        style={{
          width: "100%",
          backgroundImage: `url(${contact})`,
          backgroundPosition: "center center",
          backgroundBlendMode: "multiply",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-transparent to-transparent"></div>
        <div className="container  h-[20rem] sm:h-[22rem]  flex flex-col sm:flex-col md:flex-col  flex-wrap content-center justify-center ">
          <h1 className=" z-10 text-5xl py-5 antialiased font-semibold leadi text-center">
            How May We Help You?
          </h1>

          <div className="flex flex-row z-10">
            <input
              type="text"
              placeholder="Ask Us :)"
              className="w-full sm:w-2/3 p-3 rounded-l-lg "
              fdprocessedid="j22ud"
            />
            <button
              type="button"
              className="w-full sm:w-1/3 p-3 font-semibold bg-indigo-950 text-white  rounded-r-lg "
              fdprocessedid="8d0pnm"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <Faq />
      <Footer />
    </>
  );
}

export default Contactus;
