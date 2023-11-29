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
              <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-indigo-500 rounded-lg"></span>
              <div class="relative h-full p-5 bg-white border-2 border-indigo-500 rounded-lg">
                <div class="flex items-center -mt-1">
                  <h3 class="my-2 ml-3 text-lg font-bold text-gray-800">
                    Tech Support and Troubleshooting
                  </h3>
                </div>
                <p class="mt-3 mb-1 text-xs font-medium text-indigo-500 uppercase">
                  ------------
                </p>
                <p class="mb-2 text-gray-600">
                  Support sections or resources offering solutions and
                  troubleshooting guides for common problems users face with
                  their gadgets
                </p>
              </div>
            </div>
          </div>
          <div data-aos="fade-up" class="w-full sm:w-1/2">
            <div class="relative h-full ml-0 md:mr-10">
              <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-indigo-700 rounded-lg"></span>
              <div class="relative h-full p-5 bg-white border-2 border-indigo-700 rounded-lg">
                <div class="flex items-center -mt-1">
                  <h3 class="my-2 ml-3 text-lg font-bold text-gray-800">
                    Accessories and Add-ons
                  </h3>
                </div>
                <p class="mt-3 mb-1 text-xs font-medium text-indigo-700 uppercase">
                  ------------
                </p>
                <p class="mb-2 text-gray-600">
                  Recommendations and information on accessories, peripherals,
                  and add-ons that complement various gadgets, enhancing the
                  user experience.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div data-aos="fade-up" class="flex flex-col w-full mb-5 sm:flex-row">
          <div class="w-full mb-10 sm:mb-0 sm:w-1/2">
            <div class="relative h-full ml-0 mr-0 sm:mr-10">
              <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-indigo-800 rounded-lg"></span>
              <div class="relative h-full p-5 bg-white border-2 border-indigo-800 rounded-lg">
                <div class="flex items-center -mt-1">
                  <h3 class="my-2 ml-3 text-lg font-bold text-gray-800">
                    Search and Filter Tools
                  </h3>
                </div>
                <p class="mt-3 mb-1 text-xs font-medium text-indigo-800 uppercase">
                  ------------
                </p>
                <p class="mb-2 text-gray-600">
                  Simple and effective search functionality with filters to
                  narrow down gadget choices based on price, brand,
                  specifications, etc
                </p>
              </div>
            </div>
          </div>
          <div data-aos="fade-up" class="w-full mb-10 sm:mb-0 sm:w-1/2">
            <div class="relative h-full ml-0 mr-0 sm:mr-10">
              <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-indigo-900 rounded-lg"></span>
              <div class="relative h-full p-5 bg-white border-2 border-indigo-900 rounded-lg">
                <div class="flex items-center -mt-1">
                  <h3 class="my-2 ml-3 text-lg font-bold text-gray-800">
                    Newsletter Subscription
                  </h3>
                </div>
                <p class="mt-3 mb-1 text-xs font-medium text-indigo-900 uppercase">
                  ------------
                </p>
                <p class="mb-2 text-gray-600">
                  Offering a newsletter that provides subscribers with the
                  latest tech news, deals, and updates.
                </p>
              </div>
            </div>
          </div>
          <div data-aos="fade-up" class="w-full sm:w-1/2">
            <div class="relative h-full ml-0 md:mr-10">
              <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-indigo-950 rounded-lg"></span>
              <div class="relative h-full p-5 bg-white border-2 border-indigo-950 rounded-lg">
                <div class="flex items-center -mt-1">
                  <h3 class="my-2 ml-3 text-lg font-bold text-gray-800">
                    Deals and Discounts
                  </h3>
                </div>
                <p class="mt-3 mb-1 text-xs font-medium text-indigo-950 uppercase">
                  ------------
                </p>
                <p class="mb-2 text-gray-600">
                  Highlighting special deals, discounts, and offers on gadgets
                  from various retailers or e-commerce platforms. This helps
                  users find good deals on their desired gadgets.
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
