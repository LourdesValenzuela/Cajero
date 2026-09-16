import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import CajaPage from "./pages/CajaPage";
import ProductosPage from "./pages/ProductosPage";
import VentasPage from "./pages/VentasPage";
import InventarioPage from "./pages/InventarioPage";
import UsuariosPage from "./pages/UsuariosPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import AppLayout from "./components/layout/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/dashboard"
            element={
              <RoleProtectedRoute rolesPermitidos={["ADMIN"]}>
                <DashboardPage />
              </RoleProtectedRoute>
            }
          />

          <Route path="/caja" element={<CajaPage />} />

          <Route
            path="/productos"
            element={<ProductosPage />}
          />

          <Route
            path="/ventas"
            element={<VentasPage />}
          />

          <Route
            path="/inventario"
            element={
              <RoleProtectedRoute
                rolesPermitidos={["ADMIN"]}
              >
                <InventarioPage />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/usuarios"
            element={
              <RoleProtectedRoute
                rolesPermitidos={["ADMIN"]}
              >
                <UsuariosPage />
              </RoleProtectedRoute>
            }
          />
        </Route>

        <Route
          path="*"
          element={<Navigate to="/caja" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;