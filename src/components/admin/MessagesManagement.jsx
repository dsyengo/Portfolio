import { useEffect, useState } from "react";
import { Trash2, MailOpen, Mail } from "lucide-react";
import { toast } from "sonner";
import api from "../../lib/api";
import { Button } from "../ui/button";
import PageHeader from "./PageHeader";

export default function MessagesManagement() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () =>
    api.get("/messages").then((r) => setItems(r.data)).finally(() => setLoading(false));

  useEffect(() => { load(); }, []);

  const markRead = async (id) => {
    await api.put(`/messages/${id}/read`);
    setItems((prev) => prev.map((m) => (m._id === id ? { ...m, read: true } : m)));
    toast.success("Marked as read");
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    await api.delete(`/messages/${id}`);
    setItems((prev) => prev.filter((m) => m._id !== id));
    toast.success("Deleted");
  };

  return (
    <div>
      <PageHeader title="Messages" description="Contact form submissions" />
      {loading ? <p>Loading…</p> : (
        <div className="space-y-3">
          {items.map((m) => (
            <div key={m._id} className={`p-4 rounded-xl border border-border ${m.read ? "bg-card" : "bg-primary/5"}`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold">{m.subject || "(no subject)"}</p>
                  <p className="text-xs text-muted-foreground">
                    {m.name} &lt;{m.email}&gt; · {new Date(m.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  {!m.read && (
                    <Button variant="ghost" size="icon" onClick={() => markRead(m._id)}><MailOpen className="h-4 w-4" /></Button>
                  )}
                  <Button variant="ghost" size="icon" onClick={() => remove(m._id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                </div>
              </div>
              <p className="mt-3 text-sm whitespace-pre-wrap">{m.message}</p>
            </div>
          ))}
          {items.length === 0 && <p className="text-muted-foreground">No messages yet.</p>}
        </div>
      )}
    </div>
  );
}