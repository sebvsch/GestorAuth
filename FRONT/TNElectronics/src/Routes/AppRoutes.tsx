import { FC } from "react";
import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import { Login } from "../pages/Registrar/Login";
import { Registrar } from "../pages/Registrar/Registrar";
import { MasterLayout } from "../Layout/MasterLayout";
import { Dashboard } from "../pages/Dashboard";
import { Productos } from "../pages/Productos";
import { Usuarios } from "../pages/Usuarios";
import { PerfilUsuario } from "../pages/PerfilUsuario";

const PrivateRoutes: FC = () => {
    const auth = localStorage.getItem("token");
    return auth ? <Outlet /> : <Navigate to="/" />
}

const PublicRoutes: FC = () => {
    const auth = localStorage.getItem("token");
    return !auth ? <Outlet /> : <Navigate to="/dashboard" />;
};

const AppRoutes: FC = () => {

    return (
        <>
            <Routes>
                <Route element={<PrivateRoutes />}>
                    <Route element={<MasterLayout />}>
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path='/productos' element={<Productos />} />
                        <Route path='/usuarios' element={<Usuarios />} />
                        <Route path='/perfil/:usuario' element={<PerfilUsuario />} />
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