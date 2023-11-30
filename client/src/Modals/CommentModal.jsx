import React from "react";

function CommentModal({ onClose, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submitting the comment
    // Call onSubmit with the comment data
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <form onSubmit={handleSubmit}>
          <textarea placeholder="Write your comment..." />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CommentModal;
