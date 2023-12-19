import React, { useState } from "react";
import logo2 from "../Assets/logo2.png";
import Stats from "./Stats";
import Users from "./Users";
import CoursesTable from "./CoursesTable";
import Workshops from "./Workshops";

function SidebarDash() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      <div>
        {/* <div
          class="fixed inset-0  z-40 flex h-screen bg-gray-100 md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div
            class="fixed inset-0 bg-gray-600 bg-opacity-75"
            aria-hidden="true"
          ></div>

          <div class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 lg:bg-indigo-950">
            <div class="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span class="sr-only">Close sidebar</span>

                <svg
                  class="h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div class="flex-shrink-0 flex items-center px-4">
              <img class="h-8 w-auto" src={logo2} alt="Workflow" />
            </div>
            <div class="mt-5 flex-1 h-0 overflow-y-auto">
              <nav class="px-2 space-y-1 bg-indigo-950">
                <a
                  href="/"
                  class="bg-indigo-950 text-white group flex items-center px-2 py-2 text-base font-medium rounded-md"
                >
                  <svg
                    class="mr-4 flex-shrink-0 h-6 w-6 text-indigo-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Dashboard
                </a>

                <a
                  href="/"
                  class="text-indigo-100 hover:bg-indigo-600 group flex items-center px-2 py-2 text-base font-medium rounded-md"
                >
                  <svg
                    class="mr-4 flex-shrink-0 h-6 w-6 text-indigo-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  Team
                </a>

                <a
                  href="/"
                  class="text-indigo-100 hover:bg-indigo-600 group flex items-center px-2 py-2 text-base font-medium rounded-md"
                >
                  <svg
                    class="mr-4 flex-shrink-0 h-6 w-6 text-indigo-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                  </svg>
                  Projects
                </a>

                <a
                  href="/"
                  class="text-indigo-100 hover:bg-indigo-600 group flex items-center px-2 py-2 text-base font-medium rounded-md"
                >
                  <svg
                    class="mr-4 flex-shrink-0 h-6 w-6 text-indigo-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Calendar
                </a>

                <a
                  href="/"
                  class="text-indigo-100 hover:bg-indigo-600 group flex items-center px-2 py-2 text-base font-medium rounded-md"
                >
                  <svg
                    class="mr-4 flex-shrink-0 h-6 w-6 text-indigo-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                  Documents
                </a>

                <a
                  href="/"
                  class="text-indigo-100 hover:bg-indigo-600 group flex items-center px-2 py-2 text-base font-medium rounded-md"
                >
                  <svg
                    class="mr-4 flex-shrink-0 h-6 w-6 text-indigo-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  Reports
                </a>
              </nav>
            </div>
          </div>

          <div class="flex-shrink-0 w-14" aria-hidden="true"></div>
        </div> */}

        <div class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          <div
            class="flex flex-col flex-grow  overflow-y-auto "
            style={{ backgroundColor: "#F7F1EE " }}
          >
            <div class="flex items-center flex-shrink-0 px-2">
              <img class="h-25 w-45" src={logo2} alt="WiseAssist" />
            </div>
            <hr />
            <div
              class=" flex-1 flex flex-col "
              style={{ backgroundColor: "#F7F1EE " }}
            >
              <nav class="flex-1 px-2 pb-4 ">
                <button
                  href="/"
                  class="text-indigo-950 hover:bg-indigo-950 hover:text-white group flex items-center px-5 py-2  w-full  text-sm font-medium rounded-md"
                >
                  Dashboard
                </button>

                <button
                  href="/"
                  class="text-indigo-950 hover:bg-indigo-950 hover:text-white group flex items-center px-5 py-2   w-full text-sm font-medium rounded-md"
                >
                  Users
                </button>

                <button
                  href="/"
                  class="text-indigo-950 hover:bg-indigo-950 hover:text-white group flex items-center px-5 py-2  w-full  text-sm font-medium rounded-md"
                >
                  Courses
                </button>

                <button
                  href="/"
                  class="text-indigo-950 hover:bg-indigo-950 hover:text-white group flex items-center px-5 py-2  w-full  text-sm font-medium rounded-md"
                >
                  Workshops
                </button>

                <button
                  href="/"
                  class="text-indigo-950 hover:bg-indigo-950 hover:text-white group flex items-center px-5 py-2  w-full  text-sm font-medium rounded-md"
                >
                  TechTips
                </button>

                <button
                  href="/"
                  class="text-indigo-950 hover:bg-indigo-950 hover:text-white group flex items-center px-5 py-2  w-full  text-sm font-medium rounded-md"
                >
                  Comments
                </button>
                <button
                  href="/"
                  class="text-indigo-950 hover:bg-indigo-950 hover:text-white group flex items-center px-5 py-2  w-full  text-sm font-medium rounded-md"
                >
                  Faq
                </button>
                <button
                  href="/"
                  class="text-indigo-950 hover:bg-indigo-950 hover:text-white group flex items-center px-5 py-2  w-full text-sm font-medium rounded-md"
                >
                  Logout
                </button>
              </nav>
            </div>
          </div>
        </div>
        <div class="md:pl-64 flex flex-col flex-1">
          <div class="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
            <button
              type="button"
              class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            >
              <span class="sr-only">Open sidebar</span>

              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </button>
          </div>

          <main>
            <div class="py-6">
              <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
              </div>
              <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {/* <!-- Replace with your content --> */}
                <Stats />
                <Users />
                <CoursesTable />
                <Workshops />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default SidebarDash;
