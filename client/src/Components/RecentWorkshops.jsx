import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function RecentWorkshops() {
  const [workshops, setWorkshops] = useState([]);

  const CustomPrevArrow = ({ onClick }) => (
    <button
      className="absolute top-12 left-10 rounded-full border border-indigo-950 p-3 text-indigo-950 transform -translate-y-1/2 transition hover:bg-indigo-950 hover:text-white z-10"
      onClick={() => {
        console.log("Prev button clicked");
        onClick();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-5 w-5 rtl:rotate-180"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
    </button>
  );
  const CustomNextArrow = ({ onClick }) => (
    <button
      className="absolute ml-4 top-12 left-20 rounded-full border border-indigo-950 p-3 text-indigo-950 transform -translate-y-1/2 transition hover:bg-indigo-950 hover:text-white z-10"
      onClick={onClick}
    >
      <svg
        className="h-5 w-5 rtl:rotate-180"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 5l7 7-7 7"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    </button>
  );

  const settings = {
    // dots: true,
    infinite: true,
    speed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/home/allworkshops")
      .then((response) => {
        if (response.data.success) {
          setWorkshops(response.data.courses);
        } else {
          console.error("Failed to fetch workshops.");
        }
      })
      .catch((error) => {
        console.error("Error fetching workshops:", error);
      });
  }, []);

  return (
    <>
      <div className="mt-20 my-8 lg:my-18 container px-6 mx-auto flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-gray-300">
        <div>
          <h3 className="font_heading text-4xl  leading-tight text-[#522883] dark:text-gray-100">
            Check our Recent Workshops
          </h3>
        </div>
        <div className="mt-6  px-6 md:mt-0">
          <Link to="/workshop">
            <button className="linear rounded-[20px] bg-indigo-950 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-indigo-900 active:bg-brand-700">
              View All
            </button>
          </Link>
        </div>
      </div>
      <section>
        <Slider {...settings}>
          {workshops.map((workshop, index) => (
            <div
              key={index}
              className="mx-auto max-w-screen-2xl px-4 py-10 sm:px-6 lg:px-8"
            >
              <div className="grid grid-cols-1 lg:h-screen lg:grid-cols-2">
                <div className="relative z-10 lg:py-16">
                  <div className="relative h-64 sm:h-80 lg:h-full">
                    <img
                      alt={workshop.title}
                      src={workshop.image}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                </div>

                <div className="relative flex items-center bg-[#d5c5df]">
                  <span className="hidden lg:absolute lg:inset-y-0 lg:-start-16 lg:block lg:w-16 lg:bg-[#d5c5df]"></span>

                  <div className="p-8 sm:p-16 lg:p-24">
                    <h2 className="text-2xl font-bold sm:text-3xl">
                      {workshop.title}
                    </h2>
                    <p className="mt-4 text-gray-600">{workshop.description}</p>

                    <Link
                      to={`/workshopsDetail/${workshop.id}`}
                      className="mt-8 inline-block rounded border border-indigo-950 bg-indigo-950 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-950 focus:outline-none focus:ring active:text-indigo-950"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>
    </>
  );
}

export default RecentWorkshops;
