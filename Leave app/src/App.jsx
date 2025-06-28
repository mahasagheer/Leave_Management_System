import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/themeContext";

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
import Forgot from "./pages/Forgot";
import NotifyLeave from "./pages/Notifyleave";
import AssignEmployees from "./pages/AssociateEmployee";
import DirectLeaveAction from "./pages/DirectLeaveAction";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forgot_password" element={<Forgot/>} />
        <Route path="/inbox_messages/:token" element={<DirectLeaveAction />} />

        <Route
          path="/dashboard"
          element={
            <ThemeProvider>
              <ProtectedRoute roles={["admin", "user", "HR","Manager"]}>
                <Sidebar />
                <Dashboard />
              </ProtectedRoute>
            </ThemeProvider>
          }
        />
        <Route
          path="/setting"
          element={
            <ThemeProvider>
              <ProtectedRoute roles={["admin"]}>
                <Sidebar />
                <Setting />
              </ProtectedRoute>
            </ThemeProvider>
          }
        />
        <Route
          path="/Leave"
          element={
            <ThemeProvider>
              <ProtectedRoute roles={["user", "HR","Manager"]}>
                <Sidebar />
                <ApplyLeave />
              </ProtectedRoute>
            </ThemeProvider>
          }
        />
         <Route
          path="/notify_leave"
          element={
            <ThemeProvider>
              <ProtectedRoute roles={["user", "HR","Manager"]}>
                <Sidebar />
                <NotifyLeave />
              </ProtectedRoute>
            </ThemeProvider>
          }
        />
        <Route
          path="/associate_members"
          element={
            <ThemeProvider>
              <ProtectedRoute roles={["admin", "HR", "Manager"]}>
                <Sidebar />
                <AssignEmployees />
              </ProtectedRoute>
            </ThemeProvider>
          }
        />
        <Route
          path="/my_profile"
          element={
            <ThemeProvider>
              <ProtectedRoute roles={["user", "HR","Manager"]}>
                <Sidebar />
                <MyProfile />
              </ProtectedRoute>
            </ThemeProvider>
          }
        />
        <Route
          path="/user"
          element={
            <ThemeProvider>
              <ProtectedRoute roles={["admin", "HR", "Manager"]}>
                <Sidebar />
                <User />
              </ProtectedRoute>
            </ThemeProvider>
          }
        />
        <Route
          path="/user/:id"
          element={
            <ThemeProvider>
              <ProtectedRoute roles={["admin", "HR", "Manager"]}>
                <Sidebar />
                <UserDetail />
              </ProtectedRoute>
            </ThemeProvider>
          }
        />
        <Route
          path="/new_user/:id"
          element={
            <ThemeProvider>
              <ProtectedRoute roles={["admin", "HR"]}>
                <Sidebar />
                <AddUser />
              </ProtectedRoute>
            </ThemeProvider>
          }
        />

        <Route
          path="/update_user/:id"
          element={
            <ThemeProvider>
              <ProtectedRoute roles={["admin", "HR"]}>
                <Sidebar />
                <UpdateUser />
              </ProtectedRoute>
            </ThemeProvider>
          }
        />
        <Route
          path="/new_user"
          element={
            <ThemeProvider>
              <ProtectedRoute roles={["admin", "HR"]}>
                <Sidebar />
                <AddUser />
              </ProtectedRoute>
            </ThemeProvider>
          }
        />
        <Route
          path="/inbox"
          element={
            <ThemeProvider>
              <ProtectedRoute roles={["admin", "user", "HR","Manager"]}>
                <Sidebar />
                <Inbox />
              </ProtectedRoute>
            </ThemeProvider>
          }
        />
      </Routes>
    </>
  );
}

export default App;
