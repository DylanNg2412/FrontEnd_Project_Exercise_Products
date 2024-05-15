import { Box, Container, TextField, Button } from "@mui/material";
import Header from "../../components/Header";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { getUserSignUp } from "../../utils/api_auth";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const getUserSignUpMutation = useMutation({
    mutationFn: getUserSignUp,
    onSuccess: (data) => {
      console.log(data);
      enqueueSnackbar("Login Successfully", { variant: "success" });
      navigate("/login");
    },
    onError: (error) => {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    },
  });

  const handleSignUp = (e) => {
    e.preventDefault();
    getUserSignUpMutation.mutate({
      name,
      email,
      password,
    });
  };

  return (
    <>
      <Header />
      <Container sx={{ marginTop: "20px", width: "25%" }}>
        <Box sx={{ marginBottom: "30px" }}>
          <TextField
            label="Name"
            type="name"
            value={name}
            required
            variant="outlined"
            color="info"
            fullWidth
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
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
        <Box sx={{ marginBottom: "30px" }}>
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            required
            variant="outlined"
            color="info"
            fullWidth
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Box>
        <Button variant="contained" fullWidth onClick={handleSignUp}>
          Sign Up
        </Button>
      </Container>
    </>
  );
}
