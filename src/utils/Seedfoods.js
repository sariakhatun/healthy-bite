/**
 * ONE-TIME SEED SCRIPT
 * Run this once to migrate foods.json → Firestore
 *
 * Usage:
 *   1. Import and call seedFoods() from any component temporarily
 *   2. Or create a button in admin: <button onClick={seedFoods}>Seed Foods</button>
 *   3. After seeding, remove the call — no need to run again
 */

import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import foodsData from "../data/foods.json";

export async function seedFoods() {
  try {
    // Check if already seeded
    const existing = await getDocs(collection(db, "foods"));
    if (!existing.empty) {
      console.log("Foods already seeded:", existing.size, "documents");
      return { success: false, message: "Already seeded" };
    }

    let count = 0;

    // Flatten: each individual meal item becomes one Firestore document
    for (const categoryData of foodsData) {
      const { category, bmiRange, meals } = categoryData;

      for (const [mealType, items] of Object.entries(meals)) {
        for (const food of items) {
          await addDoc(collection(db, "foods"), {
            // BMI category info
            category,
            bmiRange,
            mealType, // breakfast | lunch | dinner | snacks

            // Food details
            name:        food.name,
            image:       food.image,
            calories:    food.calories,
            protein:     food.protein,
            carbs:       food.carbs,
            fat:         food.fat,
            ingredients: food.ingredients,
            benefit:     food.benefit,
            prepTime:    food.prepTime,

            // Meta
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
          count++;
        }
      }
    }

    console.log(` Seeded ${count} food items to Firestore`);
    return { success: true, count };
  } catch (error) {
    console.error("Seed error:", error);
    return { success: false, error: error.message };
  }
}