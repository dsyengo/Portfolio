import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useCrud } from "../../hooks/useCrud";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Modal from "./Modal";
import PageHeader from "./PageHeader";

const empty = { category: "", icon: "Code", color: "from-blue-500 to-cyan-500", itemsText: "", order: 0 };

export default function SkillsManagement() {
  const { items, loading, create, update, remove } = useCrud("/skills");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);

  const openNew = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (it) => {
    setEditing(it);
    setForm({ ...it, itemsText: (it.items || []).join(", ") });
    setOpen(true);
  };

  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      category: form.category,
      icon: form.icon,
      color: form.color,
      order: Number(form.order) || 0,
      items: form.itemsText.split(",").map((s) => s.trim()).filter(Boolean),
    };
    if (editing) await update(editing._id, payload);
    else await create(payload);
    setOpen(false);
  };

  const onChange = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div>
      <PageHeader title="Skills" description="Manage skill categories">
        <Button onClick={openNew}><Plus className="h-4 w-4 mr-2" />New</Button>
      </PageHeader>

      {loading ? <p>Loading…</p> : (
        <div className="grid md:grid-cols-2 gap-4">
          {items.map((it) => (
            <div key={it._id} className="p-4 rounded-xl bg-card border border-border">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">{it.category}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{it.items?.join(" · ")}</p>
                </div>
                <div>
                  <Button variant="ghost" size="icon" onClick={() => openEdit(it)}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => remove(it._id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? "Edit Skill Group" : "New Skill Group"}>
        <form onSubmit={submit} className="space-y-4">
          <div><Label>Category</Label><Input required value={form.category} onChange={onChange("category")} /></div>
          <div><Label>Skills (comma-separated)</Label><Input value={form.itemsText} onChange={onChange("itemsText")} placeholder="Node.js, Express, MongoDB" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Icon (lucide)</Label><Input value={form.icon} onChange={onChange("icon")} /></div>
            <div><Label>Order</Label><Input type="number" value={form.order} onChange={onChange("order")} /></div>
          </div>
          <div><Label>Color gradient</Label><Input value={form.color} onChange={onChange("color")} /></div>
          <Button type="submit" className="w-full">{editing ? "Update" : "Create"}</Button>
        </form>
      </Modal>
    </div>
  );
}