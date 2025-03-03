import axios from "axios";

export const getProducts = async (
  field,
  size,
  brand,
  color,
  pageSize,
  pageNumber
) => {
  const params = new URLSearchParams();

  // Kiválasztott mező és értékek
  if (field) params.append("field", field);
  if (size) params.append("size", size);
  if (brand) params.append("brand", brand);
  if (color) params.append("color", color);
  if (pageSize) params.append("pageSize", pageSize);
  if (pageNumber) params.append("page", pageNumber);

  try {
    const response = await axios.get(`http://localhost:8080/termekek?${params.toString()}`);
    return response.data; // Visszaadja a választ
  } catch (error) {
    console.error("Hiba történt a termékek lekérése közben:", error);
    throw error; // Hibát dob, hogy a hívó tudja kezelni
  }
};