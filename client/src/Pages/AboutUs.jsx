import React, { useState, useEffect } from "react";
import OurServices from "../Components/OurServices";

import about from "../assets/about.jpg";
import AOS from "aos";
import "aos/dist/aos.css";

function AboutUs() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <section
        class="flex items-center mt-10 xl:h-screen font-poppins dark:bg-gray-800 "
        style={{ backgroundColor: "#d5c5df " }}
      >
        <div class="justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
          <div class="flex flex-wrap ">
            <div class="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
              <div data-aos="fade-right" class="relative lg:max-w-md">
                <img
                  src={about}
                  alt="about"
                  class="relative rounded-3xl z-10 object-cover w-full  h-96"
                />
                <div
                  data-aos="fade-left"
                  class="absolute bottom-0 right-0 z-10 p-8 bg-white border-4 border-indigo-950 rounded shadow  lg:-mb-8 lg:-mr-11 sm:p-8 dark:text-gray-300 dark:bg-gray-800 "
                >
                  <p class="text-lg font-semibold md:w-72">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      class="absolute top-0 left-0 w-16 h-16 text-indigo-950  opacity-10"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z"></path>
                    </svg>{" "}
                    "Empowering wisdom through technology, bridging generations
                    one click at a time."
                  </p>
                </div>
              </div>
            </div>
            <div
              data-aos="fade-left"
              class="w-full px-6 mb-10 lg:w-1/2 lg:mb-0 "
            >
              <div class="pl-4 mb-6 border-l-4 border-indigo-950 ">
                <span class="text-sm text-gray-600 uppercase dark:text-gray-400">
                  Who we are?
                </span>
                <h1 class="mt-2 text-3xl font-black text-indigo-950 md:text-5xl ">
                  About Us
                </h1>
              </div>
              <p class="mb-6 text-base leading-7 text-indigo-950 ">
                Welcome to WiseAssist! At WiseAssist, we understand the unique
                challenges that technology presents for seniors. Our mission is
                to empower older adults to embrace and harness the power of
                technology, making it an accessible and enjoyable part of their
                lives. With decades of experience in both technology and senior
                care, our team of dedicated experts brings a wealth of knowledge
                and patience to assist you every step of the way.
                <br /> We're honored to be a part of your tech journey and look
                forward to supporting you every step of the way. Let's embrace
                technology together! The ElderTech Support Team
              </p>
            </div>
          </div>
        </div>
      </section>
      <OurServices />
    </>
  );
}

export default AboutUs;
