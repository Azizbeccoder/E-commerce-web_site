import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

// credentials: "include" is required once the frontend and backend are on
// different domains (Vercel vs Render) — otherwise the browser won't attach
// the jwt auth cookie to cross-origin requests and every protected call 401s.
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "Order", "User", "Category"],
  endpoints: () => ({}),
});
