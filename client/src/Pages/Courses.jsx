import React, { useState, useEffect } from "react";
import axios from "axios";
// import work1 from "../assets/work1.jpg";
// import work2 from "../assets/work2.jpg";
import { Link } from "react-router-dom";
// import { Tab, initTE } from "tw-elements";
import SearchBar from "../Components/SearchBar";
import FilterList from "../Components/FilterList";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { useCookies } from "react-cookie";

const Courses = () => {
  const [cookies] = useCookies(["token"]);
  const token = cookies.Token;

  useEffect(() => {
    window.scrollTo(0, 0);
    <></>;
  }, []);
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/elderlies/allcourses"
        );
        setCourseData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Header />
      <SearchBar />
      <FilterList />
      <section className="title container ">
        <div className="container mx-auto px-4 md:px-0  w-3/4">
          {courseData && courseData.courses ? (
            courseData.courses.map((course) => (
              <div
                key={course.id}
                className="bg-white  transform transition-transform hover:scale-105 border border-solid p-6 md:p-8 rounded-lg shadow mb-4 flex flex-col  md:flex-row "
              >
                <div className="mb-4 md:mb-0 md:mr-4 flex items-center text-2xl text-indigo-950">
                  <div>21 OCT</div>
                </div>
                <img
                  src={course.image}
                  alt="Card "
                  className="  w-full md:w-1/4 mb-4 md:mb-0 md:mr-4 rounded-lg"
                />
                <div className="md:w-3/4">
                  <h4 className="text-sm mb-2">{course.start_time}</h4>
                  <h4 className="text-xl font-semibold mb-2">{course.title}</h4>
                  <div className="h-1 w-20 bg-indigo-950 my-4"></div>
                  <h4 className="text-md font-semibold mb-2">
                    {course.category}
                  </h4>
                  <p className="text-gray-600 pb-5">{course.description}</p>
                  <p className="text-gray-600 pb-5">{course.trainer}</p>
                  <p className="text-gray-600 pb-5">{course.is_paid}</p>
                  <Link to={`/courseDetails/${course.id}`}>
                    <button className="block w-full h-[2rem] rounded bg-indigo-950 px-10 py-2 text-sm font-medium text-white shadow hover:bg-indigo-900 focus:outline-none focus:ring active:bg-indigo-900 sm:w-auto  justify-end items-center transition duration-300">
                      View{" "}
                      <i className="fas fa-long-arrow-alt-right  text-white ml-2"></i>
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Courses;
