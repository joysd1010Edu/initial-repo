import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Error from "../Pages/Error/Error";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/LOGIN/Login";
import Signup from "../Pages/Login/Signup/signup";
import Laptop from "../Pages/Products/Laptop/Laptop"
import DetailPage from "../Pages/Products/Laptop/DetailPage";
import Monitor from "../Pages/Products/Monitor/Monitor";
import Gpu from "../Pages/Products/GPU/Gpu";
import Phone from "../Pages/Products/Phone/Phone";
import Ram from "../Pages/Products/Ram/Ram";
import BuyNow from "../Pages/Products/BuyNowPage/BuyNow";
import PrivateRoute from "../Pages/PrivateRoute/Privateroute";
import DetailpageG from "../Pages/Products/GPU/DetailpageG";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home/>
      
      },
      {
        path: "/login",
        element: <Login/>
      
      },
      {
        path: "/signup",
        element: <Signup/>
      
      },
      {
        path: "laptop",
        element: <Laptop/>
      
      },
      { path: "laptopId/:id",
        element: <DetailPage/>,
        loader: ({ params }) =>
        fetch(`http://localhost:5000/laptop/detail/${params.id}`)      
      },
      
      { path: "gpuID/:id",
        element: <DetailpageG/>,
        loader: ({ params }) =>
        fetch(`http://localhost:5000/gpu/detail/${params.id}`)      
      },
      {
        path: "monitor",
        element: <Monitor/>
      
      },
      {
        path: "gpu",
        element: <Gpu/>
      
      },
      {
        path: "SSD",
        element: <p>this is the SSD</p>
      
      },
      {
        path: "HDD",
        element: <p>this is the HDD</p>
      
      },
      {
        path: "Casing",
        element: <p>this is the Casing</p>
      
      },
      {
        path: "MotherBoard",
        element:<p>this is the Motherboard</p>
      
      },
      {
        path: "CpuCooler",
        element:<p>this is the cpuColler</p>
      
      },
      {
        path: "phone",
        element: <Phone/>
      
      },
      {
        path: "CasingCooler",
        element:<p>this is the Casing Cooler</p>
      
      },
      {
        path: "PSU",
        element: <p>this is the Psu</p>
      
      },
      
      {
        path: "Processor",
        element: <p>this is the processor</p>
      
      },
      {
        path: "Component",
        element: <p>this is the Component</p>
      
      },
      
      {
        path: "ram",
        element: <Ram/>
      
      },
      {path: "buynow",
      element:<PrivateRoute><BuyNow/></PrivateRoute> },
      {
        path:'*',
        element:<Error/>
      }
      
      

    ],
  },
  
]);
export default Router;
