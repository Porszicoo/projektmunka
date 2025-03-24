import axios from "axios";

export const getProducts = async (
  field,
  size,
  brand,
  color,
  searchTerm, // Keresőmező
  minPrice,   // Minimum ár
  maxPrice,   // Maximum ár
  limit = 20, // Alapértelmezett limit
  offset = 20  // Alapértelmezett offset (kezdőpont)
) => {
  const params = new URLSearchParams();

  // Szűrési paraméterek hozzáadása
  if (field) params.append("field", field);
  if (size) params.append("size", size);
  if (brand) params.append("brand", brand);
  if (color) params.append("color", color);
  if (searchTerm) params.append("searchTerm", searchTerm);
  if (minPrice !== undefined) params.append("minPrice", minPrice);
  if (maxPrice !== undefined) params.append("maxPrice", maxPrice);

  // Lapozás paraméterek hozzáadása
  params.append("limit", limit.toString());
  params.append("offset", offset.toString());

  try {
    const response = await axios.get(`http://localhost:8080/termekek?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error("Hiba történt a termékek lekérése közben:", error);
    throw error;
  }
};
