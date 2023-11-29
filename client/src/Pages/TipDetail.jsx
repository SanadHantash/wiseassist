import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// import facebook from "../assets/facebook.webp";
// import { Link } from "react-router-dom";

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import CommentTechTips from "../Components/CommentTechTips";

function TipDetail() {
  useEffect(() => {
    window.scrollTo(0, 0);
    <></>;
  }, []);
  const [posts, setPosts] = useState([]);
  let { id } = useParams();
  useEffect(() => {
    const fetchTechDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/techtipdetail/${id}`
        );
        setPosts(response.data); // Update state using setPosts, not posts
        console.log("API response:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTechDetails();
  }, [id]);

  console.log("techTipData:", posts);
  return (
    <>
      <Header />
      <div style={{ width: "100%" }}>
        <div class=" flex justify-center ">
          <div class="px-4 sm:px-6 lg:px-8 w-full lg:w-3/4 ">
            <div class="lg:col-span-2">
              <div class="py-8  lg:pe-8 w-full">
                <div class="space-y-5 lg:space-y-8">
                  <a
                    class="inline-flex items-center gap-x-1.5 text-sm text-indigo-950 decoration-2 hover:underline dark:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    href="/"
                  >
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
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                    Back to Blog
                  </a>

                  <h2 class="text-2xl font-bold text-indigo-950 lg:text-5xl dark:text-white">
                    {posts.course && posts.course[0].title
                      ? posts.course[0].title
                      : "Title Not Available"}
                  </h2>
                  <br />

                  <p class="text-3xl text-gray-800 dark:text-gray-200">
                    {posts.course && posts.course[0].short_detail
                      ? posts.course[0].short_detail
                      : "Title Not Available"}
                  </p>

                  {/* <p class="text-lg text-gray-800 dark:text-gray-200">
                    {posts.course && posts.course[0].detail
                      ? posts.course[0].detail
                      : "Title Not Available"}
                  </p> */}

                  <div class="text-center">
                    <div class="grid lg:grid-cols-1 gap-3">
                      <div class="grid grid-cols-1 lg:grid-cols-1 gap-3">
                        <figure class="relative w-full h-60">
                          <img
                            class="w-full h-full absolute top-0 start-0 object-cover rounded-xl"
                            src={
                              posts.course && posts.course[0].image
                                ? posts.course[0].image
                                : "Detail Not Available"
                            }
                            alt="/"
                          />
                        </figure>
                      </div>
                    </div>
                  </div>

                  <blockquote class="text-center p-4 sm:px-7"></blockquote>

                  <div class="space-y-3">
                    <h3 class="text-2xl font-semibold dark:text-white">
                      Here's how to hide memories in the Facebook mobile app.{" "}
                    </h3>
                  </div>

                  <p class="text-lg text-gray-800 dark:text-gray-200">
                    {posts.course && posts.course[0].detail
                      ? posts.course[0].detail
                      : "Title Not Available"}
                  </p>
                  <hr />
                  <CommentTechTips techtipsId={posts && posts.id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default TipDetail;
