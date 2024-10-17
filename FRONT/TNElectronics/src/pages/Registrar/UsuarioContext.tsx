import { createContext, useEffect } from "react";

type UsuarioType = {

}

export const UsuarioContext = createContext<UsuarioType>(
    {} as UsuarioType
);

export function UsuarioContextProvider({ children }: any) {


    useEffect(() => {
    }, [])

    return (
        <UsuarioContext.Provider value={{

        }}>
            {children}
        </UsuarioContext.Provider>
    )
}