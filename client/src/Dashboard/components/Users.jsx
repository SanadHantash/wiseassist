import React, { useState, useEffect } from "react";
import axios from "axios";
import UserModal from "../Modals/UserModal";
import deletee from "../Assets/delete.png";
import edit from "../Assets/edit.png";

function Users() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/dashboard/allusers")
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);
  console.log(users);
  const updateUser = (updatedUserData) => {
    const updatedUsers = users.map((u) =>
      u.id === updatedUserData.id ? updatedUserData : u
    );
    setUsers(updatedUsers);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredUsers = users.filter((user) => {
    const {
      first_name = "",
      last_name = "",
      user_name = "",
      email = "",
      phonenumber = "",
    } = user || {};

    const searchTermLower = searchTerm.toLowerCase();

    return (
      first_name?.toLowerCase().includes(searchTermLower) ||
      last_name?.toLowerCase().includes(searchTermLower) ||
      user_name?.toLowerCase().includes(searchTermLower) ||
      email?.toLowerCase().includes(searchTermLower) ||
      phonenumber?.toLowerCase().includes(searchTermLower)
    );
  });

  const openModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };
  const softDeleteUser = (userId) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, is_delete: true } : user
    );
    setUsers(updatedUsers);

    axios
      .put(`http://localhost:3000/users/${userId}`, { is_delete: true })
      .then((response) => {
        console.log("User soft deleted:", response.data);
      })
      .catch((error) => {
        console.error("Error soft deleting user: ", error);
        // Rollback changes in case of error
        const rollbackUsers = users.map((user) =>
          user.id === userId ? { ...user, is_delete: false } : user
        );
        setUsers(rollbackUsers);
      });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers
    .filter((user) => !user.is_delete)
    .slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(users.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const maxVisibleButtons = 3;
  const indexOfLastButton = Math.min(
    Math.max(currentPage + maxVisibleButtons - 1, maxVisibleButtons),
    pageNumbers.length
  );
  const indexOfFirstButton = Math.max(indexOfLastButton - maxVisibleButtons, 0);

  const visiblePageNumbers = pageNumbers.slice(
    indexOfFirstButton,
    indexOfLastButton
  );

  return (
    <div class="flex flex-col">
      <h1 className=" mt-3 text-2xl font-semibold text-indigo-950  ">
        Users Table
      </h1>
      <div class="-m-1.5 overflow-x-auto">
        <div class="p-1.5 min-w-full inline-block align-middle">
          <div class="border rounded-lg divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
            <div class="py-3 px-4">
              <div class="relative max-w-xs">
                <label class="sr-only">Search</label>
                <input
                  type="text"
                  name="hs-table-with-pagination-search"
                  id="hs-table-with-pagination-search"
                  value={searchTerm}
                  onChange={handleSearch}
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
            </div>
            <div class="overflow-hidden">
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
                      First Name
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Last Name
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Username
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      PhoneNumber
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
                  {currentItems.map((user, index) => (
                    <tr
                      key={index}
                      className={index % 2 !== 0 ? "bg-white" : "bg-[#F7F1EE]"}
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
                        {user.first_name}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                        {user.last_name}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                        {user.user_name}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                        {user.email}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                        {user.phonenumber}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                        <button
                          type="button"
                          onClick={() => openModal(user)}
                          class="inline-flex mr-2 items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        >
                          <img className="  h-6 w-6 " src={edit} alt="" />
                        </button>
                        <button
                          type="button"
                          onClick={() => softDeleteUser(user.id)}
                          class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        >
                          <img className=" h-6 w-6 " src={deletee} alt="" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {showModal && (
                <UserModal
                  user={selectedUser}
                  closeModal={closeModal}
                  updateUser={updateUser}
                />
              )}
            </div>
            <div class="py-1 px-4">
              <nav class="flex items-center space-x-1">
                {currentPage > 1 && (
                  <button
                    type="button"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    <span aria-hidden="true">«</span>
                    <span className="sr-only">Previous</span>
                  </button>
                )}

                {users.length > 0 &&
                  visiblePageNumbers.map((number) => (
                    <div key={number} className="min-w-[40px]">
                      <button
                        type="button"
                        onClick={() => paginate(number)}
                        className="flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10"
                      >
                        {number}
                      </button>
                    </div>
                  ))}

                {indexOfLastItem < users.length && (
                  <button
                    type="button"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={indexOfLastItem >= users.length}
                    className="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    <span className="sr-only">Next</span>
                    <span aria-hidden="true">»</span>
                  </button>
                )}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
