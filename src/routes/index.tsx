import { createBrowserRouter } from "react-router-dom";
import Home from "../views/home";

export const router = createBrowserRouter([

    {
        id: 'root',
        path: "/",
        element: <Home />
    }
])