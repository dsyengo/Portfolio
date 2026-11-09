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
  role: "", company: "", location: "", startDate: "", endDate: "Present",
  descText: "", techText: "", order: 0,
};

export default function ExperiencesManagement() {
  const { items, loading, create, update, remove } = useCrud("/experiences");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);

  const openNew = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (it) => {
    setEditing(it);
    setForm({
      ...it,
      descText: (it.description || []).join("\n"),
      techText: (it.technologies || []).join(", "),
    });
    setOpen(true);
  };

  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      role: form.role, company: form.company, location: form.location,
      startDate: form.startDate, endDate: form.endDate,
      order: Number(form.order) || 0,
      description: form.descText.split("\n").map((s) => s.trim()).filter(Boolean),
      technologies: form.techText.split(",").map((s) => s.trim()).filter(Boolean),
    };
    if (editing) await update(editing._id, payload);
    else await create(payload);
    setOpen(false);
  };

  const onChange = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div>
      <PageHeader title="Experiences" description="Manage your work history">
        <Button onClick={openNew}><Plus className="h-4 w-4 mr-2" />New</Button>
      </PageHeader>

      {loading ? <p>Loading…</p> : (
        <div className="space-y-3">
          {items.map((it) => (
            <div key={it._id} className="p-4 rounded-xl bg-card border border-border flex justify-between">
              <div>
                <h3 className="font-bold">{it.role} · <span className="text-muted-foreground font-normal">{it.company}</span></h3>
                <p className="text-xs text-muted-foreground">{it.startDate} – {it.endDate}</p>
              </div>
              <div>
                <Button variant="ghost" size="icon" onClick={() => openEdit(it)}><Pencil className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => remove(it._id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? "Edit Experience" : "New Experience"}>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Role</Label><Input required value={form.role} onChange={onChange("role")} /></div>
            <div><Label>Company</Label><Input required value={form.company} onChange={onChange("company")} /></div>
          </div>
          <div><Label>Location</Label><Input value={form.location} onChange={onChange("location")} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Start</Label><Input required value={form.startDate} onChange={onChange("startDate")} placeholder="Jan 2023" /></div>
            <div><Label>End</Label><Input value={form.endDate} onChange={onChange("endDate")} placeholder="Present" /></div>
          </div>
          <div><Label>Description (one bullet per line)</Label><Textarea rows={4} value={form.descText} onChange={onChange("descText")} /></div>
          <div><Label>Technologies (comma-separated)</Label><Input value={form.techText} onChange={onChange("techText")} /></div>
          <Button type="submit" className="w-full">{editing ? "Update" : "Create"}</Button>
        </form>
      </Modal>
    </div>
  );
}