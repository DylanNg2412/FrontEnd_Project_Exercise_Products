import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

import { Box, Container, TextField, Button } from "@mui/material";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

import { getUserLogin } from "../../utils/api_auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const getUserLoginMutation = useMutation({
    mutationFn: getUserLogin,
    onSuccess: (data) => {
      console.log(data);
      enqueueSnackbar("Login Successfully", { variant: "success" });
      navigate("/");
    },
    onError: (error) => {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    alert("hi");
    getUserLoginMutation.mutate({
      email,
      password,
    });
  };
  return (
    <>
      <Header />
      <Container sx={{ marginTop: "20px", width: "30%" }}>
        <Box sx={{ marginBottom: "30px" }}>
          <TextField
            label="Email"
            type="email"
            value={email}
            required
            variant="outlined"
            color="info"
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box sx={{ marginBottom: "30px" }}>
          <TextField
            label="Password"
            type="password"
            value={password}
            required
            variant="outlined"
            color="info"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          onClick={handleLogin}
        >
          Login
        </Button>
      </Container>
    </>
  );
}
