import { useState, useEffect } from "react";
import { useAdmin } from "../../context/AdminContext";
import {
  Search,
  Mail,
  MailOpen,
  Trash2,
  Send,
  Clock,
  ExternalLink,
  AlertCircle,
} from "lucide-react";

export default function MessagesManagement() {
  const { api, fetchDashboardStats } = useAdmin();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    fetchMessages();
  }, [filter]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError(null);
      let query = "";
      if (filter === "unread") query = "?read=false";
      if (filter === "read") query = "?read=true";

      const response = await api.get(`/contact${query}`);
      // Safely set messages - ensure it's always an array
      setMessages(Array.isArray(response.data?.data) ? response.data.data : []);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setError(
        "Failed to load messages. Make sure the backend server is running.",
      );
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await api.patch(`/contact/${id}/read`);
      fetchMessages();
      fetchDashboardStats();
    } catch (error) {
      console.error("Error marking as read:", error);
      alert("Error marking message as read");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?"))
      return;
    try {
      await api.delete(`/contact/${id}`);
      if (selectedMessage?._id === id) setSelectedMessage(null);
      fetchMessages();
      fetchDashboardStats();
    } catch (error) {
      console.error("Error deleting message:", error);
      alert(
        "Error deleting message: " +
          (error.response?.data?.message || error.message),
      );
    }
  };

  const handleResendEmail = async (id) => {
    try {
      await api.post(`/contact/${id}/resend`);
      alert("Email resent successfully!");
      fetchMessages();
    } catch (error) {
      console.error("Error resending email:", error);
      alert(
        "Error resending email: " +
          (error.response?.data?.message || error.message),
      );
    }
  };

  // Safe filtering with array check and optional chaining
  const filteredMessages = Array.isArray(messages)
    ? messages.filter(
        (message) =>
          message?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message?.subject?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : [];

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading messages...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Connection Error
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={fetchMessages}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Messages
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage contact form submissions ({messages.length} messages)
        </p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          {["all", "unread", "read"].map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => {
                setFilter(filterOption);
                setSelectedMessage(null);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === filterOption
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {filteredMessages.length}{" "}
              {filteredMessages.length === 1 ? "Message" : "Messages"}
            </h3>
            <span className="text-xs text-gray-500 capitalize">{filter}</span>
          </div>

          {filteredMessages.length === 0 ? (
            <div className="p-8 text-center">
              <Mail size={32} className="mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">
                {searchTerm
                  ? "No messages match your search"
                  : `No ${filter === "all" ? "" : filter} messages`}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[600px] overflow-y-auto">
              {filteredMessages.map((message) => (
                <div
                  key={message._id}
                  onClick={() => setSelectedMessage(message)}
                  className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                    selectedMessage?._id === message._id
                      ? "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600"
                      : ""
                  } ${!message.read ? "bg-gray-50 dark:bg-gray-700/30" : ""}`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                      {!message.read && (
                        <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></span>
                      )}
                      <span className="truncate">
                        {message.name || "Unknown"}
                      </span>
                    </h4>
                    <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                      {message.createdAt
                        ? new Date(message.createdAt).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {message.subject || "No subject"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 truncate">
                    {message.email || "No email"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1 break-words">
                      {selectedMessage.subject || "No subject"}
                    </h2>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-gray-400">
                      <span>{selectedMessage.name || "Unknown"}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>{selectedMessage.email || "No email"}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>
                        {selectedMessage.createdAt
                          ? new Date(selectedMessage.createdAt).toLocaleString()
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    {!selectedMessage.read && (
                      <button
                        onClick={() => handleMarkAsRead(selectedMessage._id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        title="Mark as read"
                      >
                        <MailOpen size={18} />
                      </button>
                    )}
                    <button
                      onClick={() => handleResendEmail(selectedMessage._id)}
                      className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                      title="Resend email"
                    >
                      <Send size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(selectedMessage._id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Delete message"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {selectedMessage.name?.charAt(0) || "?"}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {selectedMessage.name || "Unknown"}
                    </h3>
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="text-sm text-blue-600 hover:underline break-all"
                    >
                      {selectedMessage.email || "No email"}
                    </a>
                  </div>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed break-words">
                    {selectedMessage.message || "No message content"}
                  </p>
                </div>
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock size={16} />
                    <span>
                      Received:{" "}
                      {selectedMessage.createdAt
                        ? new Date(selectedMessage.createdAt).toLocaleString()
                        : "N/A"}
                    </span>
                  </div>
                  {selectedMessage.read && (
                    <div className="flex items-center gap-2 text-sm text-blue-600 mt-2">
                      <MailOpen size={16} />
                      <span>Read</span>
                    </div>
                  )}
                  {selectedMessage.emailSent && (
                    <div className="flex items-center gap-2 text-sm text-green-600 mt-2">
                      <Send size={16} />
                      <span>
                        Email sent at:{" "}
                        {selectedMessage.emailSentAt
                          ? new Date(
                              selectedMessage.emailSentAt,
                            ).toLocaleString()
                          : "N/A"}
                      </span>
                    </div>
                  )}
                </div>
                <div className="mt-6">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || ""}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <ExternalLink size={18} />
                    Reply via Email
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-12 text-center">
              <Mail size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No Message Selected
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Select a message from the list to view its details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
