import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../service/authentication";

function AssignEmployees() {
  const [associatedEmployees, setAssociatedEmployees] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const apiURL = import.meta.env.VITE_API;
  const { data } = useContext(AuthContext);

  const fetchAssociated = async () => {
    try {
      const res = await axios.get(
        `${apiURL}/association/associatedEmployees/${data._id}`
      );
      setAssociatedEmployees(res.data);
    } catch (err) {
      console.error("Error fetching associated employees", err);
    }
  };

  const openModal = async () => {
    try {
      const [allEmpRes, associatedRes] = await Promise.all([
        axios.get(`${apiURL}/association/allemployees`),
        axios.get(`${apiURL}/association/associatedEmployees/${data._id}`),
      ]);

      setAllEmployees(allEmpRes.data);
      setSelectedEmployees(associatedRes.data.map((emp) => emp._id));
      setModalOpen(true);
    } catch (err) {
      console.error("Error opening modal", err);
    }
  };

  useEffect(() => {
    if (data?._id) {
      fetchAssociated();
    }
  }, [data]);

  const handleAssign = async () => {
    setLoading(true);
    try {
      await axios.put(`${apiURL}/association/assignEmployees`, {
        employeeIds: selectedEmployees,
        managerId: data._id,
      });
      setMessage("✅ Employees updated successfully");
      setModalOpen(false);
      fetchAssociated();
    } catch (err) {
      setMessage("❌ Failed to assign employees");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };


  const handleUnassign = async (empId) => {
    try {
      await axios.put(`${apiURL}/association/unassignEmployee`, {
        managerId: data._id,
        employeeId: empId,
      });
  
await fetchAssociated();
  
      setMessage("❌ Employee unassigned");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Failed to unassign", err);
      setMessage("Error removing employee");
      setTimeout(() => setMessage(""), 3000);
    }
  };
  
  return (
    <div className="max-w-5xl ml-[25%] mt-20 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Associated Employees
        </h1>
        <button
          onClick={openModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          + Assign Employees
        </button>
      </div>

      {/* Associated Employees Table */}
      <table className="w-full text-sm text-left border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
        <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
          <tr>
            <th className="py-2 px-3">Name</th>
            <th className="py-2 px-3">Email</th>
            <th className="py-2 px-3">Department</th>
          </tr>
        </thead>
        <tbody>
          {associatedEmployees.length > 0 ? (
            associatedEmployees.map((emp) => (
              <tr
                key={emp._id}
                className="border-t border-gray-300 dark:border-gray-600"
              >
                <td className="py-2 px-3">{emp.name}</td>
                <td className="py-2 px-3">{emp.email}</td>
                <td className="py-2 px-3">{emp.department}</td>
                <td className="py-2 px-3">
          <button
            onClick={() => handleUnassign(emp._id)}
            className="text-red-600 hover:text-red-800 font-semibold"
          >
            ❌ Remove
          </button>
        </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-4 text-gray-500">
                No employees associated yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Toast Message */}
      {message && (
        <div className="mt-4 text-center text-sm text-green-600 dark:text-green-400">
          {message}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-[90%] max-w-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
              Assign Employees
            </h2>

            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Select Employees:
            </label>

            <select
              multiple
              className="w-full h-40 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              value={selectedEmployees}
              onChange={(e) =>
                setSelectedEmployees(
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
            >
              {allEmployees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.name}
                </option>
              ))}
            </select>

            <div className="flex justify-end mt-6 gap-4">
              <button
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={handleAssign}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AssignEmployees;