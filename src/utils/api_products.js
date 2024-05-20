import axios from "axios";

const url = "http://localhost:5000";

export const getProducts = async (category, page, perPage) => {
  let params = {
    perPage: perPage,
    page: page,
  };
  if (category !== "all") {
    params.category = category;
  }
  const query = new URLSearchParams(params);
  const res = await axios.get(`${url}/products?${query.toString()}`);
  return res.data;
};

export const getProduct = async (id) => {
  // to receive product from the API /products/:id
  const res = await axios.get(`${url}/products/${id}`);
  return res.data;
};

export const addProduct = async (data) => {
  const response = await axios.post(
    `${url}/products`, // url of the POST API
    JSON.stringify(data), // data you want to pass through the API in JSON format
    {
      headers: {
        "Content-Type": "application/json", // telling the API you are sending JSON data
        Authorization: "Bearer " + data.token, // include token in the API
      },
    }
  );
  return response.data;
};

export const updateProduct = async (data) => {
  const response = await axios.put(
    `${url}/products/${data.id}`,
    JSON.stringify(data),
    {
      headers: {
        "Content-Type": "application/json", // do this if have data
        Authorization: "Bearer " + data.token,
      },
    }
  );
  return response.data;
};

export const deleteProduct = async (data) => {
  const response = await axios.delete(`${url}/products/${data._id}`, {
    headers: {
      Authorization: "Bearer " + data.token,
    },
  });
  return response.data;
};
