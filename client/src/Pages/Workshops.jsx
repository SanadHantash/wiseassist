import React, { useState, useEffect } from "react";
import axios from "axios";
import contact from "../assets/contact.jpg";
import { motion } from "framer-motion";
import FilterList from "../Components/FilterList";
import SearchBar from "../Components/SearchBar";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

function Workshops() {
  useEffect(() => {
    window.scrollTo(0, 0);
    <></>;
  }, []);
  const [workshopData, setWorkshopData] = useState([]);
  const [filteredWorkshops, setFilteredWorkshops] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState(""); // State to store the selected filter type

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/elderlies/allworkshops"
        );
        setWorkshopData(response.data.courses);
        setFilteredWorkshops(response.data.courses);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filterWorkshops = (term) => {
    setSearchTerm(term);
    const filtered = workshopData.filter((workshop) =>
      workshop.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredWorkshops(filtered);
  };

  const filterByDate = (type) => {
    setSortType(type);
    let sortedWorkshops = [];

    if (type === "Date") {
      sortedWorkshops = [...filteredWorkshops].sort((a, b) => {
        // Assuming start_time is a string in format YYYY-MM-DD, adjust the sorting logic accordingly
        // Sorting from newest to oldest based on start_time
        return new Date(b.start_time) - new Date(a.start_time);
      });
    } else {
      // Handle other filter types if needed
    }

    setFilteredWorkshops(sortedWorkshops);
  };
  const cardVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <>
      <Header />
      <SearchBar onSearch={filterWorkshops} />
      <FilterList filterByDate={filterByDate} />
      <main className="md:px-20  justify-center items-center sm:px-14 px-6 flex flex-col ">
        {filteredWorkshops.length > 0 ? (
          filteredWorkshops.map((workshop) => (
            <motion.div
              key={workshop.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{
                duration: 0.5,
              }}
              whileHover={{
                scale: 1.05,
              }}
              class="container mx-auto p-4 md:p-0 "
            >
              <div class="relative mx-auto rounded-full  bg-white bg-opacity-20 bg-cover bg-center w-full mb-5 md:max-w-screen-lg">
                <img
                  class="absolute h-full w-full object-cover"
                  src={contact}
                  alt=""
                />
                <div class="text-white lg:w-1/2">
                  <div class="bg-indigo-950 bg-opacity-95 p-5 opacity-90 backdrop-blur-lg lg:p-12 ">
                    <p class="mb-4 font-serif font-light">
                      {workshop.start_time}
                    </p>
                    <h2 class="font-serif text-4xl font-bold">
                      {workshop.title}
                    </h2>
                    <p className="text-white mb-2 md:mb-6">
                      {workshop.description}
                    </p>
                    <Link to={`/workshopsDetail/${workshop.id}`}>
                      <button class="mt-6 inline-block rounded-xl border-2 px-10 py-3 font-semibold border-white hover:bg-white hover:text-indigo-950">
                        {" "}
                        Read Now{" "}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full mb-4">
            <div className="bg-[#fcf2fc] rounded-lg p-8 border border-solid">
              <p className="text-lg text-indigo-950 mb-4">
                No workshops found.
              </p>
              <p className="text-sm text-indigo-950">
                Please try a different keyword or check back later.
              </p>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default Workshops;
