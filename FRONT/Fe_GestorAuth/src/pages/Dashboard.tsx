import { FC } from "react";
import { CardIrA } from "../Components/CardIrA";
import { useAuth } from "../auth/AuthProvider";

const Dashboard: FC = () => {

    const { currentUser } = useAuth()

    return (
        <>
            <div className="flex justify-center">
                <h1 className="text-3xl font-light m-4">{"Bienvenido "}<span className="font-semibold">{currentUser?.nombreCompleto}</span>👋</h1>
            </div>
            <div className="flex flex-wrap justify-center gap-3 m-4">
                {currentUser?.tipoUsuario === "Administrador" &&
                    <>
                        <CardIrA titulo="Productos" direccion="/productos" colorTexto="text-orange-500" />
                        <CardIrA titulo="Usuarios" direccion="/usuarios" colorTexto="text-green-500" />
                    </>
                }
                {currentUser?.tipoUsuario === "Testing" &&
                    <>
                        <CardIrA titulo="Productos" direccion="/productos" colorTexto="text-orange-500" />
                    </>
                }
                {currentUser?.tipoUsuario === "Usuario Nuevo" &&
                    <>
                        <h2>Necesitas que un <span className="underline font-semibold text-blue-500">Administrador</span> te de rol para navegar por el sistema</h2>
                    </>
                }
            </div>
        </>
    );
}

export { Dashboard };
