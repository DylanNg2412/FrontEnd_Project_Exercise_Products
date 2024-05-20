import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { CookiesProvider } from "react-cookie";

import Products from "./pages/Products";
import ProductsAddNew from "./pages/ProductsAddNew";
import ProductsEdit from "./pages/ProductsEdit";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Order";
import PaymentVerify from "./pages/PaymentVerify";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import CategoryPage from "./pages/CategoryPage";

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <CookiesProvider defaultSetOptions={{ path: "/" }}>
          <SnackbarProvider
            maxSnack={10}
            autoHideDuration={2000}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Products />} />
                <Route path="/add" element={<ProductsAddNew />} />
                <Route path="/products/:id" element={<ProductsEdit />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/categories" element={<CategoryPage />} />
                <Route path="/verify-payment" element={<PaymentVerify />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
              </Routes>
            </BrowserRouter>
          </SnackbarProvider>
        </CookiesProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
