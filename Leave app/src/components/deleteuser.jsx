import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Deleteuser = ({ id, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const local = localStorage.getItem("user");

  const apiURL = import.meta.env.VITE_API;

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = () => {
    axios
      .delete(`${apiURL}/users/${id}`, {
        headers: {
          Authorization: `${local}`,
        },
      })
      .then(() => {
        onDelete(); // Notify parent component about the delete
        setIsOpen(false); // Close modal
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="block text-white focus:outline-none focus:ring-2 focus:ring-red-400 rounded transition"
        type="button"
        aria-label="Delete user"
      >
        <FontAwesomeIcon icon={faTrash} className="text-red-600" size="lg" />
      </button>

      {isOpen && (
        <div
          id="popup-modal"
          tabIndex="-1"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 transition-opacity duration-300 animate-fadeIn"
          aria-modal="true"
          role="dialog"
        >
          <div className="relative w-full max-w-md mx-4 sm:mx-0">
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col items-center animate-slideUp">
              <button
                type="button"
                onClick={toggleModal}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white bg-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="flex flex-col items-center w-full">
                <div className="bg-red-100 dark:bg-red-900 rounded-full p-3 mb-4">
                  <FontAwesomeIcon icon={faTrash} className="text-red-600 text-2xl" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-center">Delete Employee</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">Are you sure you want to delete this employee? This action cannot be undone.</p>
                <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
                  <button
                    onClick={toggleModal}
                    type="button"
                    className="flex-1 py-2 px-4 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    type="button"
                    className="flex-1 py-2 px-4 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Deleteuser;
