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
import ProfileDetails from "../Component/Pages/profileDetails/profileDetails";
import CreatePage from "../Component/Pages/CreatePAge/CreatePage";
import CreateBookForm from "../Component/Pages/Modal/CreateBookForm";
import PrivateRoutes from "../Component/Private/PrivateRoutes";



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
                element: <PrivateRoutes><AddBook></AddBook></PrivateRoutes>
            },
            {
                path: 'profile',
                element: <PrivateRoutes><ProfileDetails></ProfileDetails></PrivateRoutes>,

            },
            {
                path: 'myGroup/:email',
                element: <PrivateRoutes><CreatePage></CreatePage></PrivateRoutes>,
                loader: ({ params }) => fetch(`https://assignment-server-11-dun.vercel.app/booking/${params.email}`,{
                    credentials: 'include'
                }),
            },

            {
                path: "books/:id",
                element: <PrivateRoutes><MyBooks /></PrivateRoutes>,
                loader: ({ params }) => fetch(`https://assignment-server-11-dun.vercel.app/books/${params.id}`)

            },
            {
                path: "edit/:id",
                element: <PrivateRoutes><CreateBookForm /></PrivateRoutes>,
                loader: ({ params }) => fetch(`https://assignment-server-11-dun.vercel.app/books/${params.id}`)
            },

            {

                path: 'signUp',
                element: <Register />
            },
            {
                path: 'login',
                element: <Login></Login>
            },
        ]
    },
]);

