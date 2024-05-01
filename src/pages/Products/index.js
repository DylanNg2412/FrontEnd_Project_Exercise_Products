import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../utils/api";
import { getCategories } from "../../utils/api_categories";

import {
  Box,
  Button,
  Grid,
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
  const [category, setCategory] = useState("all"); // store the selected category by user

  const { data = [] } = useQuery({
    queryKey: ["product", category],
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

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Genre"
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

        <Grid container spacing={3}>
          {data.map((product) => (
            <Grid key={product._id} item lg={4} md={6} sm={12} xs={12}>
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
