import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategories, getProducts } from "../../utils/api";

import { Button, Grid } from "@mui/material";
import {
  Box,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Card,
  CardContent,
  Container,
} from "@mui/material";

export default function Products() {
  const { category, setCategory } = useState("all");
  const { data = [] } = useQuery({
    queryKey: ["products", category],
    queryFn: () => getProducts(category),
  });
  console.log(data);
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });
  return (
    <>
      <Container>
        <Box style={{ display: "flex", justifyContent: "center" }}>
          <Typography
            variant="h3"
            style={{ fontWeight: "bold", margin: "13px 0" }}
          >
            Welcome to My Store
          </Typography>
        </Box>
        <hr />
        <Box style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            Products
          </Typography>
          <Button variant="contained" color="success">
            Add New
          </Button>
        </Box>
        <FormControl sx={{ m: 1, minWidth: 156 }}>
          <InputLabel id="demo-simple-select-label">All Categories</InputLabel>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="All Categories"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <MenuItem value={"all"}>All Categories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Grid container spacing={3}>
          {data.map((product) => (
            <Grid item xs={4}>
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
                      {product.price}
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
                  <Button fullWidth variant="contained" color="primary">
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
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      style={{ borderRadius: "17px" }}
                      color="error"
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
