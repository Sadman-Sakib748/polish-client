import {
    createBrowserRouter,
} from "react-router";
import Main from "../Layout/Main";
import Home from "../Component/Home/Home";
import Register from "../Component/Shared/Register/Register";
import Login from "../Component/Shared/Login/Login";
import Error404 from "../Component/Error404/Error404";
import Bookshelf from "../Component/Pages/Bookshelf/Bookshelf";
import AddBook from "../Component/Pages/AddBook/AddBook";
import MyBooks from "../Component/Pages/MyBooks/MyBooks";
import profileDetails from "../Component/Pages/profileDetails/profileDetails";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <Error404></Error404>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'Bookshelf',
                element: <Bookshelf></Bookshelf>
            },
            {
                path: 'AddBook',
                element: <AddBook></AddBook>
            },
            {
                path: 'profile',
                element: <profileDetails></profileDetails>
            },

            {
                path: "MyBooks/:id",
                element: <MyBooks />,
                loader: async ({ params }) => {
                    const res = await fetch(`http://localhost:3000/books/${params._id}`);
                    if (!res.ok) {
                        throw new Response("Book not found", { status: 404 });
                    }
                    const data = await res.json();
                    return data;  // Return single book object
                },

                path: 'register',
                element: <Register />
            },
            {
                path: 'login',
                element: <Login></Login>
            },
        ]
    },
]);

