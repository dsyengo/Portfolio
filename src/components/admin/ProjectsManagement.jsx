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
  title: "", description: "", image: "", liveUrl: "", githubUrl: "",
  techText: "", featured: false, order: 0,
};

export default function ProjectsManagement() {
  const { items, loading, create, update, remove } = useCrud("/projects");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);

  const openNew = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (it) => {
    setEditing(it);
    setForm({ ...it, techText: (it.technologies || []).join(", ") });
    setOpen(true);
  };

  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      title: form.title, description: form.description,
      image: form.image, liveUrl: form.liveUrl, githubUrl: form.githubUrl,
      featured: !!form.featured, order: Number(form.order) || 0,
      technologies: form.techText.split(",").map((s) => s.trim()).filter(Boolean),
    };
    if (editing) await update(editing._id, payload);
    else await create(payload);
    setOpen(false);
  };

  const onChange = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  return (
    <div>
      <PageHeader title="Projects" description="Manage your portfolio projects">
        <Button onClick={openNew}><Plus className="h-4 w-4 mr-2" />New</Button>
      </PageHeader>

      {loading ? <p>Loading…</p> : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((p) => (
            <div key={p._id} className="rounded-xl border border-border bg-card overflow-hidden">
              {p.image && <img src={p.image} alt={p.title} className="w-full h-32 object-cover" />}
              <div className="p-4">
                <h3 className="font-bold truncate">{p.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{p.description}</p>
                <div className="flex gap-1 mt-3">
                  <Button variant="outline" size="sm" onClick={() => openEdit(p)}><Pencil className="h-3 w-3" /></Button>
                  <Button variant="outline" size="sm" onClick={() => remove(p._id)}><Trash2 className="h-3 w-3 text-red-500" /></Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? "Edit Project" : "New Project"}>
        <form onSubmit={submit} className="space-y-4">
          <div><Label>Title</Label><Input required value={form.title} onChange={onChange("title")} /></div>
          <div><Label>Description</Label><Textarea rows={3} value={form.description} onChange={onChange("description")} /></div>
          <div><Label>Image URL</Label><Input value={form.image} onChange={onChange("image")} /></div>
          <div><Label>Technologies (comma-separated)</Label><Input value={form.techText} onChange={onChange("techText")} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Live URL</Label><Input value={form.liveUrl} onChange={onChange("liveUrl")} /></div>
            <div><Label>GitHub URL</Label><Input value={form.githubUrl} onChange={onChange("githubUrl")} /></div>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="featured" checked={!!form.featured} onChange={onChange("featured")} />
            <Label htmlFor="featured">Featured project</Label>
          </div>
          <Button type="submit" className="w-full">{editing ? "Update" : "Create"}</Button>
        </form>
      </Modal>
    </div>
  );
}