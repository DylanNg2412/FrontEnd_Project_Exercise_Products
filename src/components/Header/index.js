import { Typography, Divider, Box, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  let headerText = "Welcome to my store";

  if (location.pathname === "/cart") {
    headerText = "Cart";
  } else if (location.pathname === "/checkout") {
    headerText = "Checkout";
  } else if (location.pathname === "/order") {
    headerText = "My Orders";
  }

  return (
    <>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h3"
          style={{ fontWeight: "bold", margin: "13px 0" }}
        >
          {headerText}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <Button
          sx={{
            color: location.pathname === "/" ? "white" : "inherit",
            backgroundColor: location.pathname === "/" ? "#238be6" : "inherit",
          }}
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </Button>
        <Button
          style={{
            color: location.pathname === "/cart" ? "white" : "inherit",
            backgroundColor:
              location.pathname === "/cart" ? "#238be6" : "inherit",
          }}
          onClick={() => {
            navigate("/cart");
          }}
        >
          Cart
        </Button>
        <Button
          sx={{
            color: location.pathname === "/order" ? "white" : "inherit",
            backgroundColor:
              location.pathname === "/order" ? "#238be6" : "inherit",
          }}
          onClick={() => {
            navigate("/order");
          }}
        >
          My Orders
        </Button>
      </Box>

      <Divider />
    </>
  );
}
