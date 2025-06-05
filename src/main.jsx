import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router";
import { router } from './Router/Routes';
import AuthProviders from './Providers/AuthProviders';
import { Toaster } from 'react-hot-toast';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProviders>

      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </AuthProviders>
  </StrictMode>,
)
