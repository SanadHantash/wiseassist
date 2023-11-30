import React, { useState, useEffect } from "react";
import axios from "axios";

function Cards() {
  const [courseData, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/home/allcourses"
        );
        setCourses(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {" "}
      <div class="  my-6 lg:my-12 container px-6 mx-auto flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-gray-300">
        <div>
          <h3 class="text-2xl font-bold leading-tight text-gray-800 dark:text-gray-100">
            Check our Latest Courses
          </h3>
        </div>
        <div class="mt-6 md:mt-0">
          <button
            href=""
            className="linear rounded-[20px] bg-indigo-950 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-indigo-900 active:bg-brand-700"
          >
            View All
          </button>
        </div>
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-10 items-center  ">
        {/* {Array.isArray(courseData) && courseData.length > 0 ? ( */}
        {courseData && courseData.courses ? (
          courseData.courses.map((course) => (
            <div
              key={course.id}
              className="!z-5 relative flex flex-col rounded-[20px] max-w-[300px] border border-solid border-gray-300 bg-white bg-clip-border shadow-3xl shadow-shadow-500 w-full !p-4 3xl:p-![18px] undefined"
            >
              <div className="h-full w-full">
                <div className="relative w-full">
                  <img
                    src={course.image}
                    className="mb-3 h-full w-full rounded-xl 3xl:h-full 3xl:w-full"
                    alt=""
                  />
                  <button className="absolute top-3 right-3 flex items-center justify-center rounded-full bg-white p-2 text-brand-500 hover:cursor-pointer">
                    <div className="flex h-full w-full items-center justify-center rounded-full text-xl hover:bg-gray-50">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 512 512"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="32"
                          d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"
                        ></path>
                      </svg>
                    </div>
                  </button>
                </div>
                <div className="mb-3 flex items-center justify-between px-1 md:items-start">
                  <div className="mb-2">
                    <p className="text-lg font-bold text-navy-700">
                      {course.title}
                    </p>
                    <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
                      By {course.trainer}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between md:items-center lg:justify-between ">
                  <div className="flex">
                    <p className="!mb-0 text-sm font-bold text-brand-500">
                      {course.start_time} - {course.end_time}
                    </p>
                  </div>
                  <button
                    href=""
                    className="linear rounded-[20px] bg-indigo-950 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-indigo-900 active:bg-brand-700"
                  >
                    View Course
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p> // Or any other message while data is being fetched
        )}
      </div>
    </>
  );
}

export default Cards;
