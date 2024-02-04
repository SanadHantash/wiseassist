import { useState } from "react";
import { Link } from "react-router-dom";

function FilterWorkshop({ filterByDate, filterByType }) {
  // const [openSort, setOpenSort] = useState(false);
  // const [sortType, setSortType] = useState("Sort by");

  // const handleSortClick = (type) => {
  //   setSortType(type);
  //   setOpenSort(!openSort);
  // };
  return (
    <>
      <div className="w-full flex justify-center">
        {/* <div className="relative">
          <button
            onClick={() => {
              filterByDate("Date");
              handleSortClick(sortType);
            }}
            className={` ${
              sortType !== "Date" ? "" : "hidden"
            }flex text-indigo-950 mx-auto bg-white items-center justify-center w-38 py-4 mt-3 text-sm font-semibold text-left  rounded-lg`}
          >
            <span>{sortType}</span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 transform ${
                openSort ? "rotate-180" : "rotate-0"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          {openSort && (
            <div className="absolute z-50 w-full origin-top-right">
              <div className="px-2 pt-2 pb-2 bg-white rounded-md shadow-lg dark-mode:bg-gray-700">
                <div className="flex flex-col">
                  <button
                    onClick={() => handleSortClick("Date")}
                    className={`flex flex-row items-start rounded-lg bg-transparent p-2 hover:bg-gray-200 ${
                      sortType !== "Date" ? "" : "hidden"
                    }`}
                  >
                    <div>
                      <p className="font-semibold">Date</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div> */}

        <div className="max-w-screen-md ">
          <div className="bg-white py-4 px-3">
            <nav className="flex flex-wrap gap-4">
              <Link
                to="#"
                onClick={() => filterByType("All")}
                className="inline-flex whitespace-nowrap border-b-2 border-transparent py-3 px-3 text-md font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-indigo-950 hover:text-indigo-950"
              >
                All
              </Link>
              <Link
                to="#"
                onClick={() => filterByType("workshop-online")}
                className="inline-flex whitespace-nowrap border-b-2 border-transparent py-3 px-3 text-md font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-indigo-950 hover:text-indigo-950"
              >
                Online
              </Link>

              <Link
                to="#"
                onClick={() => filterByType("workshop-onsite")}
                className="inline-flex whitespace-nowrap border-b-2 border-transparent py-3 px-3 text-md font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-indigo-950 hover:text-indigo-950"
              >
                Onsite
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default FilterWorkshop;
