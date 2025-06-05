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
                element: <ProfileDetails></ProfileDetails>,

            },
            {
                path: 'myGroup/:email',
                loader: ({params}) => fetch(`http://localhost:3000/booking/${params.email}`) ,
                element: <CreatePage></CreatePage>,
            },

            {
                path: "books/:id",
                element: <MyBooks />,
                loader: ({ params }) => fetch(`http://localhost:3000/books/${params.id}`)

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

