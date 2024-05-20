import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../../components/Header";
import {
  addCategory,
  getCategories,
  deleteCategory,
} from "../../utils/api_categories";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useSnackbar } from "notistack";

export default function CategoryPage() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser = {} } = cookies;
  const { role, token } = currentUser;

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  const addNewMutation = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      enqueueSnackbar("Category successfully added", {
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (error) => {
      alert(error.response.data.message);
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addNewMutation.mutate({
      name: name,
      token: token,
    });
  };

  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      enqueueSnackbar("Successfully deleted", {
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (error) => {
      enqueueSnackbar(error.message.data.message, {
        variant: "error",
      });
    },
  });

  const handleCategoryDelete = (_id) => {
    const confirm = window.confirm("Are you sure to delete this category?");
    if (confirm) {
      deleteCategoryMutation.mutate({
        _id: _id,
        token: token,
      });
    }
  };

  return (
    <>
      <Container>
        <Header />
        <Typography variant="h4" sx={{ fontWeight: "bold", marginTop: "20px" }}>
          Categories
        </Typography>
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <TextField
              sx={{
                width: "90%",
              }}
              placeholder="Category Name"
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              variant="contained"
              sx={{ marginLeft: "10px", height: "55px" }}
              onClick={handleFormSubmit}
            >
              Add
            </Button>
          </CardContent>
        </Card>
        <Box>
          <Card sx={{ mt: 4 }}>
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category._id}>
                      <TableCell width="70%">
                        <Typography>{category.name}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => {
                            handleCategoryDelete(category._id);
                          }}
                        >
                          DELETE
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  );
}
