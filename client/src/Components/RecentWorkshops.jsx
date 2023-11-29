import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function RecentWorkshops() {
  const [workshops, setWorkshops] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8080/home/allworkshops")
      .then((response) => {
        if (response.data.success) {
          setWorkshops(response.data.courses);
          console.log(response.data.courses);
        } else {
          console.error("Failed to fetch workshops.");
        }
      })
      .catch((error) => {
        console.error("Error fetching workshops:", error);
      });
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? workshops.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === workshops.length - 1 ? 0 : prev + 1));
  };
  return (
    <>
      <div className="page-event  dark:bg-gray-900">
        <div className="container mx-auto py-10">
          <div className="upcoming-sec text-indigo-950 border-b border-gray-500 pb-5">
            <div className="heading text-2xl">Upcoming Workshops</div>
          </div>
          <div className="upcoming-event-list text-gray-500">
            <div className="carousel" style={{ backgroundColor: "#F7F1EE " }}>
              {workshops.map((workshop, index) => (
                <div
                  key={index}
                  className={`event-block py-5 border-b border-gray-500 ${
                    index === currentSlide ? "active-slide" : "hidden-slide"
                  }`}
                >
                  <div className="flex flex-wrap items-center">
                    <div className="lg:w-1/6 text-center">
                      <table className="w-full">
                        <tr>
                          <td className="text-2xl font-bold">Jan</td>
                        </tr>
                        <tr>
                          <td className="text-2xl font-bold">27</td>
                        </tr>
                      </table>
                    </div>
                    <div className="lg:w-2/6 lg:pl-5">
                      <img
                        src={workshop.image}
                        alt="Event"
                        className="w-full"
                      />
                    </div>
                    <div className="lg:w-3/6 lg:pl-5">
                      <div className="title text-2xl py-3">
                        {workshop.title}
                      </div>
                      <div className="venue text-sm">
                        <table>
                          <tr>
                            <td>
                              <i className="fa fa-map-marker"></i>
                            </td>
                            <td>
                              <div>{workshop.category}</div>
                              <div className="dim-color">
                                <a
                                  href="https://www.google.co.in"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  Get Directions
                                </a>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </div>
                      <div className="time text-sm py-3">
                        <table>
                          <tr>
                            <td>
                              <i className="fa fa-clock-o"></i>
                            </td>
                            <td>
                              <div>
                                {workshop.start_time} - {workshop.end_time}
                              </div>
                              <div
                                data-livestamp="1517054400"
                                className="dim-color"
                              ></div>
                            </td>
                          </tr>
                        </table>
                      </div>
                      <div className="sort-story overflow-hidden">
                        {workshop.description}
                      </div>
                      <div className="group-of-btn py-3">
                        <Link to={`/workshopsDetail/${workshop.id}`}>
                          <button className="btn book-ticket bg-indigo-900 hover:bg-indigo-950 text-white px-4 py-2 rounded">
                            See Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={handlePrevSlide}>Previous</button>
            <button onClick={handleNextSlide}>Next</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecentWorkshops;
