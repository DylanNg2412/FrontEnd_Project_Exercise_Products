import * as React from "react";
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
} from "@mui/material";
import { getCart, removeItemFromCart } from "../../utils/api_cart";
import Header from "../../components/Header";
import { useSnackbar } from "notistack";

export default function Carts() {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const { data: cart = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });

  const deleteCartMutation = useMutation({
    mutationFn: removeItemFromCart,
    onSuccess: () => {
      enqueueSnackbar("Cart is deleted", {
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
    onError: (error) => {
      //display error message
      enqueueSnackbar(error.message.data.message, {
        variant: "error",
      });
    },
  });

  const handleCartDelete = (id) => {
    const confirm = window.confirm("Are you sure to delete this product?");
    if (confirm) {
      deleteCartMutation.mutate(id);
    }
  };

  return (
    <>
      <Container>
        <Header />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>Product</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Price</TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="center">
                  Quantity
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right">
                  Total
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {cart.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell align="center">{row.quantity}</TableCell>
                  <TableCell align="right">
                    $ {row.quantity * row.price}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        console.log(row._id);
                        handleCartDelete(row._id);
                      }}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} />
                <TableCell align="right">
                  <Typography variant="body1" fontWeight="bold">
                    $
                    {cart.reduce(
                      (total, row) => total + row.price * row.quantity,
                      0
                    )}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            paddingTop: "50px",
          }}
        >
          <Button variant="contained">Checkout</Button>
        </div>
      </Container>
    </>
  );
}
