import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Award,
  Code,
  FolderGit2,
  Briefcase,
  FileText,
  MessageSquare,
  LogOut,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { useAdmin } from "../../context/AdminContext";
import { Button } from "../ui/button";

const nav = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/achievements", label: "Achievements", icon: Award },
  { to: "/admin/skills", label: "Skills", icon: Code },
  { to: "/admin/projects", label: "Projects", icon: FolderGit2 },
  { to: "/admin/experiences", label: "Experiences", icon: Briefcase },
  { to: "/admin/blog", label: "Blog", icon: FileText },
  { to: "/admin/messages", label: "Messages", icon: MessageSquare },
];

export default function AdminLayout() {
  const { admin, logout } = useAdmin();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-card border-r border-border transform transition-transform md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-border">
          <h1 className="font-bold text-lg">Admin Panel</h1>
          <p className="text-xs text-muted-foreground truncate">
            {admin?.email}
          </p>
        </div>
        <nav className="p-4 space-y-1">
          {nav.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-border mt-auto">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden p-4 border-b border-border flex items-center">
          <Button size="icon" variant="ghost" onClick={() => setOpen(!open)}>
            <Menu className="h-5 w-5" />
          </Button>
          <span className="ml-3 font-semibold">Admin</span>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}