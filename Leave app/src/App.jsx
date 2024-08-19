import { Routes, Route } from "react-router-dom";

// Components
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

//Pages
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import ApplyLeave from "./pages/ApplyLeave";
import User from "./pages/User";
import AddUser from "./pages/AddUser";
import Inbox from "./pages/Inbox";
import LeaveSend from "./pages/LeaveSend";
import UserAdded from "./pages/UserAdded";
import MyProfile from "./pages/MyProfile";
import UserDetail from "./pages/user_detail";
import LeaveDecision from "./pages/LeaveDecision";
import UpdateUser from "./pages/updateUser";
import Home from "./pages/Board";
import Sidebar from "./components/DashboardLayout";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/send"
          element={
            <ProtectedRoute roles={["admin", "user", "HR"]}>
              <Layout />
              <LeaveSend />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Home />} />
        <Route
          path="/user_added_successfully"
          element={
            <ProtectedRoute roles={["admin", "HR"]}>
              <Layout />
              <UserAdded />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={["admin", "user", "HR"]}>
              <Sidebar />
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Auth />} />
        <Route
          path="/Leave"
          element={
            <ProtectedRoute roles={["user", "HR"]}>
              <Sidebar />
              <ApplyLeave />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my_profile"
          element={
            <ProtectedRoute roles={["user"]}>
              <Sidebar />
              <MyProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute roles={["admin", "HR"]}>
              <Sidebar />
              <User />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/:id"
          element={
            <ProtectedRoute roles={["admin", "HR"]}>
              <Sidebar />
              <UserDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new_user/:id"
          element={
            <ProtectedRoute roles={["admin", "HR"]}>
              <Sidebar />
              <AddUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="/update_user/:id"
          element={
            <ProtectedRoute roles={["admin", "HR"]}>
              <Sidebar />
              <UpdateUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new_user"
          element={
            <ProtectedRoute roles={["admin", "HR"]}>
              <Sidebar />
              <AddUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inbox"
          element={
            <ProtectedRoute roles={["admin", "user", "HR"]}>
              <Sidebar />
              <Inbox />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
