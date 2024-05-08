import axios from "axios";

const url = "http://localhost:5000";

export const getOrders = async () => {
  const res = await axios.get(`${url}/orders`);
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
    }
  );
  return response.data;
};

export const deleteOrder = async (id) => {
  const response = await axios.delete(`${url}/orders/${id}`);
  return response.data;
};
