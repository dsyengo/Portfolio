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
  title: "", excerpt: "", content: "", featuredImage: "", category: "",
  tagsText: "", readTime: "5 min read", featured: false, published: true,
};

export default function BlogManagement() {
  const { items, loading, create, update, remove } = useCrud("/blog");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);

  const openNew = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (it) => {
    setEditing(it);
    setForm({ ...it, tagsText: (it.tags || []).join(", ") });
    setOpen(true);
  };

  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      title: form.title, excerpt: form.excerpt, content: form.content,
      featuredImage: form.featuredImage, category: form.category,
      readTime: form.readTime, featured: !!form.featured, published: !!form.published,
      tags: form.tagsText.split(",").map((s) => s.trim()).filter(Boolean),
    };
    if (editing) await update(editing._id, payload);
    else await create(payload);
    setOpen(false);
  };

  const onChange = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  return (
    <div>
      <PageHeader title="Blog" description="Write and manage your posts">
        <Button onClick={openNew}><Plus className="h-4 w-4 mr-2" />New Post</Button>
      </PageHeader>

      {loading ? <p>Loading…</p> : (
        <div className="space-y-3">
          {items.map((p) => (
            <div key={p._id} className="p-4 rounded-xl bg-card border border-border flex justify-between">
              <div className="min-w-0">
                <h3 className="font-bold truncate">{p.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {p.category} · {p.date} · {p.published ? "Published" : "Draft"}
                </p>
              </div>
              <div className="shrink-0">
                <Button variant="ghost" size="icon" onClick={() => openEdit(p)}><Pencil className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => remove(p._id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? "Edit Post" : "New Post"}>
        <form onSubmit={submit} className="space-y-4">
          <div><Label>Title</Label><Input required value={form.title} onChange={onChange("title")} /></div>
          <div><Label>Excerpt</Label><Textarea rows={2} value={form.excerpt} onChange={onChange("excerpt")} /></div>
          <div><Label>Content (markdown)</Label><Textarea rows={8} value={form.content} onChange={onChange("content")} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Category</Label><Input value={form.category} onChange={onChange("category")} /></div>
            <div><Label>Read time</Label><Input value={form.readTime} onChange={onChange("readTime")} /></div>
          </div>
          <div><Label>Tags (comma-separated)</Label><Input value={form.tagsText} onChange={onChange("tagsText")} /></div>
          <div><Label>Featured image URL</Label><Input value={form.featuredImage} onChange={onChange("featuredImage")} /></div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2"><input type="checkbox" checked={!!form.featured} onChange={onChange("featured")} />Featured</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={!!form.published} onChange={onChange("published")} />Published</label>
          </div>
          <Button type="submit" className="w-full">{editing ? "Update" : "Create"}</Button>
        </form>
      </Modal>
    </div>
  );
}