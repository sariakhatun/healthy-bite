// localStorage key per user: "hb_favorites_{userEmail}"
// Each favorite: full food object from foods.json

const getKey = (email) => `hb_favorites_${email}`;

export const getFavorites = (email) => {
  if (!email) return [];
  try {
    return JSON.parse(localStorage.getItem(getKey(email))) || [];
  } catch {
    return [];
  }
};

export const addFavorite = (email, food) => {
  if (!email) return [];
  const existing = getFavorites(email);
  // avoid duplicate
  if (existing.find((f) => f.id === food.id)) return existing;
  const updated = [...existing, { ...food, savedAt: new Date().toISOString() }];
  localStorage.setItem(getKey(email), JSON.stringify(updated));
  return updated;
};

export const removeFavorite = (email, foodId) => {
  if (!email) return [];
  const updated = getFavorites(email).filter((f) => f.id !== foodId);
  localStorage.setItem(getKey(email), JSON.stringify(updated));
  return updated;
};

export const isFavorite = (email, foodId) =>
  getFavorites(email).some((f) => f.id === foodId);

export const toggleFavorite = (email, food) => {
  if (isFavorite(email, food.id)) {
    return { updated: removeFavorite(email, food.id), added: false };
  } else {
    return { updated: addFavorite(email, food), added: true };
  }
};
