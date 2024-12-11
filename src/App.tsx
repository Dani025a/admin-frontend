import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login/login";
import Unauthorized from "./pages/unauthorized/unauthorized";
import Dashboard from "./pages/dashboard/dashboard";
import Layout from "./components/layout";
import AuthGuard from "./components/authGuard";
import ForgotPassword from "./pages/requestForgotPassword/requestForgotPassword";
import ResetPassword from "./pages/resetPassword/resetPassword";
import Profile from "./pages/profile/profile";
import Users from "./pages/users/users";
import Category from "./pages/category-management/category";
import AddEditProduct from "./components/product/productForm/productForm";
import Product from "./pages/product/product";
import ProductInformation from "./components/product/productInformation/productInformation";
import ProductForm from "./components/product/productForm/productForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route
          path="/dashboard"
          element={
            <AuthGuard>
              <Layout>
                <Dashboard />
              </Layout>
            </AuthGuard>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthGuard>
              <Layout>
                <Profile />
              </Layout>
            </AuthGuard>
          }
        />
        <Route
          path="/orders"
          element={
            <AuthGuard>
              <Layout>
                <h1>Orders Page</h1>
              </Layout>
            </AuthGuard>
          }
        />
        <Route
          path="/products"
          element={
            <AuthGuard>
              <Layout>
                <Product />
              </Layout>
            </AuthGuard>
          }
        />
        <Route
          path="/productInformation/:id"
          element={
            <AuthGuard>
              <Layout>
                <ProductInformation />
              </Layout>
            </AuthGuard>
          }
        />
        <Route
          path="/product"
          element={
            <AuthGuard>
              <Layout>
                <AddEditProduct />
              </Layout>
            </AuthGuard>
          }
        />
        <Route
          path="/product/:id"
          element={
            <AuthGuard>
              <Layout>
                <ProductForm />
              </Layout>
            </AuthGuard>
          }
        />

        <Route
          path="/categories"
          element={
            <AuthGuard>
              <Layout>
                <Category />
              </Layout>
            </AuthGuard>
          }
        />
        <Route
          path="/users"
          element={
            <AuthGuard>
              <Layout>
                <Users />
              </Layout>
            </AuthGuard>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
