import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { ICurrentUser } from "../Interfaces/IUsuario";
import { CurrentUser } from "../services/UsuarioServices";

interface AuthProviderProps {
    children: ReactNode;
}

type AuthType = {
    currentUser: ICurrentUser | null
}

export const AuthContext = createContext<AuthType>(
    {} as AuthType
);

export function AuthProvider({ children }: AuthProviderProps) {
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
        <AuthContext.Provider value={{
            currentUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)