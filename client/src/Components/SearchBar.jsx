import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };
  return (
    <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="  overflow-hidden bg-white px-6 py-20 text-center sm:px-16 sm:shadow-sm ">
        <p class="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-200 sm:text-4xl">
          Empower Your Journey:
          <br /> Dive into Cutting-edge Tech Workshops
        </p>

        <form onSubmit={handleSubmit}>
          <label
            class="mx-auto mt-8 relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-xl focus-within:border-gray-300"
            for="search-bar"
          >
            <input
              id="search-bar"
              placeholder="your keyword here"
              name="q"
              onChange={handleInputChange}
              class="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
              required=""
            />
            <button
              type="submit"
              class="w-full md:w-auto px-6 py-3 bg-indigo-950 border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all"
            >
              <div class="flex items-center transition-all opacity-1">
                <span class="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                  Search
                </span>
              </div>
            </button>
          </label>
        </form>
      </div>
    </div>
  );
}

export default SearchBar;
