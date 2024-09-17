import { Routes, Route } from "react-router-dom";

// Components
import ProtectedRoute from "./components/ProtectedRoute";
import Setting from "./pages/Setting";
//Pages
import Dashboard from "./pages/Dashboard";
import ApplyLeave from "./pages/ApplyLeave";
import User from "./pages/User";
import AddUser from "./pages/AddUser";
import Inbox from "./pages/Inbox";
import MyProfile from "./pages/MyProfile";
import UserDetail from "./pages/user_detail";
import UpdateUser from "./pages/updateUser";
import Home from "./pages/Board";
import Sidebar from "./components/DashboardLayout";
import Chat from "../src/components/Chat";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={["admin", "user", "HR"]}>
              <Sidebar />
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/setting"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Sidebar />
              <Setting />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute roles={["admin", "user", "HR"]}>
              <Sidebar />
              <Chat />
            </ProtectedRoute>
          }
        />
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
