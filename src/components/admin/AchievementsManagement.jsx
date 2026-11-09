import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useCrud } from "../../hooks/useCrud";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import Modal from "./Modal";
import PageHeader from "./PageHeader";

const empty = {
  title: "",
  description: "",
  year: new Date().getFullYear().toString(),
  type: "Certification",
  color: "from-blue-500 to-cyan-500",
  icon: "Award",
};

export default function AchievementsManagement() {
  const { items, loading, create, update, remove } = useCrud("/achievements");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);

  const openNew = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (it) => { setEditing(it); setForm(it); setOpen(true); };

  const submit = async (e) => {
    e.preventDefault();
    if (editing) await update(editing._id, form);
    else await create(form);
    setOpen(false);
  };

  const onChange = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div>
      <PageHeader title="Achievements" description="Manage awards and certifications">
        <Button onClick={openNew}><Plus className="h-4 w-4 mr-2" />New</Button>
      </PageHeader>

      {loading ? <p>Loading…</p> : (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-3">Title</th>
                <th className="text-left p-3">Type</th>
                <th className="text-left p-3">Year</th>
                <th className="text-right p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it._id} className="border-t border-border">
                  <td className="p-3">{it.title}</td>
                  <td className="p-3">{it.type}</td>
                  <td className="p-3">{it.year}</td>
                  <td className="p-3 text-right">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(it)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => remove(it._id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr><td colSpan={4} className="p-6 text-center text-muted-foreground">No achievements yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? "Edit Achievement" : "New Achievement"}>
        <form onSubmit={submit} className="space-y-4">
          <div><Label>Title</Label><Input required value={form.title} onChange={onChange("title")} /></div>
          <div><Label>Description</Label><Textarea rows={3} value={form.description} onChange={onChange("description")} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Year</Label><Input required value={form.year} onChange={onChange("year")} /></div>
            <div>
              <Label>Type</Label>
              <select className="w-full h-10 px-3 rounded-md bg-background border border-border" value={form.type} onChange={onChange("type")}>
                <option>Competition</option><option>Certification</option><option>Award</option><option>Other</option>
              </select>
            </div>
          </div>
          <div><Label>Color gradient (Tailwind)</Label><Input value={form.color} onChange={onChange("color")} placeholder="from-blue-500 to-cyan-500" /></div>
          <Button type="submit" className="w-full">{editing ? "Update" : "Create"}</Button>
        </form>
      </Modal>
    </div>
  );
}