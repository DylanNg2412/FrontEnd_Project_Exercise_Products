import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

import { Typography, Button, Card, CardContent, Box } from "@mui/material";
import { deleteProduct } from "../../utils/api_products";
import { addToCart } from "../../utils/api_cart";

export default function ProductCard(props) {
  const { product } = props;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      enqueueSnackbar("Product is deleted", {
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (error) => {
      //display error message
      enqueueSnackbar(error.message.data.message, {
        variant: "error",
      });
    },
  });

  const handleProductDelete = (event) => {
    event.preventDefault();
    const confirm = window.confirm("Are you sure to delete this product?");
    if (confirm) {
      deleteProductMutation.mutate(product._id);
    }
  };

  const addToCartMutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      enqueueSnackbar("Product has been added to your cart", {
        variant: "success",
      });
    },
    onError: (error) => {
      enqueueSnackbar(error.message.data.message, {
        variant: "error",
      });
    },
  });

  const handleCartSubmit = (event) => {
    event.preventDefault();
    addToCartMutation.mutate(product);
    // console.log(product);
  };

  return (
    <Card>
      <CardContent>
        <Typography fontWeight={"bold"}>{product.name}</Typography>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px 0",
          }}
        >
          <Typography
            variant="p"
            style={{
              backgroundColor: "#EBFBEE",
              color: "#6ACF7E",
              borderRadius: "20px",
              paddingLeft: "10px",
              paddingRight: "10px",
            }}
          >
            $ {product.price}
          </Typography>
          <Typography
            variant="p"
            style={{
              backgroundColor: "#FFF4E6",
              color: "#FD882B",
              borderRadius: "20px",
              paddingLeft: "10px",
              paddingRight: "10px",
            }}
          >
            {product.category}
          </Typography>
        </Box>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleCartSubmit}
        >
          Add To Cart
        </Button>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px 0",
          }}
        >
          <Button
            variant="contained"
            style={{ borderRadius: "17px" }}
            color="primary"
            onClick={() => {
              navigate("/products/" + product._id);
            }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            style={{ borderRadius: "17px" }}
            color="error"
            onClick={handleProductDelete}
          >
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
