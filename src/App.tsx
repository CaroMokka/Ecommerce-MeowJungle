import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useState } from "react";
import ScrollToTop from "./components/common/scrollToTop/ScrollToTop";
import ErrorBoundary from "./components/ui/ErrorBoundary/ErrorBoundary";
import { CartProvider } from "./context/cart/cartContext";
import { CheckoutProvider } from "./context/checkout/checkoutContext";
import Home from "./store/blocks/home/Home";
import Products from "./store/blocks/plp/ProductsList";
import ProductPage from "./pages/ProductPage"
import Cart from "./checkout/Cart";
import CheckoutLayout from "./checkout/checkoutLayout/CheckoutLayout";
import About from "./pages/About-us";

function App() {
  const [errorBoundaryKey, setErrorBoundaryKey] = useState(0);

  return (
    
      <CartProvider>
        <BrowserRouter>
        <ScrollToTop />
        <ErrorBoundary
          key={errorBoundaryKey}
          onReset={() => setErrorBoundaryKey((key) => key + 1)}
        >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/about" element={<About/>} />
          <Route
            path="/shipping"
            element={<Navigate to="/checkout/profile" replace />}
          />
          <Route
            path="/cart"
            element={
              <CheckoutProvider>
                <Cart />
              </CheckoutProvider>
            }
          />
          <Route
            path="/checkout/profile"
            element={
              <CheckoutProvider>
                <CheckoutLayout />
              </CheckoutProvider>
            }
          />
          <Route
            path="/checkout/shipping"
            element={
              <CheckoutProvider>
                <CheckoutLayout />
              </CheckoutProvider>
            }
          />
          <Route
            path="/checkout/payment"
            element={
              <CheckoutProvider>
                <CheckoutLayout />
              </CheckoutProvider>
            }
          />
          <Route
            path="/checkout/confirmation"
            element={
              <CheckoutProvider>
                <CheckoutLayout />
              </CheckoutProvider>
            }
          />
        </Routes>
        </ErrorBoundary>
      </BrowserRouter>
      </CartProvider>
  
  );
}

export default App;
