import { FC } from "react";
import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import { Login } from "../pages/Acceso/Login";
import { Registrar } from "../pages/Acceso/Registrar";
import { MasterLayout } from "../Layout/MasterLayout";
import { Dashboard } from "../pages/Dashboard";
import { Productos } from "../pages/Productos";
import { Usuarios } from "../pages/Usuarios";
import { useAuth } from "../auth/AuthProvider";

const PrivateRoutes: FC = () => {
    const auth = localStorage.getItem("token");
    return auth ? <Outlet /> : <Navigate to="/" />
}

const PublicRoutes: FC = () => {
    const auth = localStorage.getItem("token");
    return !auth ? <Outlet /> : <Navigate to="/dashboard" />;
};

const AppRoutes: FC = () => {

    const { currentUser } = useAuth()

    return (
        <>
            <Routes>
                <Route element={<PrivateRoutes />}>
                    <Route element={<MasterLayout />}>
                        {currentUser?.tipoUsuario === "Administrador" &&
                            <>
                                <Route path='/dashboard' element={<Dashboard />} />
                                <Route path='/productos' element={<Productos />} />
                                <Route path='/usuarios' element={<Usuarios />} />

                            </>
                        }
                        {currentUser?.tipoUsuario === "Testing" &&
                            <>
                                <Route path='/dashboard' element={<Dashboard />} />
                                <Route path='/productos' element={<Productos />} />
                            </>
                        }
                        {currentUser?.tipoUsuario === "Usuario Nuevo" &&
                            <>
                                <Route path='/dashboard' element={<Dashboard />} />
                            </>
                        }
                        <Route path="/*" element={<Navigate to="/dashboard" />} />
                    </Route>
                </Route>

                <Route element={<PublicRoutes />}>
                    <Route path='/login' element={<Login />} />
                    <Route path='/registrarse' element={<Registrar />} />
                    <Route index element={<Navigate to="/login" />} />
                    <Route path="/*" element={<Navigate to="/login" />} />
                </Route>
            </Routes>
        </>
    )
}

export { AppRoutes }