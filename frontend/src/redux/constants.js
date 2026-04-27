// In dev this stays "" so Vite's proxy (vite.config.js) forwards /api calls
// to localhost:5000. In production, set VITE_API_URL in Vercel's project
// settings to the deployed Render backend URL, e.g. https://your-api.onrender.com
export const BASE_URL = import.meta.env.VITE_API_URL || "";
export const USERS_URL = "/api/users";
export const CATEGORY_URL = "/api/category";
export const PRODUCT_URL = "/api/products";
export const UPLOAD_URL = "/api/upload";
export const ORDERS_URL = "/api/orders";
export const PAYPAL_URL = "/api/config/paypal";
