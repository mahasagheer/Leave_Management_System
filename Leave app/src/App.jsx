import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import ApplyLeave from "./pages/ApplyLeave";
import User from "./pages/User";
import AddUser from "./pages/AddUser";
import Inbox from "./pages/Inbox";
import Layout from "./components/Layout";
import LeaveSend from "./pages/LeaveSend";
import UserAdded from "./pages/UserAdded";
import ProtectedRoute from "./components/ProtectedRoute";
import { useState, useEffect } from "react";
import Loader from "./components/loader";
function App() {
  const [user, setUser] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/send"
            element={
              loading ? (
                <Loader />
              ) : (
                <>
                  {/* <ProtectedRoute> */}
                  <Layout />
                  <LeaveSend />
                  {/* </ProtectedRoute> */}
                </>
              )
            }
          />
          <Route
            path="/user_added_successfully"
            element={
              loading ? (
                <Loader />
              ) : (
                <>
                  {/* <ProtectedRoute> */}
                  <Layout />
                  <UserAdded />
                  {/* </ProtectedRoute> */}
                </>
              )
            }
          />

          <Route path="/" element={loading ? <Loader /> : <Home />} />
          <Route
            path="/dashboard"
            element={
              loading ? (
                <Loader />
              ) : (
                // <ProtectedRoute>
                <>
                  <Layout />
                  <Dashboard />
                </>
                // </ProtectedRoute>
              )
            }
          />
          <Route path="/login" element={loading ? <Loader /> : <Auth />} />
          <Route
            path="/Leave"
            element={
              loading ? (
                <Loader />
              ) : (
                <>
                  {/* <ProtectedRoute> */}
                  <Layout />
                  <ApplyLeave />
                  {/* </ProtectedRoute> */}
                </>
              )
            }
          />
          <Route
            path="/user"
            element={
              loading ? (
                <Loader />
              ) : (
                <>
                  {/* <ProtectedRoute> */}
                  <Layout />
                  <User />
                  {/* </ProtectedRoute> */}
                </>
              )
            }
          />
          <Route
            path="/new_user"
            element={
              loading ? (
                <Loader />
              ) : (
                <>
                  {/* <ProtectedRoute> */}
                  <Layout />
                  <AddUser />
                  {/* </ProtectedRoute> */}
                </>
              )
            }
          />
          <Route
            path="/inbox"
            element={
              loading ? (
                <Loader />
              ) : (
                <>
                  {/* <ProtectedRoute> */}
                  <Layout />
                  <Inbox />
                  {/* </ProtectedRoute> */}
                </>
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
