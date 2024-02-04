import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { useCookies } from "react-cookie";
import { useParams, Link } from "react-router-dom";

function ProfileWorkshop() {
  const [userWorkshops, setUserWorkshop] = useState([]);
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
          `http://localhost:8080/profile/myworkshops`
        );
        if (Array.isArray(response.data.courses)) {
          setUserWorkshop(response.data.courses);
        } else {
          console.error(
            "Data received is not an array:",
            response.data.courses
          );
        }
        setUserWorkshop(response.data.courses);
      } catch (error) {
        console.error("Error fetching user courses:", error);
      }
    };

    fetchUserCourses();
  }, []);
  return (
    <>
      <div className="relative items-end justify-center flex-col border-[1px] border-gray-200 bg-white bg-clip-border shadow-md dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            All Workshops
          </h2>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
            {userWorkshops.length > 0 ? (
              userWorkshops.map((workshop) => (
                <div
                  key={workshop.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    className="w-full h-40 object-cover object-center"
                    src={workshop.image}
                    alt={workshop.title}
                  />
                  <div className="p-4">
                    <Link
                      to={`/workshopsDetail/${workshop.id}`}
                      className="text-xl font-semibold text-gray-800 hover:text-indigo-700 transition duration-300"
                    >
                      {workshop.title}
                    </Link>
                    <p className="text-sm text-gray-600 mt-2">
                      {workshop.description}
                    </p>
                    <div className="flex justify-between mt-4">
                      <p className="text-sm text-gray-700">
                        Start Time: {workshop.start_time}
                      </p>
                      <p className="text-sm text-gray-700">
                        End Time: {workshop.end_time}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No workshops available</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileWorkshop;
