import { lazy } from "react";
import LogsPage from "../pages/LogsPage";

const LoginPage = lazy(() => import("../pages/LoginPage.tsx"));
const HomePage = lazy(() => import("../pages/HomePage.tsx"));
const UsersPage = lazy(() => import("../pages/UsersPage.tsx"));
const OrdersPage = lazy(() => import("../pages/OrdersPage.tsx"));
const ProductsPage = lazy(() => import("../pages/ProductsPage.tsx"));
const CategoriesPage = lazy(() => import("../pages/CategoriesPage.tsx"));


const NotFoundPage = lazy(() => import("../pages/NotFoundPage.tsx"));

export const publicRoutes = [
  { path: "/login", element: <LoginPage /> },
];

export const privateRoutes = [
  // home
  { path: "/home", element: <HomePage /> },

  // users
  { path: "/users", element: <UsersPage /> },

  // orders
  { path: "/orders", element: <OrdersPage /> },
  // products
  { path: "/products", element: <ProductsPage /> },

  // not Found
  { path: "/notFound", element: <NotFoundPage /> },

  // categories
  { path: "/categories", element: <CategoriesPage /> },

  // logs
  { path: "/logs", element: <LogsPage /> },

  // categories -> subCategories -> products by subCategoryId
  { path: "/categories/:categoryId/subCategories/:subCategoryId/products", element: <ProductsPage /> },
];

