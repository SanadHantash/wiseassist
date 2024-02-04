import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { useCookies } from "react-cookie";

function CommentTechTips({ techtipsId }) {
  const [commentData, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [cookies] = useCookies(["token"]);
  const { id } = useParams();
  const token = cookies.Token;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(
          `http://localhost:8080/techtip/${id}/getcomments`
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
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.post(
        `http://localhost:8080/techtip/${id}/addcomment`,
        {
          comment: newComment,
        }
      );
      console.log("Comment added:", response.data);

      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  return (
    <section class="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
      <div class="max-w-2xl mx-auto px-4">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Reviews
          </h2>
        </div>
        <form
          class="mb-6"
          className="mb-6"
          onSubmit={(e) => {
            e.preventDefault();
            addComment();
          }}
        >
          <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label for="comment" class="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows="6"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            class="px-4 py-3 text-indigo-950 transition-all rounded-lg transform border border-indigo-950 hover:bg-indigo-950  hover:text-gray-100"
          >
            Post comment
          </button>
        </form>
        {commentData && commentData.comments ? (
          commentData.comments.map((comment) => (
            <article
              key={comment.id}
              className="p-6 text-base bg-[#d5c5df] rounded-lg dark:bg-gray-900"
            >
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                    {comment.user_name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400"></p>
                </div>
                <button
                  id="dropdownComment1Button"
                  data-dropdown-toggle="dropdownComment1"
                  class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  type="button"
                >
                  <svg
                    class="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 3"
                  >
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                  </svg>
                  <span class="sr-only">Comment settings</span>
                </button>
              </footer>

              <p className="text-gray-500 dark:text-gray-400">
                {comment.comment}
              </p>
            </article>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </section>
  );
}

export default CommentTechTips;
