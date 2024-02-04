import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Comment from "../Components/Comment";
import { useAuth } from "../Context/AuthContext";
import { useCookies } from "react-cookie";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function WorkshopDetails() {
  useEffect(() => {
    window.scrollTo(0, 0);
    <></>;
  }, []);

  const [cookies] = useCookies(["token"]);
  const token = cookies.Token;
  const [workshopData, setWorkshopData] = useState([]);
  let { id } = useParams();
  const { headers } = useAuth();
  const navigate = useNavigate();
  const isEnrolled = workshopData.course && workshopData.course[0].enrolled;

  const handleEnroll = async () => {
    try {
      const enrollmentData = {
        courseId: id,
      };
      axios.defaults.headers.common["Authorization"] = token;
      const enrollResponse = await axios.post(
        `http://localhost:8080/courseregister/${id}`,
        enrollmentData,
        { headers }
      );
  
      Swal.fire({
        icon: "success",
        title: "Enrollment Successful!",
        text: "You have successfully enrolled in the course.",
      });
  
      console.log("Enrollment Response:", enrollResponse.data);
    } catch (error) {
      if (error.response) {
        // Server responded with an error
        const errorMessage = error.response.data.error;
  
        if (errorMessage === "you are already enrolled" || errorMessage === "Enrollment is not available due to the limited number of seats having expired") {
          Swal.fire({
            icon: "info",
            title: "Enrollment Info",
            text: errorMessage,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Enrollment Failed",
            text: `Server error: ${errorMessage}`,
          }).then(() => {
            navigate("/pricing"); // Navigate to "/pricing" on error
          });
        }
      } else {
        // Handle other errors
        Swal.fire({
          icon: "error",
          title: "Enrollment Failed",
          text: "An error occurred during enrollment. Please try again later.",
        });
      }
    }
  };

  useEffect(() => {
    const fetchWorkshopDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/elderlies/detail/${id}`
        );
        setWorkshopData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchWorkshopDetails();
  }, [id]);

  return (
    <>
      <section class="flex  mt-20 items-center bg-[#F7F1EE ] font-poppins dark:bg-gray-800 ">
        <div class="justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
          <div class="px-4 mb-10 md:text-center md:mb-10">
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
            <div class="w-full px-4 mb-6 lg:w-full lg:mb-0">
              <img
                src={
                  workshopData.course && workshopData.course[0].image
                    ? workshopData.course[0].image
                    : "Detail Not Available"
                }
                alt=""
                class="relative z-40 object-cover bg-cover w-full rounded-xl h-96"
              />
            </div>
            <div className="flex flex-col my-6 lg:flex-row">
              <div class="w-full lg:w-1/2 px-4 mb-10 lg:mb-0 ">
                <h2 class="py-3 pl-4 mb-4 text-2xl font-bold text-gray-700 border-l-4 border-indigo-950  dark:text-gray-300">
                  About this workshop:
                </h2>
                <p class="mb-4 text-base leading-7 text-gray-500 ">
                  {workshopData.course && workshopData.course[0].detail
                    ? workshopData.course[0].detail
                    : "Detail Not Available"}
                </p>

                <button
                  onClick={handleEnroll}
                  className="px-4 py-3 text-indigo-950 transition-all rounded-lg transform border border-indigo-950 hover:bg-indigo-950  hover:text-gray-100"
                >
                  Save A Seat
                </button>
              </div>

              <div className="w-full lg:w-1/2 px-4">
                <div className="border border-gray-300 p-2 rounded-md bg-white">
                  <h1 class="py-3 pl-4 mb-4 text-2xl font-bold text-gray-700 border-l-4 border-indigo-950  dark:text-gray-300">
                    Workshop Information
                  </h1>

                  <div className="flex flex-col gap-2">
                    <div className="bg-indigo-950 bg-opacity-60 p-4 rounded-md">
                      <span className="font-semibold text-indigo-950">
                        Start Date:
                      </span>
                      <br />
                      {workshopData.course &&
                      workshopData.course[0].start_time ? (
                        workshopData.course[0].start_time
                      ) : (
                        <span className="text-gray-500">Not available</span>
                      )}
                    </div>
                    <div className="bg-indigo-950 bg-opacity-60 p-4 rounded-md">
                      <span className="font-semibold text-indigo-950">
                        End Date:
                      </span>{" "}
                      <br />
                      {workshopData.course &&
                      workshopData.course[0].end_time ? (
                        workshopData.course[0].end_time
                      ) : (
                        <span className="text-gray-500">Not available</span>
                      )}
                    </div>
                    <div className="bg-indigo-950 bg-opacity-60 p-4 rounded-md">
                      <span className="font-semibold text-indigo-950">
                        Location:
                      </span>{" "}
                      <br />
                      {workshopData.course && workshopData.course[0].site ? (
                        workshopData.course[0].site
                      ) : (
                        <span className="text-gray-500">Not available</span>
                      )}
                    </div>
                    <div className="bg-indigo-950 bg-opacity-60 p-4 rounded-md">
                      <span className="font-semibold text-indigo-950">
                        Add to Google Calender
                      </span>{" "}
                      <br />
                      <a
                        href="https://calendar.google.com/calendar/u/1?cid=ZjY3OTllZTVlZjY4YjhlM2VmNmVkMDAzNGZlMDUyOGNlZDNlYjI5NmQ5NjcxMTg1NGYyMThhNzE0ZDQzNGRmMkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block  transition duration-300 "
                      >
                        Add to Calendar
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Comment />
      <div class="relative lg:w-full h-96">
        <iframe
          class="absolute top-0 left-0 w-full h-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d420892.69487283437!2d35.625958064849264!3d31.839490786859994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151b5fb85d7981af%3A0x631c30c0f8dc65e8!2sAmman%2C%20Jordan!5e0!3m2!1sen!2sus!4v1703268677289!5m2!1sen!2sus"
          frameborder="0"
          style={{ border: "0" }}
          allowfullscreen=""
          aria-hidden="false"
          tabindex="0"
        ></iframe>
      </div>
    </>
  );
}

export default WorkshopDetails;
