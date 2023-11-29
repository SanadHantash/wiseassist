import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import work2 from "../assets/work2.jpg";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Comment from "../Components/Comment";

function WorkshopDetails() {
  useEffect(() => {
    window.scrollTo(0, 0);
    <></>;
  }, []);
  const [workshopData, setWorkshopData] = useState([]);
  let { id } = useParams();
  useEffect(() => {
    const fetchWorkshopDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/elderlies/detail/${id}`
        );
        setWorkshopData(response.data);
        console.log("API response:", response.data); // Log the response data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchWorkshopDetails();
  }, [id]);

  console.log("workshopData:", workshopData);
  return (
    <>
      <Header />
      <section class="flex  items-center bg-[#F7F1EE ] font-poppins dark:bg-gray-800 ">
        <div class="justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
          <div class="px-4 mb-10 md:text-center md:mb-20">
            <p class="mb-2 text-lg font-semibold text-indigo-950 dark:text-gray-400"></p>
            <h2 class="pb-2 text-2xl font-bold text-gray-800 md:text-4xl dark:text-gray-300">
              {workshopData.course && workshopData.course[0].title
                ? workshopData.course[0].title
                : "Title Not Available"}
            </h2>
            <div class="flex w-32 mt-1 mb-6 overflow-hidden rounded md:mx-auto md:mb-14">
              <div class="flex-1 h-2 bg-indigo-950"></div>
              <div class="flex-1 h-2 bg-indigo-900"></div>
              <div class="flex-1 h-2 bg-indigo-950"></div>
            </div>
          </div>
          <div class="flex flex-wrap  ">
            <div class="w-full px-4 mb-10 lg:w-full lg:mb-0">
              <img
                src={
                  workshopData.course && workshopData.course[0].image
                    ? workshopData.course[0].image
                    : "Detail Not Available"
                }
                alt=""
                class="relative z-40 object-cover bg-cover w-full h-96"
              />
            </div>
            <div className="flex flex-col">
              <div class="w-full px-4 mb-10 lg:w-full lg:mb-0 ">
                <h2 class="py-3 pl-2 mb-4 text-2xl font-bold text-gray-700 border-l-4 border-indigo-950  dark:text-gray-300">
                  About this workshop:
                </h2>
                <p class="mb-4 text-base leading-7 text-gray-500 ">
                  {workshopData.course && workshopData.course[0].detail
                    ? workshopData.course[0].detail
                    : "Detail Not Available"}
                </p>

                <a
                  href="/"
                  class="px-4 py-3 text-indigo-950 transition-all transform border border-indigo-950 hover:bg-indigo-950  hover:text-gray-100"
                >
                  Discover more
                </a>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </section>
      <Comment />
      <Footer />
    </>
  );
}

export default WorkshopDetails;
