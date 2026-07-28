"use client";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme-context";
import { AdminProvider } from "./context/AdminContext";
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
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./components/admin/Dashboard";
import BlogManagement from "./components/admin/BlogManagement";
import ProjectsManagement from "./components/admin/ProjectsManagement";
import AchievementsManagement from "./components/admin/AchievementsManagement";
import SkillsManagement from "./components/admin/SkillsManagement";
import MessagesManagement from "./components/admin/MessagesManagement";

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AdminProvider>
        <Router>
          <div className="min-h-screen bg-background text-foreground">
            <Routes>
              {/* Public Routes */}
              <Route
                path="/"
                element={
                  <>
                    <Header />
                    <Hero />
                    <About />
                    <Skills />
                    <Projects />
                    <Achievements />
                    <Contact />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/blog"
                element={
                  <>
                    <Header />
                    <Blog />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/blog/:slug"
                element={
                  <>
                    <Header />
                    <BlogPost />
                    <Footer />
                  </>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/admin"
                element={
                  <AdminLayout>
                    <Dashboard />
                  </AdminLayout>
                }
              />
              <Route
                path="/admin/blog"
                element={
                  <AdminLayout>
                    <BlogManagement />
                  </AdminLayout>
                }
              />
              <Route
                path="/admin/projects"
                element={
                  <AdminLayout>
                    <ProjectsManagement />
                  </AdminLayout>
                }
              />
              <Route
                path="/admin/achievements"
                element={
                  <AdminLayout>
                    <AchievementsManagement />
                  </AdminLayout>
                }
              />
              <Route
                path="/admin/skills"
                element={
                  <AdminLayout>
                    <SkillsManagement />
                  </AdminLayout>
                }
              />
              <Route
                path="/admin/messages"
                element={
                  <AdminLayout>
                    <MessagesManagement />
                  </AdminLayout>
                }
              />
            </Routes>
          </div>
        </Router>
      </AdminProvider>
    </ThemeProvider>
  );
}
