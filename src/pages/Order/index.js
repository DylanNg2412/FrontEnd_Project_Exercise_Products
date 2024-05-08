import * as React from "react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Box,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";

import Header from "../../components/Header";
import { useSnackbar } from "notistack";
import { deleteOrder, getOrders, updateOrder } from "../../utils/api_orders";
import { useNavigate } from "react-router-dom";

export default function Order() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const { data: orders = [] } = useQuery({
    queryKey: ["order"],
    queryFn: () => getOrders(),
  });
  console.log(orders);
  const deleteOrderMutation = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      enqueueSnackbar("Order is deleted", {
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["order"],
      });
    },
    onError: (error) => {
      enqueueSnackbar(error.message.data.message, {
        variant: "error",
      });
    },
  });

  const handleOrderDelete = (id) => {
    const confirm = window.confirm("Are you sure to delete this order?");
    if (confirm) {
      deleteOrderMutation.mutate(id);
    }
  };

  const updateOrderMutation = useMutation({
    mutationFn: updateOrder,
    onSuccess: () => {
      enqueueSnackbar("Order is updated", {
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["order"],
      });
    },
    onError: (error) => {
      enqueueSnackbar(error.message.data.message, {
        variant: "error",
      });
    },
  });

  const handleUpdateOrder = (order, status) => {
    updateOrderMutation.mutate({
      ...order,
      status: status,
    });
  };

  return (
    <>
      <Container maxWidth="lg">
        <Header />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Customer</TableCell>
                <TableCell align="left">Products</TableCell>
                <TableCell align="left">Total Amount</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Payment Date</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  key={order._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Typography>{order.customerName}</Typography>
                    <Typography>{order.customerEmail}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    {order.products.map((product) => (
                      <Typography>{product.name}</Typography>
                    ))}
                  </TableCell>
                  <TableCell align="left">{order.totalPrice}</TableCell>
                  <TableCell align="left">
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={order.status}
                      onChange={(event) => {
                        handleUpdateOrder(order, event.target.value);
                      }}
                    >
                      <MenuItem value={"pending"}>pending</MenuItem>
                      <MenuItem value={"failed"}>failed</MenuItem>
                      <MenuItem value={"paid"}>paid</MenuItem>
                      <MenuItem value={"completed"}>completed</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell align="left">{order.paid_at}</TableCell>
                  <TableCell align="left">
                    {order.status === "failed" ||
                    order.status === "paid" ||
                    order.status === "completed" ? (
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                          handleOrderDelete(order._id);
                        }}
                        disabled
                      >
                        Delete
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                          handleOrderDelete(order._id);
                        }}
                      >
                        Delete
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
