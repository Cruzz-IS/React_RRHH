import { lazy, Suspense } from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { AuthMiddleware } from './middleware/AuthMiddleware';
import PublicRoutes from './routes/PublicRoutes';
import { AuthProvider } from './context/AuthProvider';
import { ProtectedRoutes } from './routes/ProtectedRoutes';

const LoginPage     = lazy(() => import('./features/auth/pages/LoginPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));


const Spinner = () => (
  <div className="flex h-screen w-full items-center justify-center bg-slate-900">
    <div className="h-10 w-10 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
  </div>
);


const RootLayout = () => (
  <AuthProvider>
    <AuthMiddleware>
      <Outlet />
    </AuthMiddleware>
  </AuthProvider>
);

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [

      //  Rutas publicas
      {
        element: (
          <Suspense fallback={<Spinner />}>
            <PublicRoutes />
          </Suspense>
        ),
        children: [
          { path: '/login', element: <LoginPage /> },
        ],
      },

      //  Rutas protegidas, todos los roles autenticados
      {
        element: (
          <Suspense fallback={<Spinner />}>
            <ProtectedRoutes />
          </Suspense>
        ),
        children: [
          { path: '/',          element: <DashboardPage /> },
          { path: '/dashboard', element: <DashboardPage /> },


        ],
      },

      //  Rutas protegidas 
      {
        element: (
          <Suspense fallback={<Spinner />}>
            <ProtectedRoutes allowedRoles={['Admin', 'Manager']} />
          </Suspense>
        ),
        children: [
          // { path: '/empleados',     element: <EmpleadosPage /> },
          // { path: '/empleados/:id', element: <EmpleadoDetailPage /> },
        ],
      },

      //  Rutas protegidas, solo Admin ───────────────────────
      {
        element: (
          <Suspense fallback={<Spinner />}>
            <ProtectedRoutes allowedRoles={['Admin']} />
          </Suspense>
        ),
        children: [
          // { path: '/configuracion', element: <ConfiguracionPage /> },
        ],
      },

    ],
  },
]);

const App = () => (
  <RouterProvider router={router} />
);

export default App;