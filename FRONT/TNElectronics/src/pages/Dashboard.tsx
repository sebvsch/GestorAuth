import { FC, useEffect, useState } from "react";
import { CardIrA } from "../Components/CardIrA";
import { CurrentUser } from "../services/UsuarioServices";

const Dashboard: FC = () => {

    interface ICurrentUser {
        idUsuario: string
        nombreCompleto: string
        correo: string
        nombreUsuario: string
        tipoUsuario: string
    }

    const [currentUser, setCurrentUser] = useState<ICurrentUser | null>(null)

    const ObtenerCurrentUser = async () => {
        await CurrentUser().then(respuesta => {
            setCurrentUser(respuesta as ICurrentUser)
        })
    }

    useEffect(() => {
        ObtenerCurrentUser()
    }, [])

    return (
        <>
            <div className="flex justify-center">
                <h1 className="text-3xl font-light m-4">{"Bienvenido "}<span className="font-semibold">{currentUser?.nombreCompleto}</span>👋</h1>
            </div>
            <div className="grid grid-cols-2 gap-4 m-4">
                <CardIrA titulo="Productos" direccion="/productos" colorTexto="text-orange-500" />
                <CardIrA titulo="Usuarios" direccion="/usuarios" colorTexto="text-green-500" />
            </div>
        </>
    );
}

export { Dashboard };
