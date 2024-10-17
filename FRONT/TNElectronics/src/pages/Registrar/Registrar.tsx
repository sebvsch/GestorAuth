import React, { FC, useState } from "react";
import { IRegistrarUsuario } from "../../Interfaces/IUsuario";
import { RegistrarUsuario } from "../../services/UsuarioServices";
import { Link } from "react-router-dom";
import { Button, Link as LinkNUI } from "@nextui-org/react";

const Registrar: FC = () => {

    const [registrarUsuario, setRegistrarUsuario] = useState<IRegistrarUsuario>({
        nombreCompleto: "",
        correo: "",
        nombreUsuario: "",
        contrasenia: ""
    })

    const requestRegistrar = async () => {
        const data = {
            nombreCompleto: registrarUsuario.nombreCompleto,
            correo: registrarUsuario.correo,
            nombreUsuario: registrarUsuario.nombreUsuario,
            contrasenia: registrarUsuario.contrasenia,
        }
        try {
            await RegistrarUsuario(data)
        } catch (e: any) {
            console.log(e)
        }
    }

    const handleRegistrar = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await requestRegistrar()
            setRegistrarUsuario({
                nombreCompleto: "",
                correo: "",
                nombreUsuario: "",
                contrasenia: ""
            })
        } catch (e: any) {
            console.log(e)
        }
    }


    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen">
                <form onSubmit={handleRegistrar} className='w-1/4 py-9 text-center rounded-xl border-zinc-700' style={{ boxShadow: '0px 0px 30px 0px rgba(0,0,0,0.070)' }}>
                    <h1 className='text-2xl font-semibold mb-4'>Registrarse</h1>
                    <div className="my-6">
                        <div>
                            <label className='font-semibold text-sm py-10'>Nombre Completo:</label>
                        </div>
                        <div>
                            <input
                                className="py-2 px-2 rounded-lg bg-[#f5f8fae8] text-zinc-700 font-medium w-3/4 text-sm"
                                type="text"
                                placeholder="Nombre completo"
                                value={registrarUsuario.nombreCompleto}
                                onChange={(e) => setRegistrarUsuario({ ...registrarUsuario, nombreCompleto: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div className="my-6">
                        <div>
                            <label className='font-semibold text-sm py-10'>Usuario:</label>
                        </div>
                        <div>
                            <input
                                className="py-2 px-2 rounded-lg bg-[#f5f8fae8] text-zinc-700 font-medium w-3/4 text-sm"
                                type="text"
                                placeholder="Usuario"
                                value={registrarUsuario.nombreUsuario}
                                onChange={(e) => setRegistrarUsuario({ ...registrarUsuario, nombreUsuario: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div className="my-6">
                        <div>
                            <label className='font-semibold text-sm py-10'>Correo electronico:</label>
                        </div>
                        <div>
                            <input
                                className="py-2 px-2 rounded-lg bg-[#f5f8fae8] text-zinc-700 font-medium w-3/4 text-sm"
                                type="text"
                                placeholder="Correo electronico"
                                value={registrarUsuario.correo}
                                onChange={(e) => setRegistrarUsuario({ ...registrarUsuario, correo: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div className="my-6">
                        <div>
                            <label className='font-semibold text-sm py-10'>Contraseña:</label>
                        </div>
                        <div>
                            <input
                                className="py-2 px-2 rounded-lg bg-[#f5f8fae8] text-zinc-700 font-medium w-3/4 text-sm"
                                type="password"
                                placeholder="Contraseña"
                                value={registrarUsuario.contrasenia}
                                onChange={(e) => setRegistrarUsuario({ ...registrarUsuario, contrasenia: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div>
                    </div>
                    <div className="mb-6">
                        <LinkNUI >
                            <Link to="/login">Inicia sesion si ya estas registrado</Link>
                        </LinkNUI>
                    </div>
                    <div>
                        <Button className="font-semibold" color="primary" size="lg" radius="lg" type='submit'>Registrarse</Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export { Registrar }