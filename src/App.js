import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import HomePage, { loader as dataLoader } from "./pages/Home";
import ShopPage from "./pages/Shop";
import DetailPage from "./pages/Detail";
import CartPage from "./pages/Cart.jsx";
import CheckoutPage from "./pages/Checkout.jsx";
import LoginPage from "./pages/Login.jsx";
import RegisterPage from "./pages/Register.jsx";
import NoPageFound from "./pages/error/NoPageFound.jsx";
import { action as registerAction } from "./components/authenticate/SignupForm.jsx";
import { action as loginAction } from "./components/authenticate/SigninForm.jsx";
import { action as logoutAction } from "./pages/Logout.jsx";
import { checkAuth } from "./helper/getUser.jsx";
import History from "./pages/History.jsx";
import HistoryDetail from "./components/history/HistoryDetail.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      id: "root",
      loader: dataLoader,
      errorElement: <NoPageFound />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "shop",
          element: <ShopPage />,
        },
        { path: "detail/:productId", element: <DetailPage /> },
        { path: "cart", element: <CartPage />, loader: checkAuth },
        { path: "checkout", element: <CheckoutPage />, loader: checkAuth },
        { path: "login", element: <LoginPage />, action: loginAction },
        {
          path: "register",
          element: <RegisterPage />,
          action: registerAction,
        },
        { path: "history", element: <History /> },
        { path: "order-detail/:orderId", element: <HistoryDetail /> },
        { path: "/logout", action: logoutAction },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
