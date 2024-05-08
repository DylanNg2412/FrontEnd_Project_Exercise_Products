import * as React from "react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Typography,
  Button,
  Container,
  Box,
  Grid,
  TextField,
} from "@mui/material";

import { getCart } from "../../utils/api_cart";
import Header from "../../components/Header";
import { useSnackbar } from "notistack";
import { addNewOrder } from "../../utils/api_orders";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { data: cart = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const addNewOrderMutation = useMutation({
    mutationFn: addNewOrder,
    onSuccess: () => {
      // redirect to payment gateway //!( not yet )
      // for now is temporary redirect
      navigate("/orders");
    },
    onError: (error) => {
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
    },
  });

  const calculateTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total = total + item.quantity * item.price;
    });
    return total;
  };

  // handle checking for " pay now" //
  const handleCheckout = () => {
    // when user click the "Pay Button", check if they have filled up the required field and also if cart is not empty
    if (!name === "" || email === "") {
      enqueueSnackbar("Please fill up all the fields", {
        variant: "error",
      });
    } else if (!(cart && cart.length > 0)) {
      enqueueSnackbar("Your cart is empty", {
        variant: "error",
      });
    } else {
      // else the checkout process
      addNewOrderMutation.mutate({
        customerName: name,
        customerEmail: email,
        products: cart,
        totalPrice: calculateTotal(),
      });
    }
  };

  return (
    <>
      <Container maxWidth="lg">
        <Header />
        <Grid
          container
          spacing={2}
          sx={{
            marginTop: "50px",
            flexDirection: {
              xs: "column-reverse",
              sm: "column-reverse",
              md: "row",
            },
          }}
        >
          <Grid xs={12} md={7}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "30px",
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Contact Information
              </Typography>
            </Box>
            <div>
              <Typography>Name*</Typography>
              <TextField
                required
                variant="outlined"
                color="info"
                fullWidth
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div>
              <Typography>Email*</Typography>
              <TextField
                required
                variant="outlined"
                color="info"
                fullWidth
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <Grid
              sx={{
                marginTop: "20px",
              }}
            >
              <Button
                variant="contained"
                fullWidth
                style={{ marginTop: "20px" }}
                onClick={handleCheckout}
              >
                Pay ${calculateTotal()}now
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} md={5}>
            <Typography variant="h6">Your order summary</Typography>
            {/* .map here */}
            {cart.map((item) => (
              <div
                key={item._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                <Typography variant="body1">{item.name}</Typography>
                <Typography variant="body1">
                  ${(item.price * item.quantity).toFixed(2)}
                </Typography>
              </div>
            ))}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "30px",
              }}
            >
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6">${calculateTotal()}</Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
