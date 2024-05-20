import axios from "axios";

const API_URL = "http://localhost:5000";

export const getCategories = async () => {
  try {
    const response = await axios.get(API_URL + "/categories");
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const addCategory = async (data) => {
  const response = await axios.post(
    `${API_URL}/categories`, // url of the POST API
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

export const deleteCategory = async (data) => {
  const response = await axios.delete(`${API_URL}/categories/${data._id}`, {
    headers: {
      Authorization: "Bearer " + data.token,
    },
  });
  return response.data;
};
