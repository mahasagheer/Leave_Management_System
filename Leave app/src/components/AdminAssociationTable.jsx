import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../service/authentication";
import UserAvatar from "../public/userImg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faUserXmark } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminAssociatedEmployees() {
  const [associatedEmployees, setAssociatedEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const apiURL = import.meta.env.VITE_API;
  const { data } = useContext(AuthContext);
  const [allEmployees, setAllEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState({ open: false, emp: null });

  const fetchAssociated = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${apiURL}/association/associatedEmployees/${data._id}`
      );
      setAssociatedEmployees(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Error fetching associated employees", err);
    }
  };

  useEffect(() => {
    if (data?._id) {
      fetchAssociated();
    }
  }, [data]);

  const handleUnassign = async (empId) => {
    try {
      await axios.put(`${apiURL}/association/unassignEmployee`, {
        managerId: data._id,
        employeeId: empId,
      });
      await fetchAssociated();
      toast.info("Employee unassigned");
    } catch (err) {
      toast.error("Error removing employee");
    }
  };

  const openModal = async () => {
    try {
      setLoading(true);
      const allEmpRes = await axios.get(`${apiURL}/association/allemployees`);
      // Exclude already associated employees
      const available = allEmpRes.data.filter(emp => !associatedEmployees.some(ae => ae._id === emp._id));
      console.log(available);
      setAllEmployees(available);
      setSelectedEmployees([]);
      setModalOpen(true);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error("Error opening add member modal");
    }
  };

  const handleAssign = async () => {
    setLoading(true);
    try {
      await axios.put(`${apiURL}/association/assignEmployees`, {
        employeeIds: selectedEmployees,
        managerId: data._id,
      });
      setModalOpen(false);
      fetchAssociated();
      toast.success("Member added successfully!");
    } catch (err) {
      toast.error("Failed to add members");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="associate-employee" className="p-0 sm:p-4 sm:ml-64 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <ToastContainer />
      {loading && <div className="loader ml-[50%] mt-[25%]"></div>}
      {!loading && (
        <div className="flex flex-col gap-4 h-auto mt-16">
          <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow p-4 overflow-x-auto">
            {message && (
              <div className="mb-4 text-center text-sm text-green-600 dark:text-green-400">{message}</div>
            )}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div>
                <h1 className="text-2xl sm:text-3xl text-gray-900 dark:text-white">
                  Associated Employees ({associatedEmployees.length})
                </h1>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-400" />
                  </span>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
                  />
                </div>
                <button
                  onClick={openModal}
                  className="flex items-center gap-2 bg-[#90d7f5] hover:bg-blue-400 text-black dark:bg-blue-600 dark:hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2.5 transition focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow"
                >
                  + Add Member
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-gray-800 text-sm text-left text-gray-700 dark:text-gray-400 rounded-lg">
                <thead className="bg-[#90d7f5] dark:bg-gray-700 text-xs uppercase text-gray-700 dark:text-gray-200">
                  <tr>
                    <th className="px-4 py-3">Avatar</th>
                    <th className="px-4 py-3">Employee ID</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Department</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {associatedEmployees
                    .filter((item) => {
                      return search.toLowerCase() === ""
                        ? item
                        : item.name.toLowerCase().includes(search);
                    })
                    .map((emp) => (
                      <tr
                        key={emp._id}
                        className="border-b border-gray-100 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors group"
                      >
                        <td className="px-4 py-4">
                          <img src={UserAvatar} alt="User" className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-600 shadow-sm" />
                        </td>
                        <td className="px-4 py-4 font-bold underline text-sky-600">{emp._id}</td>
                        <td className="px-4 py-4 font-semibold text-gray-900 dark:text-white">{emp.name}</td>
                        <td className="px-4 py-4">{emp.department}</td>
                        <td className="px-4 py-4">{emp.email}</td>
                        <td className="px-4 py-4 dark:bg-gray-800">
                          <div className="flex justify-center gap-4">
                            <button
                              className="text-red-600 hover:text-red-800 font-semibold"
                              onClick={() => setConfirmModal({ open: true, emp })}
                            >
                              <FontAwesomeIcon icon={faUserXmark} className="text-red" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          {modalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 w-full max-w-md relative border border-gray-200 dark:border-gray-700">
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add Members</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">Select an employee to associate with you.</p>
                  </div>
                  <button
                    className="text-gray-400 hover:text-blue-600 dark:hover:text-white transition"
                    onClick={() => setModalOpen(false)}
                    aria-label="Close modal"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="border-b border-gray-200 dark:border-gray-700 mb-4" />
                {/* Modal Body */}
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    Select Employees
                  </label>
                  <select
                    multiple
                    className="w-full h-48 p-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-900 transition-all shadow-sm text-base mb-6"
                    value={selectedEmployees}
                    onChange={(e) =>
                      setSelectedEmployees(
                        Array.from(e.target.selectedOptions, (option) => option.value)
                      )
                    }
                  >
                    {allEmployees.length === 0 ? (
                      <option disabled>No employees available</option>
                    ) : (
                      allEmployees.map((emp) => (
                        <option key={emp._id} value={emp._id} className="py-2 px-3">
                          {emp.name} {emp.Job_title && <span className="text-gray-500">({emp.Job_title})</span>} <br/> <span className="text-gray-400">{emp.email}</span>
                        </option>
                      ))
                    )}
                  </select>
                  <div className="flex justify-end gap-4">
                    <button
                      className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                      onClick={() => setModalOpen(false)}
                      type="button"
                    >
                      Cancel
                    </button>
                    <button
                      className="px-5 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white  shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      onClick={handleAssign}
                      disabled={loading || selectedEmployees.length === 0}
                      type="button"
                    >
                      {loading ? "Saving..." : "Add Member"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Confirm Unassign Modal */}
          {confirmModal.open && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-fadeIn border border-red-200 dark:border-red-700">
                <button
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-600 dark:hover:text-white transition"
                  onClick={() => setConfirmModal({ open: false, emp: null })}
                  aria-label="Close modal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-red-100 dark:bg-red-800 rounded-full p-3 mb-4">
                    <FontAwesomeIcon icon={faUserXmark} className="text-red-600 dark:text-red-200 text-3xl" />
                  </div>
                  <h2 className="text-xl font-bold text-red-700 dark:text-red-300 mb-2">Unassign Member?</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">Are you sure you want to unassign <span className="font-semibold">{confirmModal.emp?.name}</span> from your associated members?</p>
                  <div className="flex gap-4 justify-center">
                    <button
                      className="px-5 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition font-medium"
                      onClick={() => setConfirmModal({ open: false, emp: null })}
                      type="button"
                    >
                      Cancel
                    </button>
                    <button
                      className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                      onClick={async () => {
                        await handleUnassign(confirmModal.emp._id);
                        setConfirmModal({ open: false, emp: null });
                      }}
                      type="button"
                    >
                      Unassign
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default AdminAssociatedEmployees;