import axios from "axios";

const url = "http://localhost:5000";

export const getOrders = async (token) => {
  const res = await axios.get(`${url}/orders`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return res.data;
};

export const addNewOrder = async (data) => {
  const response = await axios.post(`${url}/orders`, JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// update status only //!( pending should be default and can be deleted, failed. paid & complete will not show delete button )
export const updateOrder = async (data) => {
  const response = await axios.put(
    `${url}/orders/${data._id}`,
    JSON.stringify(data),
    {
      headers: { "Content-Type": "application/json" },
      Authorization: "Bearer " + data.token,
    }
  );
  return response.data;
};

export const deleteOrder = async (data) => {
  const response = await axios.delete(`${url}/orders/${data._id}`, {
    headers: {
      Authorization: "Bearer " + data.token,
    },
  });
  return response.data;
};
