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

const COLLECTION = "doctors";

export function useDoctors() {
  const [doctors, setDoctors]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  const fetchDoctors = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const q    = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setDoctors(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchDoctors(); }, [fetchDoctors]);

  const addDoctor = async (data) => {
    await addDoc(collection(db, COLLECTION), {
      ...data,
      availableDays:    Array.isArray(data.availableDays)
        ? data.availableDays
        : data.availableDays.split(",").map((s) => s.trim()).filter(Boolean),
      specializations:  Array.isArray(data.specializations)
        ? data.specializations
        : data.specializations.split(",").map((s) => s.trim()).filter(Boolean),
      bmiCategories:    Array.isArray(data.bmiCategories)
        ? data.bmiCategories
        : data.bmiCategories.split(",").map((s) => s.trim()).filter(Boolean),
      fee:       Number(data.fee),
      rating:    Number(data.rating),
      totalReviews: Number(data.totalReviews),
      status:    "approved",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    await fetchDoctors();
  };

  const updateDoctor = async (id, data) => {
    await updateDoc(doc(db, COLLECTION, id), {
      ...data,
      availableDays:   Array.isArray(data.availableDays)
        ? data.availableDays
        : data.availableDays.split(",").map((s) => s.trim()).filter(Boolean),
      specializations: Array.isArray(data.specializations)
        ? data.specializations
        : data.specializations.split(",").map((s) => s.trim()).filter(Boolean),
      bmiCategories:   Array.isArray(data.bmiCategories)
        ? data.bmiCategories
        : data.bmiCategories.split(",").map((s) => s.trim()).filter(Boolean),
      fee:       Number(data.fee),
      rating:    Number(data.rating),
      totalReviews: Number(data.totalReviews),
      updatedAt: serverTimestamp(),
    });
    await fetchDoctors();
  };

  const deleteDoctor = async (id) => {
    await deleteDoc(doc(db, COLLECTION, id));
    setDoctors((prev) => prev.filter((d) => d.id !== id));
  };

  return { doctors, loading, error, fetchDoctors, addDoctor, updateDoctor, deleteDoctor };
}