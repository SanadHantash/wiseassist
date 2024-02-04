import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function OurServices() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div class="container relative flex flex-col justify-between h-full max-w-6xl px-10 mx-auto xl:px-0 mt-5">
      <h2 class="mb-1 text-3xl  text-center font-extrabold leading-tight text-gray-900">
        Services
      </h2>
      <p class="mb-12 text-lg text-center text-gray-500">
        Here is a few of the awesome Services we provide.
      </p>
      <div class="w-full" id="service">
        <div class="flex flex-col w-full mb-10 sm:flex-row">
          <div data-aos="fade-up" class="w-full mb-10 sm:mb-0 sm:w-1/2">
            <div class="relative h-full ml-0 mr-0 sm:mr-10">
              <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-[#522883] rounded-lg"></span>
              <div class="relative h-full p-5 bg-white border-2 border-[#522883] rounded-lg">
                <div class="flex items-center -mt-1">
                  <h3 class="my-2 ml-3 text-lg font-bold text-gray-800">
                    Digital Literacy Training
                  </h3>
                </div>
                <p class="mt-3 mb-1 text-xs font-medium text-[#522883] uppercase">
                  ------------
                </p>
                <p class="mb-2 text-gray-600">
                  Provide training and resources to improve digital literacy,
                  covering topics like using social media, online shopping, and
                  video conferencing.
                </p>
              </div>
            </div>
          </div>
          <div data-aos="fade-up" class="w-full sm:w-1/2">
            <div class="relative h-full ml-0 md:mr-10">
              <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-[#522883] rounded-lg"></span>
              <div class="relative h-full p-5 bg-white border-2 border-[#522883] rounded-lg">
                <div class="flex items-center -mt-1">
                  <h3 class="my-2 ml-3 text-lg font-bold text-gray-800">
                    FAQ Service
                  </h3>
                </div>
                <p class="mt-3 mb-1 text-xs font-medium text-[#522883] uppercase">
                  ------------
                </p>
                <p class="mb-2 text-gray-600">
                  Our FAQ section aims to simplify complex tech-related
                  questions with easy-to-understand explanations.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div data-aos="fade-up" class="flex flex-col w-full mb-5 sm:flex-row">
          <div class="w-full mb-10 sm:mb-0 sm:w-1/2">
            <div class="relative h-full ml-0 mr-0 sm:mr-10">
              <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-[#522883] rounded-lg"></span>
              <div class="relative h-full p-5 bg-white border-2 border-[#522883] rounded-lg">
                <div class="flex items-center -mt-1">
                  <h3 class="my-2 ml-3 text-lg font-bold text-gray-800">
                    Customer Testimonials
                  </h3>
                </div>
                <p class="mt-3 mb-1 text-xs font-medium text-[#522883] uppercase">
                  ------------
                </p>
                <p class="mb-2 text-gray-600">
                  Showcase success stories to build trust and credibility.
                </p>
              </div>
            </div>
          </div>
          <div data-aos="fade-up" class="w-full mb-10 sm:mb-0 sm:w-1/2">
            <div class="relative h-full ml-0 mr-0 sm:mr-10">
              <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-[#522883] rounded-lg"></span>
              <div class="relative h-full p-5 bg-white border-2 border-[#522883] rounded-lg">
                <div class="flex items-center -mt-1">
                  <h3 class="my-2 ml-3 text-lg font-bold text-gray-800">
                    Monthly/Annual Plans
                  </h3>
                </div>
                <p class="mt-3 mb-1 text-xs font-medium text-[#522883] uppercase">
                  ------------
                </p>
                <p class="mb-2 text-gray-600">
                  Provide subscription options for ongoing assistance.
                </p>
              </div>
            </div>
          </div>
          <div data-aos="fade-up" class="w-full sm:w-1/2">
            <div class="relative h-full ml-0 md:mr-10">
              <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-[#522883] rounded-lg"></span>
              <div class="relative h-full p-5 bg-white border-2 border-[#522883] rounded-lg">
                <div class="flex items-center -mt-1">
                  <h3 class="my-2 ml-3 text-lg font-bold text-gray-800">
                    Chatbot Services
                  </h3>
                </div>
                <p class="mt-3 mb-1 text-xs font-medium text-[#522883] uppercase">
                  ------------
                </p>
                <p class="mb-2 text-gray-600">
                  Offer a user-friendly chatbot for immediate tech support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurServices;
