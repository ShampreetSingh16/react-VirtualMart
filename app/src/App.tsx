import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/home/Home';
import Products from './components/products/Products';
import ProductDescription from './components/products/ProductDescription';
import Cart from './components/Cart';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Error from './components/Error';
import Login from './components/Login';
import Register from './components/Register';
import Checkout from './components/Checkout';
import PaymentSucess from './components/PaymentSucess';
import PaymentFailure from './components/PaymentFailure';
import { Provider } from 'react-redux';
import { store } from './redux/store';

//defining all the routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:id",
        element: <ProductDescription />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/paymentsuccess",
        element: <PaymentSucess />,
      },
      {
        path: "/paymentfailure",
        element: <PaymentFailure />,
      },
      {
        path: '*',
        element: <Error />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer position="bottom-left" theme="dark" hideProgressBar={false} autoClose={2000} />
    </Provider>
  );
}

export default App;
