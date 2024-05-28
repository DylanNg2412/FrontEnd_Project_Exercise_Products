import axios from "axios";

import { url } from "./data";

export const getCategories = async () => {
  try {
    const response = await axios.get(url + "/categories");
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const addCategory = async (data) => {
  const response = await axios.post(
    `${url}/categories`, // url of the POST API
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

export const updateCategory = async (data) => {
  const response = await axios.put(
    `${url}/categories/${data._id}`,
    JSON.stringify(data),
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      },
    }
  );
  return response.data;
};

export const deleteCategory = async (data) => {
  const response = await axios.delete(`${url}/categories/${data._id}`, {
    headers: {
      Authorization: "Bearer " + data.token,
    },
  });
  return response.data;
};
