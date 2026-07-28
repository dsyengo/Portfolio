import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AdminContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  },
});

export function AdminProvider({ children }) {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalProjects: 0,
    totalMessages: 0,
    unreadMessages: 0,
    totalViews: 0,
  });
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all data in parallel
      const [blogRes, projectsRes, contactsRes] = await Promise.all([
        api.get("/blog?limit=100").catch((err) => {
          console.error("Blog fetch error:", err);
          return { data: { data: [], pagination: { totalPosts: 0 } } };
        }),
        api.get("/projects").catch((err) => {
          console.error("Projects fetch error:", err);
          return { data: { data: [] } };
        }),
        api.get("/contact").catch((err) => {
          console.error("Contacts fetch error:", err);
          return { data: { data: [] } };
        }),
      ]);

      // Safely extract data
      const blogPosts = blogRes.data?.data || [];
      const totalPosts =
        blogRes.data?.pagination?.totalPosts || blogPosts.length || 0;
      const projects = projectsRes.data?.data || [];
      const totalProjects = projects.length || 0;
      const messages = contactsRes.data?.data || [];
      const unreadMessages = messages.filter((m) => !m.read).length || 0;

      // Calculate total views safely
      const totalViews = Array.isArray(blogPosts)
        ? blogPosts.reduce((sum, post) => sum + (post.views || 0), 0)
        : 0;

      setStats({
        totalPosts,
        totalProjects,
        totalMessages: messages.length,
        unreadMessages,
        totalViews,
      });

      setRecentMessages(Array.isArray(messages) ? messages.slice(0, 5) : []);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      setError(
        "Failed to load dashboard data. Please make sure the backend server is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        api,
        stats,
        recentMessages,
        loading,
        error,
        fetchDashboardStats,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
};
