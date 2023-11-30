import React, { useState, useEffect } from "react";
import axios from "axios";

function RecentWorkshops() {
  const [workshops, setWorkshops] = useState([
    {
      title: "Workshop 1",
      date: "Saturday, Jan 27, 2018 at 5:30 PM",
      venue: "Gyan Manch",
      imageURL:
        "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGV2ZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      description:
        '"For a woman to be complete, she has to be a blend of Paro & Chandramukhi. I feel that I am that woman." - Rekha',
      buttonLink: "https://www.google.com",
    },
    {
      title: "Workshop 2",
      date: "Sunday, Feb 10, 2018 at 4:00 PM",
      venue: "Art Center",
      imageURL:
        "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGV2ZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      description:
        '"The power you have is to be the best version of yourself you can be, so you can create a better world." - Ashley Rickards',
      buttonLink: "https://www.google.com",
    },
    // ... Add more workshop objects as needed
  ]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Fetch workshop data using Axios
    // axios
    //   .get("your_api_endpoint")
    //   .then((response) => {
    //     setWorkshops(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching workshops:", error);
    //   });
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
                        src={workshop.imageURL}
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
                              <div>{workshop.venue}</div>
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
                              <div>{workshop.date}</div>
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
                        <a
                          href="https://www.google.com"
                          target="_blank"
                          rel="noreferrer"
                          className="btn book-ticket bg-indigo-900 hover:bg-indigo-950 text-white px-4 py-2 rounded"
                        >
                          Book Your Entry Pass
                        </a>
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
