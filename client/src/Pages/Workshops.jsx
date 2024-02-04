import React, { useState, useEffect } from "react";
import axios from "axios";

import { motion } from "framer-motion";
import SearchBar from "../Components/SearchBar";
import { Link } from "react-router-dom";

import FilterWorkshop from "../Components/FilterWorkshop";
import Pagination from "../Components/Pagination";

function Workshops() {
  useEffect(() => {
    window.scrollTo(0, 0);
    <></>;
  }, []);
  const [workshopData, setWorkshopData] = useState([]);
  const [filteredWorkshops, setFilteredWorkshops] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;
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
        return new Date(b.start_time) - new Date(a.start_time);
      });
    } else {
    }

    setFilteredWorkshops(sortedWorkshops);
  };

  const filterByType = (type) => {
    if (type.toLowerCase() === "all") {
      setFilteredWorkshops(workshopData);
    } else {
      const filtered = workshopData.filter(
        (workshop) => workshop.category.toLowerCase() === type.toLowerCase()
      );
      setFilteredWorkshops(filtered);
    }
  };
  const cardVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  const currentCards = filteredWorkshops.slice(
    indexOfFirstCard,
    indexOfLastCard
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <SearchBar onSearch={filterWorkshops} />
      <FilterWorkshop filterByDate={filterByDate} filterByType={filterByType} />
      <main className="md:px-20  justify-center items-center sm:px-14 px-6 flex flex-col ">
        {currentCards.length > 0 ? (
          currentCards.map((workshop) => (
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
              <div class="relative mx-auto rounded-md  bg-white bg-opacity-20 bg-cover bg-center w-full mb-5 md:max-w-screen-lg">
                <img
                  class="absolute h-full w-full object-cover"
                  src={workshop.image}
                  alt=""
                />
                <div class="text-white lg:w-1/2">
                  <div class="bg-indigo-950 bg-opacity-95 p-5 opacity-90 backdrop-blur-lg lg:p-12 ">
                    <p class="mb-4 font-serif font-light">
                      {workshop.start_time}
                    </p>
                    <h2 class="font-serif text-3xl font-bold">
                      {workshop.title}
                    </h2>

                    <p className="text-white mb-2 md:mb-6">
                      {workshop.category}
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
        <Pagination
          currentPage={currentPage}
          cardsPerPage={cardsPerPage}
          totalCards={filteredWorkshops.length}
          paginate={paginate}
          handlePageChange={handlePageChange}
        />
      </main>
    </>
  );
}

export default Workshops;
