import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import api from "../lib/api";

export function useCrud(endpoint) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get(endpoint);
      setItems(Array.isArray(data) ? data : [data]);
    } catch (e) {
      setError(e.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    reload();
  }, [reload]);

  const create = async (payload) => {
    const { data } = await api.post(endpoint, payload);
    setItems((prev) => [...prev, data]);
    toast.success("Created");
    return data;
  };

  const update = async (id, payload) => {
    const { data } = await api.put(`${endpoint}/${id}`, payload);
    setItems((prev) => prev.map((it) => (it._id === id ? data : it)));
    toast.success("Updated");
    return data;
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    await api.delete(`${endpoint}/${id}`);
    setItems((prev) => prev.filter((it) => it._id !== id));
    toast.success("Deleted");
  };

  return { items, loading, error, reload, create, update, remove };
}