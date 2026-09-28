import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "/site-svg.png";

import LoginPage from "./pages/login/LoginPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import AdminLayout from "./layouts/adminLayout/AdminLayout";
import AddProject from "./pages/addProject/AddProject";
import Edit from "./pages/editProject/Edit";
import AddUser from "./pages/addUser/AddUser";
import RequireAuth from "./services/auth/RequireAuth";
import { ROLES } from "./config/roles";
import PersistLogin from "./services/auth/persistLogin/PersistLogin";
import Prefetch from "./services/auth/Prefetch";
import Layouts from "./layouts/Layouts";
import AllProject from "./pages/allProjects/AllProject";
import Home from "./pages/home/Home";
import Settings from "./pages/settingsPage/Settings";
import EditUser from "./pages/editUser/EditUser";
import UsersPage from "./pages/usersPage/UsersPage";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  /* scroll to Top effect on page load*/
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //Theme effect
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  //Theme effect
  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");

    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <Routes>
      {/* Portfolio Public Route */}
      <Route
        element={
          <Layouts isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<AllProject />} />
      </Route>

      {/* Login route */}
      <Route path="login" element={<LoginPage />} />

      {/* Admin Page */}
      <Route element={<PersistLogin />}>
        <Route
          element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
        >
          <Route element={<Prefetch />}>
            <Route
              path="admin"
              element={
                <AdminLayout
                  isDarkMode={isDarkMode}
                  setIsDarkMode={setIsDarkMode}
                />
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              {/* Dashboard */}
              <Route path="dashboard" element={<DashboardPage />} />

              {/* Users */}
              <Route path="users">
                <Route index element={<UsersPage />} />
                <Route path="add" element={<AddUser />} />
                <Route path="edit/:id" element={<EditUser />} />
              </Route>

              {/* Projects */}
              <Route path="projects">
                <Route path="add" element={<AddProject />} />
                <Route path="edit/:id" element={<Edit />} />
              </Route>

              {/* Settings */}
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
