import { Typography, Divider, Box, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Header() {
  const [cookies, setCookies, removeCookies] = useCookies(["currentUser"]);
  const { currentUser = {} } = cookies;
  const { role } = currentUser;
  const navigate = useNavigate();
  const location = useLocation();

  let headerText = "Welcome to my store";

  if (location.pathname === "/cart") {
    headerText = "Cart";
  } else if (location.pathname === "/checkout") {
    headerText = "Checkout";
  } else if (location.pathname === "/orders") {
    headerText = "My Orders";
  } else if (location.pathname === "/login") {
    headerText = "Login";
  } else if (location.pathname === "/signup") {
    headerText = "Create A New Account";
  }

  const handleLogout = () => {
    // remove the current user cookies
    removeCookies("currentUser");
    // redirect back to home page
    navigate("/login");
  };

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
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Button
            sx={{
              color: location.pathname === "/" ? "white" : "inherit",
              backgroundColor:
                location.pathname === "/" ? "#238be6" : "inherit",
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
              color: location.pathname === "/orders" ? "white" : "inherit",
              backgroundColor:
                location.pathname === "/orders" ? "#238be6" : "inherit",
            }}
            onClick={() => {
              navigate("/orders");
            }}
          >
            My Orders
          </Button>
          {role && role === "admin" ? (
            <Button
              sx={{
                color:
                  location.pathname === "/categories" ? "white" : "inherit",
                backgroundColor:
                  location.pathname === "/categories" ? "#238be6" : "inherit",
              }}
              onClick={() => {
                navigate("/categories");
              }}
            >
              Categories
            </Button>
          ) : null}
        </Box>
        {currentUser && currentUser.role ? (
          <Box sx={{ display: " flex", alignItems: "center", gap: "10px" }}>
            <span>Current User: {currentUser.name}</span>
            <Button
              sx={{
                textTransform: "capitalize",
                backgroundColor: "#238be6",
                color: "white",
              }}
              onClick={handleLogout}
            >
              Log out
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: "flex" }}>
            <Button
              sx={{
                color: location.pathname === "/login" ? "white" : "inherit",
                backgroundColor:
                  location.pathname === "/login" ? "#238be6" : "inherit",
              }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
            <Button
              sx={{
                color: location.pathname === "/signup" ? "white" : "inherit",
                backgroundColor:
                  location.pathname === "/signup" ? "#238be6" : "inherit",
              }}
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign Up
            </Button>
          </Box>
        )}
      </Box>

      <Divider />
    </>
  );
}
