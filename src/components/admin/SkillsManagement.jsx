import { useState, useEffect } from "react";
import { useAdmin } from "../../context/AdminContext";
import {
  Plus,
  Edit2,
  Trash2,
  Server,
  Code,
  Database,
  Shield,
  Cloud,
  Palette,
  X,
  AlertCircle,
} from "lucide-react";

const iconOptions = [
  "Server",
  "Code",
  "Database",
  "Shield",
  "Cloud",
  "Palette",
];

const colorOptions = [
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-green-500 to-emerald-500",
  "from-red-500 to-orange-500",
  "from-yellow-500 to-orange-500",
  "from-indigo-500 to-blue-500",
];

export default function SkillsManagement() {
  const { api, fetchDashboardStats } = useAdmin();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    icon: "Server",
    skills: [""],
    color: "from-blue-500 to-cyan-500",
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/skills");
      // Safely set skills - ensure it's always an array
      setSkills(Array.isArray(response.data?.data) ? response.data.data : []);
    } catch (error) {
      console.error("Error fetching skills:", error);
      setError(
        "Failed to load skills. Make sure the backend server is running.",
      );
      setSkills([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        skills: formData.skills.filter((skill) => skill.trim() !== ""),
      };

      if (editingSkill) {
        await api.put(`/skills/${editingSkill._id}`, data);
      } else {
        await api.post("/skills", data);
      }

      setShowForm(false);
      setEditingSkill(null);
      resetForm();
      fetchSkills();
      fetchDashboardStats();
    } catch (error) {
      console.error("Error saving skill:", error);
      alert(
        "Error saving skill: " +
          (error.response?.data?.message || error.message),
      );
    }
  };

  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setFormData({
      title: skill.title || "",
      icon: skill.icon || "Server",
      skills:
        Array.isArray(skill.skills) && skill.skills.length > 0
          ? skill.skills
          : [""],
      color: skill.color || "from-blue-500 to-cyan-500",
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this skill category?"))
      return;
    try {
      await api.delete(`/skills/${id}`);
      fetchSkills();
      fetchDashboardStats();
    } catch (error) {
      console.error("Error deleting skill:", error);
      alert(
        "Error deleting skill: " +
          (error.response?.data?.message || error.message),
      );
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      icon: "Server",
      skills: [""],
      color: "from-blue-500 to-cyan-500",
    });
  };

  const addSkillItem = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, ""],
    });
  };

  const removeSkillItem = (index) => {
    const newSkills = formData.skills.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      skills: newSkills.length > 0 ? newSkills : [""],
    });
  };

  const updateSkillItem = (index, value) => {
    const newSkills = [...formData.skills];
    newSkills[index] = value;
    setFormData({
      ...formData,
      skills: newSkills,
    });
  };

  const getIconComponent = (iconName) => {
    const icons = {
      Server: Server,
      Code: Code,
      Database: Database,
      Shield: Shield,
      Cloud: Cloud,
      Palette: Palette,
    };
    const Icon = icons[iconName] || Server;
    return <Icon className="w-8 h-8" />;
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading skills...</p>
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
            onClick={fetchSkills}
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Skills
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your skills and expertise categories ({skills.length}{" "}
            categories)
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setEditingSkill(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          New Skill Category
        </button>
      </div>

      {/* Skills Grid or Empty State */}
      {skills.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-12 text-center">
          <Code size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No skill categories yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Click the 'New Skill Category' button to add your first skills
            category
          </p>
          <button
            onClick={() => {
              resetForm();
              setEditingSkill(null);
              setShowForm(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create First Category
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <div
              key={skill._id}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 rounded-xl bg-gradient-to-r ${skill.color || "from-blue-500 to-cyan-500"} text-white`}
                >
                  {getIconComponent(skill.icon)}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(skill)}
                    className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
                    title="Edit skill category"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(skill._id)}
                    className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-gray-600 dark:text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete skill category"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {skill.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(skill.skills) &&
                  skill.skills.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-sm rounded-full"
                    >
                      {item}
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingSkill
                  ? "Edit Skill Category"
                  : "Create New Skill Category"}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingSkill(null);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="e.g., Backend Architecture"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Icon
                  </label>
                  <select
                    value={formData.icon}
                    onChange={(e) =>
                      setFormData({ ...formData, icon: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    {iconOptions.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Color Gradient
                  </label>
                  <select
                    value={formData.color}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    {colorOptions.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* Preview */}
              <div
                className={`p-4 rounded-lg bg-gradient-to-r ${formData.color}`}
              >
                <div className="flex items-center gap-3 text-white">
                  {getIconComponent(formData.icon)}
                  <span className="font-medium">
                    {formData.title || "Category Preview"}
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Skills List *
                </label>
                <div className="space-y-2">
                  {formData.skills.map((skill, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={skill}
                        onChange={(e) => updateSkillItem(index, e.target.value)}
                        className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter skill name"
                      />
                      <button
                        type="button"
                        onClick={() => removeSkillItem(index)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Remove skill"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addSkillItem}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                >
                  <Plus size={16} />
                  Add Skill
                </button>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingSkill(null);
                    resetForm();
                  }}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingSkill ? "Update Category" : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
