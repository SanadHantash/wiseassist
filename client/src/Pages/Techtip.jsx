import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

function Techtip() {
  useEffect(() => {
    window.scrollTo(0, 0);
    <></>;
  }, []);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/alltechtips");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Header />
      <div
        class="text-gray-900 pt-12 pr-0 pb-14 pl-0 w-full "
        style={{ backgroundColor: "#F7F1EE " }}
      >
        <div class="w-full pt-4 pr-5 pb-6 pl-5 mt-0 mr-auto mb-0 ml-auto space-y-5 sm:py-8 md:py-12 sm:space-y-8 md:space-y-16 max-w-7xl">
          <div class="flex flex-col items-center sm:px-5 md:flex-row">
            <div class="flex flex-col items-start justify-center w-full h-full pt-6 pr-0 pb-6 pl-0 mb-6 md:mb-0 ">
              <div
                class="flex flex-col items-start justify-center h-full space-y-3 transform md:pr-10 lg:pr-16
            md:space-y-5"
              >
                <div
                  class="bg-indigo-950 flex items-center leading-none rounded-full text-gray-50 pt-1.5 pr-3 pb-1.5 pl-2
              uppercase "
                >
                  <p class="inline">
                    <svg
                      class="w-3.5 h-3.5 mr-1"
                      fill="currentColor"
                      viewbox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0
                  00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755
                  1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1
                  0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                  </p>
                  <p class="inline text-xs font-medium">New</p>
                </div>
                <p class="text-3xl font-bold leading-none lg:text-4xl xl:text-5xl">
                  Empower Your Tech Journey:
                  <br /> Unleashing Expert Tips and Tricks
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-screen-xl mx-auto p-16">
        <div class="sm:grid lg:grid-cols-3 sm:grid-cols-2 gap-10">
          {posts.map((post, index) => (
            <div
              key={index}
              class="hover:bg-indigo-950 hover:text-white transition duration-300 max-w-sm rounded overflow-hidden border border-solid shadow-lg"
            >
              <div class="py-4 px-8">
                <Link to={`/TipDetail/${post.id}`}>
                  <button>
                    <h4 class="text-lg mb-3 font-semibold">{post.title}</h4>
                  </button>{" "}
                </Link>
                <p class="mb-2 text-sm text-gray-600">
                  how to make the future better !!!!!{/* {post.short_detail} */}
                </p>
                <img src={post.image} class="w-full h-60" alt="" />
                <hr class="mt-4" />
                <span class="text-xs">ARTICLE</span>
                &nbsp;<span class="text-xs text-gray-500">PROCESS</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* 

      <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {posts.map((post, index) => (
            <a
              class="group rounded-xl  overflow-hidden dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              href="/"
            >
              <div
                key={index}
                class="relative pt-[50%] sm:pt-[70%] rounded-xl overflow-hidden"
              >
                <img
                  class="w-full h-full absolute top-0 start-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl"
                  src={post.image}
                  alt="Im"
                />
              </div>

              <div class="mt-7">
                <h3 class="text-xl font-semibold text-gray-800 group-hover:text-gray-600 dark:text-gray-200">
                  {post.title}
                </h3>
                <p class="mt-3 text-gray-800 dark:text-gray-200">
                  {post.short_detail}
                </p>
                <p class="mt-5 inline-flex items-center gap-x-1 text-blue-600 decoration-2 group-hover:underline font-medium">
                  <Link to={`/TipDetail`}>
                    <button class="mt-6 inline-block rounded-xl border-2 px-10 py-3 font-semibold border-white hover:bg-white hover:text-indigo-950">
                      {" "}
                      Read Now{" "}
                    </button>
                  </Link>
                  <svg
                    class="flex-shrink-0 w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </p>
              </div>
            </a>
          ))}
        </div>
      </div> */}
      <Footer />
    </>
  );
}

export default Techtip;
