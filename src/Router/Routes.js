import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from './../Pages/Login/Login';
import SignUp from "../Pages/SignUp/SignUp";
import CheckOut from "../Pages/CheckOut/CheckOut";
import Orders from "../Pages/Orders/Orders";
import PrivateRouter from "./PrivateRouter/PrivateRouter";

const router = createBrowserRouter([
    {
      path:'/',
      element: <Main></Main>,
      children: [
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/checkout/:id',
            element:<PrivateRouter>
                    <CheckOut></CheckOut>
                    </PrivateRouter>,
            loader: ({params})=>fetch(`https://genius-car-server-henna-nine.vercel.app/services/${params.id}`)
            
        },
        {
            path:'/orders',
            element: <PrivateRouter>
                <Orders></Orders>
            </PrivateRouter>
        }
    ]
    },
    {
        path:'/login',
        element: <Login></Login>
    },
    {
        path:'/signup',
        element: <SignUp></SignUp>
    }
])
export default router;