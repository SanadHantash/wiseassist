import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { useCookies } from "react-cookie";
import { useParams, Link } from "react-router-dom";

function ProfileCourses() {
  const [userCourses, setUserCourses] = useState([]);
  const [cookies] = useCookies(["token"]);
  const token = cookies.Token;
  const { id } = useParams();

  useEffect(() => {
    const fetchUserCourses = async () => {
      try {
        if (!token) {
          console.error("Token not available.");
          return;
        }

        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(
          `http://localhost:8080/profile/mycourses`
        );
        if (Array.isArray(response.data.courses)) {
          setUserCourses(response.data.courses);
        } else {
          console.error(
            "Data received is not an array:",
            response.data.courses
          );
        }
        setUserCourses(response.data.courses);
      } catch (error) {
        console.error("Error fetching user courses:", error);
      }
    };

    fetchUserCourses();
  }, []);
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">All Courses</h2>
        <div className="grid gap-6 lg:grid-cols-1 xl:grid-cols-1">
          {userCourses.length > 0 ? (
            userCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  className="w-full h-40 object-cover object-center"
                  src={course.image}
                  alt={course.title}
                />
                <div className="p-4">
                  <Link
                    to={
                      course.category.toLowerCase() === "online"
                        ? `/courseDetails/${course.id}`
                        : `/onsiteCourseDetails/${course.id}`
                    }
                    className="text-xl font-semibold text-gray-800 hover:text-indigo-700 transition duration-300"
                  >
                    {course.title}
                  </Link>
                  <p className="text-sm text-gray-600 mt-2">
                    {course.description}
                  </p>
                  <div className="flex justify-between mt-4">
                    <p className="text-sm text-gray-700">
                      Start Time: {course.start_time}
                    </p>
                    <p className="text-sm text-gray-700">
                      End Time: {course.end_time}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No courses available</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ProfileCourses;
