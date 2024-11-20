import { createBrowserRouter } from "react-router-dom";
import Home from "../views/home";
import Dashboard from "@/views/dashboard";
import Chat from "@/views/chat";

export const router = createBrowserRouter([

    {
        id: 'root',
        path: "/",
        element: <Home />
    },
    {
        path: "/dashboard",
        element: <Dashboard />
    },
    {
        path: "/chat",
        element: <Chat />
    },
])