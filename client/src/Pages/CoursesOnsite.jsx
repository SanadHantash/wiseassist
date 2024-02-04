import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import CommentCourses from "../Components/CommentCourses";

function CoursesOnsite() {
  const [cookies] = useCookies(["token"]);
  const token = cookies.Token;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { headers } = useAuth();
  const [courseDetails, setCourseDetails] = useState([]);

  const { id } = useParams();
  const isEnrolled = courseDetails.course && courseDetails.course[0].enrolled;

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(
          `http://localhost:8080/elderlies/detail/${id}`
        );
        setCourseDetails(response.data);
        console.log("Course Details API response:", response.data);
      } catch (error) {
        console.error("Error fetching course details:", error.response);
      }
    };

    fetchCourseDetails();
  }, [id, token]);

  const navigate = useNavigate();
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
  

  return (
    <>
      <div className="container mx-auto mt-24 px-4 lg:px-0">
        <div className="lg:flex lg:flex-row lg:space-x-4">
          <div className="lg:w-2/3 mb-8 lg:mb-0">
            <div className="relative rounded-lg overflow-hidden">
              <img
                className="rounded-lg object-cover w-full lg:h-96"
                src={
                  courseDetails.course &&
                  courseDetails.course.length > 0 &&
                  courseDetails.course[0].image
                    ? courseDetails.course[0].image
                    : "placeholder_image_url_or_default"
                }
                alt="image_description"
              />
              <div className="absolute top-44 left-24 max-w-full md:left-60 z-10">
                <div className="bg-[#d5c5df] bg-opacity-60 text-4xl font-bold text-[#522883] mix-blend-screen px-10 py-5">
                  {courseDetails.course && courseDetails.course[0].title
                    ? courseDetails.course[0].title
                    : "Title Not Available"}
                </div>
              </div>
            </div>

            <div className="text-indigo-950 mb-4 mt-6">
              <h2 className="text-2xl font-semibold mb-2 font-serif">
                Course Details
              </h2>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed font-serif">
                {courseDetails.course && courseDetails.course[0].detail
                  ? courseDetails.course[0].detail
                  : "Details Not Available"}
              </p>
            </div>
            <button
              onClick={handleEnroll}
              className={`px-4 py-3 text-indigo-950 transition-all rounded-lg transform border border-indigo-950 hover:bg-indigo-950  hover:text-gray-100 ${
                isEnrolled ? "hidden" : ""
              }`}
            >
              Enroll Now
            </button>
          </div>
          <div className="lg:w-1/3">
            <div className="border border-gray-300 p-4 rounded-md bg-white">
              <h1 class="text-2xl md:text-3xl pl-2 my-2 border-l-4  text-indigo-950 font-sans font-bold border-indigo-950 py-3 ">
                Course Information
              </h1>
              <div className="text-indigo-950 ">
                <p className="text-gray-700 mb-4 leading-relaxed font-serif">
                  {courseDetails.course && courseDetails.course[0].description
                    ? courseDetails.course[0].description
                    : "Description Not Available"}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="bg-indigo-950 bg-opacity-60 p-7 rounded-md">
                  <span className="font-semibold text-indigo-950">
                    Start Date:
                  </span>
                  <br />
                  {courseDetails.course &&
                  courseDetails.course[0].start_time ? (
                    courseDetails.course[0].start_time
                  ) : (
                    <span className="text-gray-500">Not available</span>
                  )}
                </div>
                <div className="bg-indigo-950 bg-opacity-60 p-7 rounded-md">
                  <span className="font-semibold text-indigo-950">
                    End Date:
                  </span>{" "}
                  <br />
                  {courseDetails.course && courseDetails.course[0].end_time ? (
                    courseDetails.course[0].end_time
                  ) : (
                    <span className="text-gray-500">Not available</span>
                  )}
                </div>
                <div className="bg-indigo-950 bg-opacity-60 p-7 rounded-md">
                  <span className="font-semibold text-indigo-950">
                    Location:
                  </span>{" "}
                  <br />
                  {courseDetails.course && courseDetails.course[0].site ? (
                    courseDetails.course[0].site
                  ) : (
                    <span className="text-gray-500">Not available</span>
                  )}
                </div>
                <div className="bg-indigo-950 bg-opacity-60 p-7 rounded-md">
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

      <CommentCourses />

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

export default CoursesOnsite;
