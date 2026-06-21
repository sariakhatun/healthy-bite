import { useState, useEffect, useCallback } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase.config";

const COLLECTION = "foods";

export function useFoods() {
  const [foods, setFoods]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  // ── Fetch all foods ─────────────────────────────────────────────
  const fetchFoods = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const q    = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setFoods(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchFoods(); }, [fetchFoods]);

  // ── Add food ────────────────────────────────────────────────────
  const addFood = async (foodData) => {
    const docRef = await addDoc(collection(db, COLLECTION), {
      ...foodData,
      ingredients: typeof foodData.ingredients === "string"
        ? foodData.ingredients.split(",").map((s) => s.trim()).filter(Boolean)
        : foodData.ingredients,
      calories: Number(foodData.calories),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    await fetchFoods();
    return docRef.id;
  };

  // ── Update food ─────────────────────────────────────────────────
  const updateFood = async (id, foodData) => {
    await updateDoc(doc(db, COLLECTION, id), {
      ...foodData,
      ingredients: typeof foodData.ingredients === "string"
        ? foodData.ingredients.split(",").map((s) => s.trim()).filter(Boolean)
        : foodData.ingredients,
      calories: Number(foodData.calories),
      updatedAt: serverTimestamp(),
    });
    await fetchFoods();
  };

  // ── Delete food ─────────────────────────────────────────────────
  const deleteFood = async (id) => {
    await deleteDoc(doc(db, COLLECTION, id));
    setFoods((prev) => prev.filter((f) => f.id !== id));
  };

  return { foods, loading, error, fetchFoods, addFood, updateFood, deleteFood };
}