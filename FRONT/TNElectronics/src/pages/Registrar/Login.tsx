import { FC, useState } from "react";
import { IAccesoUsuario } from "../../Interfaces/IUsuario";
import { AccesoUsuario } from "../../services/UsuarioServices";
import { Link } from "react-router-dom";
import { Button, Link as LinkNUI } from "@nextui-org/react";
import { toast } from "react-toastify";

const Login: FC = () => {

    const [loginUsuario, setLoginUsuario] = useState<IAccesoUsuario>({
        usuarioOCorreo: "",
        contrasenia: ""
    })

    const handleAcceder = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = {
            usuarioOCorreo: loginUsuario.usuarioOCorreo,
            contrasenia: loginUsuario.contrasenia
        }
        try {
            await AccesoUsuario(data)
        } catch (e: any) {
            toast.error("Credenciales incorrectas 🤷‍♂️", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                className: "text-xs font-bold"
            })
        }
    };

    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen">
                <form onSubmit={handleAcceder} className='w-1/4 py-9 text-center  rounded-xl border-zinc-700' style={{ boxShadow: '0px 0px 30px 0px rgba(0,0,0,0.070)' }}>
                    <h1 className='text-2xl font-semibold mb-4'>Iniciar Sesión</h1>
                    <div className="my-6">
                        <div>
                            <label className='font-semibold text-sm py-10'>Usuario o Correo:</label>
                        </div>
                        <div>
                            <input
                                className="py-2 px-2 rounded-lg bg-[#f2f3f4] text-zinc-700 font-medium w-3/4 text-sm"
                                type="text"
                                placeholder="Usuario o Correo"
                                required
                                value={loginUsuario.usuarioOCorreo}
                                onChange={(e) => setLoginUsuario({ ...loginUsuario, usuarioOCorreo: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="my-6">
                        <div>
                            <label className='font-semibold text-sm'>Contraseña:</label>
                        </div>
                        <div>
                            <input
                                className="py-2 px-2 rounded-lg bg-[#f2f3f4] text-zinc-700 font-medium w-3/4 text-sm"
                                type="password"
                                placeholder="Contraseña"
                                required
                                value={loginUsuario.contrasenia}
                                onChange={(e) => setLoginUsuario({ ...loginUsuario, contrasenia: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <LinkNUI >
                            <Link to="/registrarse">¿No estas registrado?</Link>
                        </LinkNUI>
                    </div>
                    <div>
                        <Button className="font-semibold" color="primary" size="lg" radius="lg" type='submit'>Inciar Sesión</Button>
                    </div>
                    <div>
                    </div>
                </form>
            </div>
        </>
    )
}

export { Login }