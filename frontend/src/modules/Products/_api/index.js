import axios from "axios";

export const getProducts = async (
  search,
  searchField,
  pageSize,
  pageNumber
) => {
  return axios.get(
    `http://localhost:8080/termekek?${pageNumber && pageSize ? `&page=${pageNumber}&pageSize=${pageSize}` : ""}${search && searchField ? `&search=${search}&field=${searchField}` : ""}`
  );
};
