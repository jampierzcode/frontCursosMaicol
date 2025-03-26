import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Usuarios from "./pages/admin/Usuarios";
import Layout from "./components/rolAdmin/Layout";
import Dashboard from "./pages/admin/Dashboard";
import NotFoundPage from "./pages/NotFoundPage";
import Identy from "./pages/Identy";
import Categories from "./pages/admin/Categories";
import Courses from "./pages/admin/Courses";
import VideoUploader from "./pages/admin/VideoUploader";
import Course from "./pages/admin/Course";
import CourseEditor from "./pages/admin/CourseEdit";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/login/identy" element={<Identy />} />
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* RUTAS PARA USUARIO CUSTOMER */}

          {/* RUTAS PARA USUARIO ADMIN */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute roles={["admin"]}>
                <Layout>
                  <Dashboard />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <PrivateRoute roles={["admin"]}>
                <Layout>
                  <Categories />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/courses"
            element={
              <PrivateRoute roles={["admin"]}>
                <Layout>
                  <Courses />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/course/:id"
            element={
              <PrivateRoute roles={["admin"]}>
                <Layout>
                  <CourseEditor />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route path="/subirvideo" element={<VideoUploader />} />

          <Route
            path="/usuarios"
            element={
              <PrivateRoute roles={["customer"]}>
                <Layout>
                  <Usuarios />
                </Layout>
              </PrivateRoute>
            }
          />

          {/* RUTA DE FORBIDDEN */}
          <Route path="/forbidden" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
