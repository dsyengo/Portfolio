import { useEffect, useState } from "react";
import { Award, Code, FolderGit2, Briefcase, FileText, MessageSquare } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import api from "../../lib/api";

const widgets = [
  { key: "achievements", label: "Achievements", icon: Award, color: "text-yellow-500" },
  { key: "skills", label: "Skill Groups", icon: Code, color: "text-blue-500" },
  { key: "projects", label: "Projects", icon: FolderGit2, color: "text-green-500" },
  { key: "experiences", label: "Experiences", icon: Briefcase, color: "text-purple-500" },
  { key: "blog", label: "Blog Posts", icon: FileText, color: "text-pink-500" },
  { key: "messages", label: "Messages", icon: MessageSquare, color: "text-orange-500" },
];

export default function Dashboard() {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    Promise.all(
      widgets.map((w) => api.get(`/${w.key}`).then((r) => [w.key, r.data.length]))
    ).then((pairs) => setCounts(Object.fromEntries(pairs)));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {widgets.map((w) => {
          const Icon = w.icon;
          return (
            <Card key={w.key}>
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`p-3 rounded-lg bg-muted ${w.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-3xl font-bold">
                    {counts[w.key] ?? "…"}
                  </p>
                  <p className="text-sm text-muted-foreground">{w.label}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}