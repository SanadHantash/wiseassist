import React from "react";
import { Link } from "react-router-dom";
// import hero from "../assets/hero.jpg";
import hero1 from "../assets/hero1.png";

function Hero() {
  return (
    <section
      className="relative  bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${hero1})`,
        height: "500px",
      }}
    >
      <div className="relative  mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:px-8">
        <div className="max-w-xl text-left ltr:sm:text-left ">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Welcome to WiseAssist!
          </h1>

          <p className="mt-4 max-w-lg sm:text-xl/relaxed">
            Thank you for choosing WiseAssist. We look forward to being your
            trusted partner on your tech journey. Let's navigate the digital
            landscape together!".
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-center">
            <Link to="">
              <button className="block w-full rounded bg-indigo-950 px-12 py-3 text-sm font-medium text-white shadow hover:bg-indigo-900 focus:outline-none focus:ring active:bg-indigo-900 sm:w-auto">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
