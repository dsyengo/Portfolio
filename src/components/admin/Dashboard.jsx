import { useAdmin } from "../../context/AdminContext";
import {
  FileText,
  FolderGit2,
  MessageSquare,
  Eye,
  TrendingUp,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const viewsData = [
  { name: "Mon", views: 120 },
  { name: "Tue", views: 250 },
  { name: "Wed", views: 180 },
  { name: "Thu", views: 320 },
  { name: "Fri", views: 280 },
  { name: "Sat", views: 150 },
  { name: "Sun", views: 200 },
];

const categoryData = [
  { name: "Cybersecurity", posts: 2 },
  { name: "DevOps", posts: 1 },
  { name: "AI", posts: 1 },
  { name: "Projects", posts: 1 },
];

export default function Dashboard() {
  const { stats, recentMessages, loading, error, fetchDashboardStats } =
    useAdmin();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Connection Error
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
          {error}
        </p>
        <button
          onClick={fetchDashboardStats}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RefreshCw size={18} />
          Retry
        </button>
      </div>
    );
  }

  const statCards = [
    {
      label: "Total Blog Posts",
      value: stats.totalPosts || 0,
      icon: FileText,
      change: "+12%",
      trend: "up",
      color: "blue",
    },
    {
      label: "Total Projects",
      value: stats.totalProjects || 0,
      icon: FolderGit2,
      change: "+5%",
      trend: "up",
      color: "green",
    },
    {
      label: "Unread Messages",
      value: stats.unreadMessages || 0,
      icon: MessageSquare,
      change: "-8%",
      trend: "down",
      color: "yellow",
    },
    {
      label: "Total Views",
      value: stats.totalViews || 0,
      icon: Eye,
      change: "+25%",
      trend: "up",
      color: "purple",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Welcome back, Denis! Here's what's happening with your portfolio.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
            green:
              "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400",
            yellow:
              "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400",
            purple:
              "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
          };

          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${colorClasses[stat.color]}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <ArrowUpRight size={16} />
                  ) : (
                    <ArrowDownRight size={16} />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Weekly Views
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={viewsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="views"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ fill: "#3B82F6" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Posts by Category
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip />
              <Bar dataKey="posts" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Messages */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Messages
          </h3>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {recentMessages.length > 0 ? (
            recentMessages.map((message, index) => (
              <div
                key={message._id || index}
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                      {message.name?.charAt(0) || "?"}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {message.name || "Unknown"}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {message.subject || "No subject"}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-1 line-clamp-1">
                        {message.message || ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!message.read && (
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs rounded-full">
                        New
                      </span>
                    )}
                    <Clock size={16} className="text-gray-400" />
                    <span className="text-xs text-gray-500">
                      {message.createdAt
                        ? new Date(message.createdAt).toLocaleDateString()
                        : ""}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">No messages yet</div>
          )}
        </div>
      </div>
    </div>
  );
}
