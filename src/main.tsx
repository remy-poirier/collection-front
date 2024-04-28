import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import { ErrorPage } from './pages/error/error.tsx'
import { Home } from './pages/home/home.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Signup } from './pages/session/signup.tsx'
import { Signin } from './pages/session/signin.tsx'
import { Collection } from './pages/collection/collection.tsx'
import { LoggedRoute } from './conf/logged-route.tsx'
import { AdminRoute } from './conf/admin-route.tsx'
import { Items } from './pages/admin/items/items.tsx'
import { Dashboard } from './pages/dashboard/dashboard.tsx'
import { CollectionItem } from './pages/collection/collection-item.tsx'

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'login',
        element: <Signin />,
      },
      {
        path: 'app',
        element: <LoggedRoute />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: 'dashboard',
            element: <Dashboard />
          },
          {
            path: 'collection',
            element: <Collection />
          },
          {
            path: 'collection/:id',
            element: <CollectionItem />
          },
          {
            path: 'admin',
            element: <AdminRoute />,
            errorElement: <ErrorPage />,
            children: [
              {
                path: 'items',
                element: <Items />
              }
            ]
          }
        ]
      }
    ]
  }
])

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
