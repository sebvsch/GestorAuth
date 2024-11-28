import { FC } from "react";
import { useAuth } from "../auth/AuthProvider";

const PerfilUsuario: FC = () => {

    const { currentUser } = useAuth()

    return (
        <>
            <div>
                <h1>{currentUser?.nombreCompleto}</h1>
            </div>
            <div>
                <span>{currentUser?.nombreUsuario}</span>
            </div>
            <div>
                <span>{currentUser?.correo}</span>
            </div>
            <div>
                <span>{currentUser?.tipoUsuario}</span>
            </div>
        </>
    )
}

export { PerfilUsuario }