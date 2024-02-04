import React, { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

import FilterList from "../Components/FilterList";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { useCookies } from "react-cookie";
import CoursesSearch from "../Components/CoursesSearch";
import Pagination from "../Components/Pagination";

const Courses = () => {
  const [cookies] = useCookies(["token"]);
  const token = cookies.Token;
  const [courseData, setCourseData] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;

  useEffect(() => {
    window.scrollTo(0, 0);
    <></>;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/elderlies/allcourses"
        );
        setCourseData(response.data.courses);
        setFilteredCourses(response.data.courses);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const filterCourses = (term) => {
    setSearchTerm(term);
    const filtered = courseData.filter((course) =>
      course.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  const filterByType = (type) => {
    if (type.toLowerCase() === "all") {
      setFilteredCourses(courseData); // Show all workshops
    } else {
      const filtered = courseData.filter(
        (course) => course.category.toLowerCase() === type.toLowerCase()
      );
      setFilteredCourses(filtered);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short" };
    const date = new Date(dateString);
    const day = date.toLocaleDateString("en-US", { day: "numeric" });
    const month = date
      .toLocaleDateString("en-US", { month: "short" })
      .toUpperCase();
    return `${day} ${month}`;
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  const currentCards = filteredCourses.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <>
      <CoursesSearch onSearch={filterCourses} />
      <FilterList filterByType={filterByType} />
      <section className="title container ">
        <div className="container  mx-auto px-4 md:px-0  w-3/4">
          {currentCards.length > 0 ? (
            currentCards.map((course) => (
              <div
                key={course.id}
                className="bg-white  transform transition-transform hover:scale-105 border border-solid p-6 md:p-8 rounded-lg shadow mb-4 flex flex-col  md:flex-row "
              >
                <div className="mb-4 md:mb-0 md:mr-4 flex items-center text-2xl text-indigo-950">
                  {course.start_time && (
                    <div className="bg-[#d5c5df] w-full h-full flex items-center pl-4 justify-center rounded-lg">
                      {formatDate(course.start_time)}
                    </div>
                  )}
                </div>
                <img
                  src={course.image}
                  alt="Card "
                  className="  w-[280px] h-[290px] md:w-1/4 mb-4 md:mb-0 md:mr-4 rounded-lg"
                />
                <div className="md:w-3/4">
                  <h4 className="text-sm mb-2 text-indigo-950">
                    {course.start_time}
                  </h4>
                  <h4 className="text-xl font-semibold mb-2">{course.title}</h4>
                  <div className="h-1 w-20 bg-indigo-950 my-4"></div>
                  <h4 className="text-md font-semibold mb-2">
                    {course.category}
                  </h4>
                  <p className="text-black pb-2">{course.description}</p>
                  <p className="font-bold text-indigo-950 pb-2">
                    By {course.trainer}
                  </p>
                  <p className="text-indigo-950 pb-2">{course.is_paid}</p>
                  <Link
                    to={
                      course.category.toLowerCase() === "online"
                        ? `/courseDetails/${course.id}`
                        : `/onsiteCourseDetails/${course.id}`
                    }
                  >
                    <button className="block w-full h-[2rem] rounded bg-indigo-950 px-10 py-2 text-sm font-medium text-white shadow hover:bg-indigo-900 focus:outline-none focus:ring active:bg-indigo-900 sm:w-auto  justify-end items-center transition duration-300">
                      View{" "}
                      <i className="fas fa-long-arrow-alt-right  text-white ml-2"></i>
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full mb-4">
              <div className="bg-[#fcf2fc] rounded-lg p-8 border border-solid">
                <p className="text-lg text-indigo-950 mb-4">
                  No Courses found.
                </p>
                <p className="text-sm text-indigo-950">
                  Please try a different keyword or check back later.
                </p>
              </div>
            </div>
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          cardsPerPage={cardsPerPage}
          totalCards={filteredCourses.length}
          paginate={paginate}
          handlePageChange={handlePageChange}
        />
      </section>
    </>
  );
};

export default Courses;
