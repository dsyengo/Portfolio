import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme-context";
import { AdminProvider } from "./context/AdminContext";

// Public
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Blog from "./components/Blog";
import BlogPost from "./components/BlogPost";

// Admin
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./components/admin/Dashboard";
import AchievementsManagement from "./components/admin/AchievementsManagement";
import SkillsManagement from "./components/admin/SkillsManagement";
import ProjectsManagement from "./components/admin/ProjectsManagement";
import ExperiencesManagement from "./components/admin/ExperiencesManagement";
import BlogManagement from "./components/admin/BlogManagement";
import MessagesManagement from "./components/admin/MessagesManagement";
import Login from "./components/admin/Login"; // ← was "./pages/admin/Login"

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AdminProvider>
        <Router>
          <Toaster richColors position="top-right" />
          <Routes>
            {/* Public */}
            <Route path="/" element={<><Header /><Hero /><About /><Skills /><Projects /><Achievements /><Contact /><Footer /></>} />
            <Route path="/blog" element={<><Header /><Blog /><Footer /></>} />
            <Route path="/blog/:slug" element={<><Header /><BlogPost /><Footer /></>} />

            {/* Admin auth */}
            <Route path="/admin/login" element={<Login />} />

            {/* Admin protected */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="achievements" element={<AchievementsManagement />} />
              <Route path="skills" element={<SkillsManagement />} />
              <Route path="projects" element={<ProjectsManagement />} />
              <Route path="experiences" element={<ExperiencesManagement />} />
              <Route path="blog" element={<BlogManagement />} />
              <Route path="messages" element={<MessagesManagement />} />
            </Route>
          </Routes>
        </Router>
      </AdminProvider>
    </ThemeProvider>
  );
}