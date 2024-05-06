import { Typography, Divider, Box, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  let headerText = "";

  if (location.pathname === "/") {
    headerText = "Welcome to my store";
  } else if (location.pathname === "/cart") {
    headerText = "Cart";
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
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
      </div>

      <Divider />
    </>
  );
}
