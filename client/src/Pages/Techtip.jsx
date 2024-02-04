import React, { useState, useEffect } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useCookies } from "react-cookie";
import Pagination from "../Components/Pagination";
import contact from "../assets/tech.jpg";

function Techtip() {
  const [cookies] = useCookies(["token"]);
  const token = cookies.Token;
  const [posts, setPosts] = useState([]);
  const [filteredTechtips, setFilteredTechtips] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

  useEffect(() => {
    window.scrollTo(0, 0);
    <></>;
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    document.body.style.scrollBehavior = "smooth";
    return () => {
      document.body.style.scrollBehavior = "unset";
    };
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get("http://localhost:8080/alltechtips");
        setPosts(response.data);
        setFilteredTechtips(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  const currentCards = filteredTechtips.slice(
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
      <div
        className="w-full dark:bg-gray-500 py-10"
        style={{
          backgroundImage: `url(${contact})`,
          backgroundPosition: "center center",
          backgroundBlendMode: "multiply",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0">
          <div className="bg-gradient-to-b from-[#d5c5df] via-transparent to-transparent h-[50rem]"></div>
        </div>
        <div className="container py-24 sm:py-28 md:py-32 flex flex-col px-6">
          <p class="text-3xl z-40 text-gray-900 font-bold leading-none lg:text-4xl xl:text-5xl">
            Empower Your Tech Journey:
            <br /> Unleashing Expert Tips and Tricks
          </p>
        </div>
      </div>
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto max-w-7x1">
          <div class="flex flex-wrap w-full mb-4 p-4">
            <div class="w-full mb-6 lg:mb-0">
              <h1 class="sm:text-4xl text-5xl font-medium font-bold title-font mb-2 text-gray-900">
                News
              </h1>
              <div class="h-1 w-20 bg-[#522883] rounded"></div>
            </div>
          </div>
          <div data-aos="fade-up" class="flex flex-wrap -m-4 mb-6">
            {currentCards.length > 0 ? (
              currentCards.map((post, index) => (
                <div
                  key={index}
                  class="xl:w-1/3 lg:w-1/2 md:w-1/2 sm:w-1/2 w-full p-2"
                >
                  <div class="bg-[#d5c5df] p-6 rounded-lg border border-solid shadow-lg min-h-[400px] lg:min-h-[450px] transform hover:scale-105 transition duration-500">
                    <img
                      class="h-64 lg:h-48 md:h-48 sm:h-48 w-full object-cover object-center mb-4 rounded-lg transform hover:scale-100 transition duration-500"
                      src={post.image}
                      alt="Image_Size"
                    />
                    <Link to={`/TipDetail/${post.id}`}>
                      <button>
                        <h2 class="tracking-widest text-[#522883] text-xl font-medium text-left title-font mb-2 lg:mb-3">
                          {post.title}
                        </h2>
                      </button>
                    </Link>
                    <p class="leading-relaxed text-sm">{post.short_detail}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center w-full my-4">
                <div className="bg-[#d5c5df] rounded-lg p-4 border border-solid">
                  <p className="text-base text-indigo-950 mb-2">
                    No Techtips found.
                  </p>
                  <p className="text-xs text-indigo-950">
                    Please try a different keyword or check back later.
                  </p>
                </div>
              </div>
            )}
          </div>
          <Pagination
            currentPage={currentPage}
            cardsPerPage={cardsPerPage}
            totalCards={filteredTechtips.length}
            paginate={paginate}
            handlePageChange={handlePageChange}
          />
        </div>
      </section>
    </>
  );
}

export default Techtip;
