import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import Header from "../../components/Header";
import {
  Typography,
  Button,
  Grid,
  Container,
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import { addProduct } from "../../utils/api_products";
import { useCookies } from "react-cookie";

export default function ProductsAddNew() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser = {} } = cookies;
  const { token } = currentUser;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  // setup mutation for add new product
  const addNewMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      // if API called successful, do what ?
      navigate("/");
    },
    onError: (error) => {
      // if API is called but error, do what ?
      alert(error.response.data.message);
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // to trigger the mutation to call the API
    addNewMutation.mutate({
      name: name,
      description: description,
      price: price,
      category: category,
      token: token,
    });
  };

  return (
    <Container>
      <Header />
      <Card>
        <CardContent>
          <Typography
            variant="h4"
            sx={{
              margin: "20px 0",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Add New Product
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Price"
                variant="outlined"
                fullWidth
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Category"
                variant="outlined"
                fullWidth
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" fullWidth onClick={handleFormSubmit}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
