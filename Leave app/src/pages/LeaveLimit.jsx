import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export default function LeaveLimitForm() {
  const [leaveLimits, setLeaveLimits] = useState([]);
  const [selectedStaffType, setSelectedStaffType] = useState("");
  const [paidLeave, setPaidLeave] = useState(0);
  const [unpaidLeave, setUnpaidLeave] = useState(0);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const apiURL = import.meta.env.VITE_API;

  useEffect(() => {
    fetchLimits();
  }, []);

  const fetchLimits = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiURL}/leaveLimit/getAll`);
      setLeaveLimits(res.data?.data || []);
    } catch (err) {
      setMessage("⚠️ Failed to load leave limits");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (limit) => {
    setSelectedStaffType(limit.staff_type);
    setPaidLeave(limit.paid_leave_limit);
    setUnpaidLeave(limit.unpaid_leave_limit);
    setShowModal(true);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStaffType) {
      setError("Staff type is required");
      return;
    }

    try {
      const res = await axios.post(`${apiURL}/leaveLimit/set`, {
        staff_type: selectedStaffType,
        paid_leave_limit: paidLeave,
        unpaid_leave_limit: unpaidLeave,
      });
      setMessage("✅ " + res.data.message);
      setShowModal(false);
      fetchLimits();
    } catch (err) {
      console.error(err);
      setMessage("❌ Error setting limits");
    }
  };

  return (
    <section
      id="leaveLimit"
      className="p-0 sm:p-4 sm:ml-64 bg-gray-50 dark:bg-gray-900 min-h-screen"
    >
      {loading ? (
        <div className="loader ml-[50%] mt-[25%]"></div>
      ) : (
        <div className="flex flex-col gap-4 h-auto mt-16">
          <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow p-4 overflow-x-auto">
            <ToastContainer />
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div>
                <h1 className="text-2xl sm:text-3xl text-gray-900 dark:text-white">
                  Leave Limit Settings
                </h1>
                </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full bg-white dark:bg-gray-800 text-sm text-left text-gray-700 dark:text-gray-400 rounded-lg">
                    <thead className="bg-[#90d7f5] dark:bg-gray-700 text-xs uppercase text-gray-700 dark:text-gray-200">
                      <tr>
                        <th className="py-3 px-4">Staff Type</th>
                        <th className="py-3 px-4">Paid Leave</th>
                        <th className="py-3 px-4">Unpaid Leave</th>
                        <th className="py-3 px-4">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaveLimits.map((limit) => (
                        <tr
                          key={limit.staff_type}
                          className="border-b border-gray-100 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors group"
                        >
                          <td className="py-4 px-4 capitalize font-medium">
                            {limit.staff_type}
                          </td>
                          <td className="py-4 px-4">
                            {limit.paid_leave_limit}
                          </td>
                          <td className="py-4 px-4">
                            {limit.unpaid_leave_limit}
                          </td>
                          <td className="px-4 py-4 dark:bg-gray-800">
                            <div className="flex justify-center gap-4">
                              <button
                                className="text-blue-700 hover:text-blue-900 transition-colors"
                                onClick={() => openEditModal(limit)}
                              >
                                <FontAwesomeIcon
                                  icon={faPenToSquare}
                                  size="lg"
                                />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
        
      )}

      {message && (
        <p className="text-center mt-4 text-sm text-green-600">{message}</p>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Update Leave Limits for{" "}
              <span className="capitalize">{selectedStaffType}</span>
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" value={selectedStaffType} />

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Paid Leave Limit
                </label>
                <input
                  type="number"
                  className="w-full mt-1 p-2 border rounded"
                  value={paidLeave}
                  onChange={(e) => setPaidLeave(Number(e.target.value))}
                  min={0}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Unpaid Leave Limit
                </label>
                <input
                  type="number"
                  className="w-full mt-1 p-2 border rounded"
                  value={unpaidLeave}
                  onChange={(e) => setUnpaidLeave(Number(e.target.value))}
                  min={0}
                />
              </div>

              {error && <p className="text-red-600 text-xs">{error}</p>}

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
