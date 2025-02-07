import React, { FC, useState } from "react";
import { IRegistrarUsuario } from "../../Interfaces/IUsuario";
import { RegistrarUsuario } from "../../services/UsuarioServices";
import { Link } from "react-router-dom";
import { Button, Input, Form } from "@nextui-org/react";


const Registrar: FC = () => {

    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isVisibleConfirm, setIsVisibleConfirm] = useState<boolean>(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm);

    const [registrarUsuario, setRegistrarUsuario] = useState<IRegistrarUsuario>({
        nombreCompleto: "",
        correo: "",
        nombreUsuario: "",
        contrasenia: "",
        confirmarContrasenia: "",
        tipoUsuario: "Usuario Nuevo"
    })

    const handleRegistrar = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = {
            nombreCompleto: registrarUsuario.nombreCompleto,
            correo: registrarUsuario.correo,
            nombreUsuario: registrarUsuario.nombreUsuario,
            contrasenia: registrarUsuario.contrasenia,
            confirmarContrasenia: registrarUsuario.confirmarContrasenia,
            tipoUsuario: registrarUsuario.tipoUsuario,
        }
        try {
            await RegistrarUsuario(data)
            setRegistrarUsuario({
                nombreCompleto: "",
                correo: "",
                nombreUsuario: "",
                contrasenia: "",
                confirmarContrasenia: "",
                tipoUsuario: "Usuario Nuevo"
            })
        } catch (e: any) {
            console.log(e)
        }
    }

    return (
        <>
            <div className="flex justify-center items-center min-h-screen">
                <Form
                    onSubmit={handleRegistrar}
                    validationBehavior="native"
                    className="w-[600px] min-h-[600px] flex flex-col items-center p-6 rounded-lg"
                    style={{ boxShadow: '0px 0px 30px 0px rgba(0,0,0,0.070)' }}
                >
                    <h1 className='text-2xl font-semibold mb-4 text-center'>Registrarse</h1>
                    <div className="my-4 w-full flex justify-center">
                        <Input
                            isRequired
                            errorMessage="Por favor ingrese el nombre"
                            label="Nombre Completo:"
                            labelPlacement="outside"
                            type="text"
                            placeholder="Ej: Sebastian Chico"
                            variant="flat"
                            className="w-[80%]"
                            value={registrarUsuario.nombreCompleto}
                            onChange={(e) => setRegistrarUsuario({ ...registrarUsuario, nombreCompleto: e.target.value })}
                        />
                    </div>
                    <div className="my-4 w-full flex justify-center">
                        <Input
                            isRequired
                            errorMessage="Por favor ingrese el usuario"
                            label="Usuario:"
                            labelPlacement="outside"
                            type="text"
                            placeholder="Ej: schicob"
                            variant="flat"
                            className="w-[80%]"
                            value={registrarUsuario.nombreUsuario}
                            onChange={(e) => setRegistrarUsuario({ ...registrarUsuario, nombreUsuario: e.target.value })}
                        />
                    </div>
                    <div className="my-4 w-full flex justify-center">
                        <Input
                            isRequired
                            errorMessage="Por favor valide el correo"
                            label="Correo Electronico:"
                            labelPlacement="outside"
                            type="email"
                            placeholder="Ej: schicob@gmail.com"
                            variant="flat"
                            className="w-[80%]"
                            value={registrarUsuario.correo}
                            onChange={(e) => setRegistrarUsuario({ ...registrarUsuario, correo: e.target.value })}
                        />
                    </div>
                    <div className="my-4 w-full flex justify-center">
                        <Input
                            isRequired
                            errorMessage="Por favor ingrese la contraseña"
                            label="Contraseña:"
                            labelPlacement="outside"
                            type={isVisible ? "text" : "password"}
                            placeholder="Contraseña"
                            variant="flat"
                            className="w-[80%]"
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
                            value={registrarUsuario.contrasenia}
                            onChange={(e) => setRegistrarUsuario({ ...registrarUsuario, contrasenia: e.target.value })}

                        />
                    </div>
                    <div className="my-4 w-full flex justify-center">
                        <Input
                            isRequired
                            errorMessage="Por favor confirme la contraseña"
                            label="Confirmar Contraseña:"
                            labelPlacement="outside"
                            type={isVisibleConfirm ? "text" : "password"}
                            placeholder="Confirmar Contraseña"
                            variant="flat"
                            className="w-[80%]"
                            endContent={
                                <button
                                    aria-label="toggle password visibility"
                                    className="focus:outline-none"
                                    type="button"
                                    onClick={toggleVisibilityConfirm}
                                >
                                    {isVisibleConfirm ? (
                                        <i className="fa-solid fa-eye-slash text-gray-400"></i>
                                    ) : (
                                        <i className="fa-solid fa-eye text-gray-400"></i>
                                    )}
                                </button>
                            }
                            value={registrarUsuario.confirmarContrasenia}
                            onChange={(e) => setRegistrarUsuario({ ...registrarUsuario, confirmarContrasenia: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <Link to="/login" className="text-blue-500 text-xs hover:underline">Inicia sesión si ya estás registrado</Link>
                    </div>
                    <Button className="font-semibold w-[80%]" color="primary" size="lg" radius="lg" type='submit'>Registrarse</Button>
                </Form>
            </div>

        </>
    )
}

export { Registrar }