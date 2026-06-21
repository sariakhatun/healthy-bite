/**
 * ONE-TIME SEED SCRIPT
 * Run this once to migrate doctors.json → Firestore
 *
 * Usage:
 *   1. Add a button in AdminDashboard temporarily:
 *      <button onClick={seedDoctors}>Seed Doctors</button>
 *   2. Click once — check console for success
 *   3. Remove the button after seeding
 */

import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import doctorsData from "../data/doctors.json";

export async function seedDoctors() {
  try {
    // Check if already seeded
    const existing = await getDocs(collection(db, "doctors"));
    if (!existing.empty) {
      console.log("Doctors already seeded:", existing.size, "documents");
      return { success: false, message: "Already seeded" };
    }

    let count = 0;
    for (const doctor of doctorsData) {
      await addDoc(collection(db, "doctors"), {
        ...doctor,
        status:    "approved", // existing doctors are already approved
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      count++;
    }

    console.log(` Seeded ${count} doctors to Firestore`);
    return { success: true, count };
  } catch (error) {
    console.error("Seed error:", error);
    return { success: false, error: error.message };
  }
}