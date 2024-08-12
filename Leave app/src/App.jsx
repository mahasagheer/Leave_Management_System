import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Layout from "./components/Layout";
import Loader from "./components/loader";
import ProtectedRoute from "./components/ProtectedRoute";

//Pages
import Home from "./pages/Home";
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

function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

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
        <Route
          path="/user_added_successfully"
          element={
            <ProtectedRoute roles={["admin", "HR"]}>
              <Layout />
              <UserAdded />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={["admin", "user", "HR"]}>
              <Layout />
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={loading ? <Loader /> : <Auth />} />
        <Route
          path="/Leave"
          element={
            <ProtectedRoute roles={["user"]}>
              <Layout />
              <ApplyLeave />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leave_Decision/:id"
          element={
            <ProtectedRoute roles={["HR", "admin"]}>
              <Layout />
              <LeaveDecision />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my_profile"
          element={
            <ProtectedRoute roles={["user"]}>
              <Layout />
              <MyProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute roles={["admin", "HR"]}>
              <Layout />
              <User />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/:id"
          element={
            <ProtectedRoute roles={["admin", "HR"]}>
              <Layout />
              <UserDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new_user/:id"
          element={
            <ProtectedRoute roles={["admin", "HR"]}>
              <Layout />
              <AddUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="/update_user/:id"
          element={
            <ProtectedRoute roles={["admin", "HR"]}>
              <Layout />
              <UpdateUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new_user"
          element={
            <ProtectedRoute roles={["admin", "HR"]}>
              <Layout />
              <AddUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inbox"
          element={
            <ProtectedRoute roles={["admin", "user", "HR"]}>
              <Layout />
              <Inbox />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
