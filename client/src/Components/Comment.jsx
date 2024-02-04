import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { useCookies } from "react-cookie";

function Comment() {
  const [cookies] = useCookies(["token"]);
  const [commentData, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { id } = useParams();
  const token = cookies.Token;
  const { headers } = useAuth();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(
          `http://localhost:8080/course/${id}/getcomments`
        );

        setComments(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchComments();
  }, [id]);

  const addComment = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/course/${id}/addcomment`,
        {
          comment: newComment,
        }
      );

      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  return (
    <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Reviews
          </h2>
        </div>
        <form
          className="mb-6"
          onSubmit={(e) => {
            e.preventDefault();
            addComment();
          }}
        >
          <div className="mb-4">
            <textarea
              rows="6"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-4 text-sm text-gray-900 border rounded-lg focus:outline-none dark:text-white dark:bg-gray-800"
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="px-4 py-3 text-indigo-950 transition-all rounded-lg transform border border-indigo-950 hover:bg-indigo-950  hover:text-gray-100"
          >
            Post comment
          </button>
        </form>
        {commentData &&
        commentData.comments &&
        commentData.comments.length > 0 ? (
          commentData.comments.map((comment) => (
            <article
              key={comment.id}
              className="p-6 bg-[#d5c5df] rounded-lg dark:bg-gray-900 shadow-md mb-4"
            >
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                    {comment.user_name}
                  </p>
                </div>
                <button
                  id="dropdownComment1Button"
                  data-dropdown-toggle="dropdownComment1"
                  className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  type="button"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 3"
                  >
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                  </svg>
                  <span className="sr-only">Comment settings</span>
                </button>

                <div
                  id="dropdownComment1"
                  className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                >
                  <ul
                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownMenuIconHorizontalButton"
                  >
                    <li>
                      <a
                        href="/"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Edit
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Remove
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Report
                      </a>
                    </li>
                  </ul>
                </div>
              </footer>

              <p className="text-gray-700 dark:text-gray-400">
                {comment.course_comment}
              </p>
              <div className="flex items-center mt-4 space-x-4"></div>
            </article>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </section>
  );
}

export default Comment;
