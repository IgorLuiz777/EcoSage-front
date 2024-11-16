import { createBrowserRouter } from "react-router-dom";
import Home from "../views/home";
import Dashboard from "@/views/dashboard";

export const router = createBrowserRouter([

    {
        id: 'root',
        path: "/",
        element: <Home />
    },
    {
        path: "/equipments",
        element: <Dashboard />
    }
])