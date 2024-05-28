import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "../../components/Header";
import {
  Box,
  Button,
  Grid,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Container,
} from "@mui/material";
import ProductCard from "../../components/ProductCard";
import { getProducts } from "../../utils/api_products";
import { getCategories } from "../../utils/api_categories";

export default function Products() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("all"); // store the selected category by user
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(6);

  // load the categories
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  // load the products
  const { data: products = [] } = useQuery({
    queryKey: ["products", category, page, perPage],
    queryFn: () => getProducts(category, page, perPage), // pass in the category to filter out the product
  });

  return (
    <>
      <Container>
        <Header />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "10px",
          }}
        >
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            Products
          </Typography>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              navigate("/add");
            }}
          >
            Add New
          </Button>
        </Box>

        <FormControl
          sx={{
            marginTop: "10px",
            width: "200px",
            marginLeft: "10px",
            marginBottom: "20px",
          }}
        >
          <InputLabel id="product-select-label">Category</InputLabel>
          <Select
            labelId="product-select-label"
            id="product-select"
            label="Product"
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
              setPage(1);
            }}
          >
            <MenuItem value="all">All</MenuItem>
            {categories.map((category) => {
              return (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <Grid item container spacing={3}>
          {products
            ? products.map((product) => (
                <Grid key={product._id} item lg={4} md={6} xs={12}>
                  <ProductCard product={product} />
                </Grid>
              ))
            : null}
          {products && products.length === 0 ? (
            <Grid item xs={12}>
              <Typography align="center" sx={{ padding: "10px 0" }}>
                No items found.
              </Typography>
            </Grid>
          ) : null}
        </Grid>
      </Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          marginTop: "10px",
          padding: "20px 0",
        }}
      >
        <Button
          disabled={page === 1 ? true : false}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </Button>
        <span>Page: {page}</span>
        <Button
          disabled={products.length === 0 ? true : false}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </Box>
    </>
  );
}
