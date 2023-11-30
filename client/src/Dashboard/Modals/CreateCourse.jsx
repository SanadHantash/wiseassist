import React, { useState } from "react";
import axios from "axios";


function CreateCourse({ addcourse, closeModal, addedCourse }) {
  const [createCourse, setCreatedCourse] = useState(addcourse);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreatedCourse({ ...createCourse, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      //   console.log("added course:", updatedCourse); // Log the updatedCourse before making the request

      const response = await axios.post(
        `http://localhost:8080/dashboard/createcourse`,
        createCourse
      );

      addedCourse(response.data);

      closeModal();
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur backdrop-filter   bg-black bg-opacity-30">
      <div className="bg-white rounded-lg w-full sm:w-96 shadow-lg p-6 max-h-[80vh] overflow-y-auto  scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-indigo-950 scrollbar-track-indigo-100">
        <h2 className="text-xl font-semibold mb-4"> Edit Course</h2>

        <div className="flex flex-col gap-y-2">
          <label className="font-bold">Title</label>
          <input
            type="text"
            name="title"
            value={createCourse.title}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 mb-2 w-full"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label className="font-bold">Detail</label>
          <input
            type="text"
            name="detail"
            value={createCourse.detail}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 mb-2 w-full"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label className="font-bold">Description</label>
          <input
            type="text"
            name="description"
            value={createCourse.description}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 mb-2 w-full"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label className="font-bold">Trainer</label>
          <input
            type="text"
            name="trainer"
            value={createCourse.trainer}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 mb-2 w-full"
          />
        </div>
        {/* <div className="flex flex-col gap-y-2">
          <label className="font-bold">category</label>
          <input
            type="number"
            name="category_id"
            value={createCourse.category_id}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 mb-2 w-full"
          />
        </div> */}

        <div className="flex flex-col gap-y-2">
          <label className="font-bold">Category</label>
          <select
            name="category_id"
            value={createCourse.category_id}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 mb-2 w-full"
          >
            <option value={1}>Onsite</option>
            <option value={2}>Online</option>
          </select>
        </div>
        <div className="flex flex-col gap-y-2">
          <label className="font-bold">Paid</label>
          <select
            name="is_paid"
            value={createCourse.is_paid}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 mb-2 w-full"
          >
            <option value="true">Paid</option>
            <option value="false">Free</option>
          </select>
        </div>

        <div className="flex flex-col gap-y-2">
          <label className="font-bold">Image</label>
          <input
            type="file"
            name="image"
            value={createCourse.image}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 mb-2 w-full"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label className="font-bold">Address</label>
          <input
            type="text"
            name="site"
            value={createCourse.site}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 mb-2 w-full"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label className="font-bold">Start Time</label>
          <input
            type="date"
            name="start_time"
            value={createCourse.start_time}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 mb-2 w-full"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label className="font-bold">End Time</label>
          <input
            type="date"
            name="end_time"
            value={createCourse.end_time}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 mb-2 w-full"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleUpdate}
            className="bg-indigo-950 text-white px-4 py-2 rounded-md mr-2 hover:bg-indigo-900"
          >
            Update
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateCourse;