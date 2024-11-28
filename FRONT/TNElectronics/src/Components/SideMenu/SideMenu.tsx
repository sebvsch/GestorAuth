import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { SideMenuItems } from "./SideMenuItems";
import { useAuth } from "../../auth/AuthProvider";

const SideMenu: FC = () => {
    const logout = () => {
        localStorage.clear();
    };

    const location = useLocation();

    const { currentUser } = useAuth()

    return (
        <div className="bg-white w-64 h-screen border-1 border-gray-200 flex flex-col overflow-hidden">
            <aside className="text-white flex flex-col flex-grow">
                <nav className="pt-12 font-semibold text-sm text-slate-500 flex-grow overflow-y-auto">
                    <SideMenuItems
                        direccion="/dashboard"
                        icon="fa-solid fa-house"
                        titulo="Dashboard"
                        activo={location.pathname === "/dashboard"}
                    />
                    <SideMenuItems
                        direccion="/productos"
                        icon="fa-solid fa-box"
                        titulo="Productos"
                        activo={location.pathname === "/productos"}
                    />
                    <SideMenuItems
                        direccion="/usuarios"
                        icon="fa-solid fa-users"
                        titulo="Usuarios"
                        activo={location.pathname === "/usuarios"}
                    />
                    <Link
                        to="/"
                        onClick={logout}
                        className="block py-2.5 px-8 hover:bg-red-100 hover:text-red-500 ease-in duration-200 rounded-lg"
                    >
                        <i className="fa-solid fa-right-from-bracket mr-[5px]"></i>
                        Salir
                    </Link>
                </nav>
                <div className="pb-4 font-medium text-lg text-slate-500">
                    <SideMenuItems
                        direccion={`/perfil/${currentUser?.nombreUsuario}`}
                        titulo={currentUser?.nombreUsuario}
                        activo={location.pathname === "/perfil"}
                    />
                </div>
            </aside>
        </div>
    );
};

export { SideMenu };
