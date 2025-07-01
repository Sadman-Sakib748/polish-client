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
import Categories from "../Component/Pages/Categories/Categories";
import About from "../Component/Pages/About/About";
import Contact from "../Component/Pages/Contact/Contact";
import FAQ from "../Component/Pages/FAQ/FAQ";



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
            path: 'Faq',
                element: <FAQ />
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
                loader: ({ params }) => fetch(`http://localhost:3000/booking/${params.email}`, {
                    credentials: 'include'
                }),
            },

            {
                path: "books/:id",
                element: <PrivateRoutes><MyBooks /></PrivateRoutes>,
                loader: ({ params }) => fetch(`http://localhost:3000/books/${params.id}`,
                    {
                        credentials: 'include'
                    }
                )

            },
            {
                path: "edit/:id",
                element: <PrivateRoutes><CreateBookForm /></PrivateRoutes>,
                loader: ({ params }) => fetch(`http://localhost:3000/books/${params.id}`,
                    {
                        credentials: 'include'
                    }
                    
                )
            },

            {

                path: 'signUp',
                element: <Register />
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'Categories',
                element: <Categories />
            },
            {
                path: 'AboutUs',
                element: <About />
            },
            {
                path: 'Contact',
                element: <Contact />
            },
        ]
    },
]);

