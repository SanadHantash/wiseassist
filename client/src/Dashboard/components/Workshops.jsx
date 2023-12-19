import React, { useState, useEffect } from "react";
import axios from "axios";
import deletee from "../Assets/delete.png";
import edit from "../Assets/edit.png";
import CreateWorkshop from "../Modals/CreateWorkshop";
import WorkshopModal from "../Modals/WorkshopModal";
// import { useAuth } from "../Context/AuthContext";
// import { useCookies } from "react-cookie";

function Workshops() {
  // const [cookies] = useCookies(["token"]);
  const [Workshops, setWorkshops] = useState([]);

  const [createWorkshop, setCreatedWorkshop] = useState({
    title: "",
    detail: "",
    description: "",
    trainer: "",
    category_id: 0,
    is_paid: false,
    image: null,
    site: "",
    start_time: "",
    end_time: "",
  });

  //   const [currentPage, setCurrentPage] = useState(1);
  //   const [itemsPerPage] = useState(3);
  //   const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  // const token = cookies.Token;
  // const { headers } = useAuth();

  useEffect(() => {
    const fetchWorkshop = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/dashboard/allworkshops"
        );
        console.log(response.data.course);

        setWorkshops(response.data.course);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchWorkshop();
  }, []);

  const deleteWorkshop = async (workshopId) => {
    try {
      if (!workshopId) {
        console.error("Invalid workshop ID");
        return;
      }
      await axios.put(
        `http://localhost:8080/dashboard/deletecourse/${workshopId}`
      );

      setWorkshops(Workshops.filter((course) => course.id !== workshopId));
      console.log(`Workshop ${workshopId} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting workshop ${workshopId}:`, error);
    }
  };

  const openModal = (workshop) => {
    setSelectedWorkshop(workshop);
    setShowModal(true);
    console.log("Modal is opened"); // Log to check if this function runs
  };

  // Function to close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedWorkshop(null);
  };

  const updateWorkshop = (updatedWorkshop) => {
    const updatedWorkshops = Workshops.map((workshop) =>
      workshop.id === updatedWorkshop.id ? updatedWorkshop : workshop
    );

    setWorkshops(updatedWorkshops);
  };
  return (
    <>
      {" "}
      <div class="flex flex-col mt-5">
        <hr />
        <h1 className=" mt-3 text-2xl font-semibold text-indigo-950  ">
          Workshops Table
        </h1>

        <div class="-m-1.5 overflow-x-auto">
          <div class="p-1.5 min-w-full inline-block align-middle">
            <div class="border rounded-lg divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
              <div class="flex justify-between items-center py-3 px-4">
                <div className="flex flex-wrap justify-between w-full">
                  <div class="relative max-w-xs flex flex-col items-start">
                    <label class="sr-only">Search</label>
                    <input
                      type="text"
                      name="hs-table-with-pagination-search"
                      id="hs-table-with-pagination-search"
                      //   value={searchTerm}
                      // onChange={handleSearch}
                      class="py-2 px-3 ps-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      placeholder="Search for items"
                    />
                    <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                      <svg
                        class="h-4 w-4 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                      </svg>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-indigo-950 h-10 w-40 text-white  rounded-md ml-2 hover:bg-indigo-900"
                  >
                    Create Course
                  </button>
                </div>
              </div>
              <div class=" overflow-x-auto">
                <div class="max-w-[600px]">
                  <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead class="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th scope="col" class="py-3 px-4 pe-0">
                          <div class="flex items-center h-5"></div>
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                        >
                          Title
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                        >
                          Detail
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                        >
                          Description
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                        >
                          Trainer
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                        >
                          Type
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                        >
                          Image
                        </th>

                        <th
                          scope="col"
                          class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                        >
                          Rate
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                        >
                          Start_Time
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                        >
                          End_Time
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                      {Workshops &&
                        Workshops.map((workshop, index) => (
                          <tr
                            key={index}
                            className={
                              index % 2 !== 0 ? "bg-white" : "bg-[#F7F1EE]"
                            }
                          >
                            <td class="py-3 ps-4">
                              <div class="flex items-center h-5">
                                <input
                                  id="hs-table-pagination-checkbox-1"
                                  type="checkbox"
                                  class="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                />
                                <label
                                  for="hs-table-pagination-checkbox-1"
                                  class="sr-only"
                                >
                                  Checkbox
                                </label>
                              </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                              {workshop.title}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                              {workshop.detail}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                              {workshop.description}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                              {workshop.trainer}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                              {workshop.category}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                              {workshop.is_paid}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                              {workshop.image && (
                                <img
                                  src={workshop.image}
                                  className="h-10 w-10"
                                  alt="course_image"
                                />
                              )}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                              {workshop.rate}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                              {workshop.start_time}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                              {workshop.end_time}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                              <button
                                type="button"
                                onClick={() => openModal(workshop)}
                                class="inline-flex mr-2 items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                              >
                                <img className="  h-6 w-6 " src={edit} alt="" />
                              </button>
                              <button
                                type="button"
                                onClick={() => deleteWorkshop(workshop.id)}
                                class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                              >
                                <img
                                  className=" h-6 w-6 "
                                  src={deletee}
                                  alt=""
                                />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                {showModal && (
                  <WorkshopModal
                    workshop={selectedWorkshop}
                    closeModal={closeModal}
                    updateWorkshop={updateWorkshop}
                  />
                )}
                {showCreateModal && (
                  <CreateWorkshop
                    addWorkshop={createWorkshop}
                    closeModal={() => setShowCreateModal(false)}
                    addedWorkshop={setCreatedWorkshop}
                  />
                )}
              </div>
              <div class="py-1 px-4">
                <nav class="flex items-center space-x-1">
                  {/* {currentPage > 1 && ( */}
                  <button
                    type="button"
                    // onClick={() => paginate(currentPage - 1)}
                    // disabled={currentPage === 1}
                    className="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    <span aria-hidden="true">«</span>
                    <span className="sr-only">Previous</span>
                  </button>
                  {/* )} */}

                  {/* {courses.length > 0 &&
                    visiblePageNumbers.map((number) => ( */}
                  <div key={""} className="min-w-[40px]">
                    <button
                      type="button"
                      // onClick={() => paginate(number)}
                      className="flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10"
                    >
                      {/* {number} */}
                    </button>
                  </div>
                  {/* ))} */}

                  {/* {indexOfLastItem < courses.length && ( */}
                  <button
                    type="button"
                    // onClick={() => paginate(currentPage + 1)}
                    // disabled={indexOfLastItem >= courses.length}
                    className="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    <span className="sr-only">Next</span>
                    <span aria-hidden="true">»</span>
                  </button>
                  {/* )} */}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Workshops;
