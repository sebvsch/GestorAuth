import { FC, useState } from "react";
import { IAccesoUsuario } from "../../Interfaces/IUsuario";
import { AccesoUsuario } from "../../services/UsuarioServices";
import { Link } from "react-router-dom";
import { Button, Form, Input, Link as LinkNUI } from "@nextui-org/react";
import { toast } from "react-toastify";

const Login: FC = () => {

    const [loginUsuario, setLoginUsuario] = useState<IAccesoUsuario>({
        usuarioOCorreo: "",
        contrasenia: ""
    })
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const toggleVisibility = () => setIsVisible(!isVisible);


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
            <div className="flex justify-center items-center min-h-screen">
                <Form
                    onSubmit={handleAcceder}
                    validationBehavior="native"
                    className="w-[450px] flex flex-col items-center p-6 rounded-lg"
                    style={{ boxShadow: '0px 0px 30px 0px rgba(0,0,0,0.070)' }}>
                    <h1 className='text-2xl font-semibold my-4'>Iniciar Sesión</h1>
                    <div className="w-[80%]">
                        <Input
                            isRequired
                            errorMessage="Ingrese usuario o correo"
                            label="Usuario o correo"
                            labelPlacement="outside"
                            type="text"
                            placeholder="Usuario o correo"
                            variant="flat"
                            value={loginUsuario.usuarioOCorreo}
                            onChange={(e) => setLoginUsuario({ ...loginUsuario, usuarioOCorreo: e.target.value })}
                        />
                    </div>
                    <div className="w-[80%] mt-4">
                        <Input
                            isRequired
                            errorMessage="Ingrese la contraseña"
                            label="Contraseña"
                            labelPlacement="outside"
                            type={isVisible ? "text" : "password"}
                            placeholder="Contraseña"
                            variant="flat"
                            endContent={
                                <button
                                    aria-label="toggle password visibility"
                                    className="focus:outline-none"
                                    type="button"
                                    onClick={toggleVisibility}
                                >
                                    {isVisible ? (
                                        <i className="fa-solid fa-eye-slash text-gray-400"></i>
                                    ) : (
                                        <i className="fa-solid fa-eye text-gray-400"></i>
                                    )}
                                </button>
                            }
                            value={loginUsuario.contrasenia}
                            onChange={(e) => setLoginUsuario({ ...loginUsuario, contrasenia: e.target.value })}
                        />
                    </div>
                    <div className="my-3">
                        <LinkNUI >
                            <Link to="/registrarse" className="text-xs">¿No estas registrado?</Link>
                        </LinkNUI>
                    </div>
                    <div>
                        <Button className="font-semibold" color="primary" size="lg" radius="lg" type='submit'>Inciar Sesión</Button>
                    </div>
                    <div>
                    </div>
                </Form>
            </div>
        </>
    )
}

export { Login }