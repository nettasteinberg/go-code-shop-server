export const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:8001/api/" : "the url for when the server is in the cloud";
export const GET_OR_DELETE_OR_EDIT_PRODUCT_BY_ID = process.env.NODE_ENV === "development" ? BASE_URL + "product/" : "the url for when the server is in the cloud";

/* When building the client inside the server with 'npm run build', for some reason (bug?) NODE_ENV === 'production', so the client is unable to
fetch the products from the server because BASE_URL !== http://localhost:8001/api/. That is why I left the bellow remarks. */

// export const BASE_URL = "http://localhost:8001/api/";
// export const GET_OR_DELETE_OR_EDIT_PRODUCT_BY_ID = BASE_URL + "product/";