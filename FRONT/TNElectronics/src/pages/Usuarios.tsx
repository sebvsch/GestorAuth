import { FC, useEffect, useState } from "react";
import { IEditarUsuario, IUsuario } from "../Interfaces/IUsuario";
import { EditarUsuario, ObtenerUsuarios } from "../services/UsuarioServices";
import { DropdownAction } from "../Components/DropdownAction";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, Select, SelectItem } from "@nextui-org/react";

type RenderRowProps = {
    item: IUsuario;
    i: number;
    onEdit: (usuario: IEditarUsuario) => void;
}

const RenderRow = ({ item, i, onEdit }: RenderRowProps) => {

    return (
        <tr key={`row-${i}-${Math.random()}`} className="font-medium text-gray-500 text-sm">
            <td className="text-left py-2 min-w-[150px]">
                <div className='flex items-center'>
                    <div className='flex flex-col'>
                        {item.idUsuario}
                    </div>
                </div>
            </td>
            <td className="text-left py-2 min-w-[150px]">
                <div className='flex items-center'>
                    <div className='flex flex-col'>
                        {item.nombreCompleto}
                    </div>
                </div>
            </td>
            <td className="text-left py-2 min-w-[150px]">
                <div className='flex items-center'>
                    <div className='flex flex-col'>
                        {item.nombreUsuario}
                    </div>
                </div>
            </td>
            <td className="text-left py-2 min-w-[150px]">
                <div className='flex items-center'>
                    <div className='flex flex-col'>
                        {item.correo}
                    </div>
                </div>
            </td>
            <td className="text-left py-2 min-w-[150px]">
                <div className='flex items-center'>
                    <div className='flex flex-col'>
                        {item.tipoUsuario}
                    </div>
                </div>
            </td>
            <td className="text-left py-2 min-w-[150px]">
                <div className='flex items-center'>
                    <div className='flex flex-col'>
                        <DropdownAction onOpen={() => onEdit(item)} />
                    </div>
                </div>
            </td>
        </tr>
    );
}

const Usuarios: FC = () => {

    const [usuarios, setUsuarios] = useState<Array<IUsuario> | null>(null)
    const [editarUsuario, setEditarUsuario] = useState<IEditarUsuario | null>(null);
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();


    const consultarListaUsuarios = async () => {
        await ObtenerUsuarios().then(respuesta => {
            setUsuarios(respuesta as Array<IUsuario>)
        })
    }

    const handleEditarUsuario = async (usuario?: IEditarUsuario) => {
        if (usuario) {
            setEditarUsuario(usuario)
            onOpen();
        }
        else if (editarUsuario) {
            try {
                await EditarUsuario(editarUsuario.idUsuario, editarUsuario);
                onClose();
                consultarListaUsuarios();
            } catch (e: any) {
                console.error(e);
            }
        }
    };


    useEffect(() => {
        consultarListaUsuarios()
    }, [])


    return (
        <>
            <div className="flex items-center">
                <h1 className="font-bold text-2xl p-8" ><i className="fa-solid fa-user mr-2"></i>Usuarios</h1>
            </div>
            <div className="bg-white rounded px-8 pt-6 pb-8 mb-4">
                <div className='overflow-x-auto'>
                    <table className='min-w-full bg-white'>
                        <thead>
                            <tr className="text-left font-semibold text-base text-gray-700">
                                <th>Id</th>
                                <th>Nombre Completo</th>
                                <th>Usuario</th>
                                <th>Correo</th>
                                <th>Tipo Usuario</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {usuarios && usuarios?.length > 0 ? (
                                usuarios.map((row: IUsuario, i) => {
                                    return <RenderRow key={`${Math.random()}-${i}`} i={i} item={row} onEdit={handleEditarUsuario} />
                                })
                            ) : (
                                <tr>
                                    <td colSpan={7}>
                                        <div className='flex text-center w-full items-center justify-center mt-9 font-medium text-gray-400'>
                                            No se encontraron registros
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {onClose && (
                        <>
                            <ModalHeader>Editar Usuario</ModalHeader>
                            <ModalBody>
                                <Input
                                    label="Nombre Completo:"
                                    placeholder="Nombre Completo"
                                    value={editarUsuario?.nombreCompleto}
                                    onChange={(e) => setEditarUsuario({ ...editarUsuario!, nombreCompleto: e.target.value })}
                                />
                                <Input
                                    label="Nombre de Usuario:"
                                    placeholder="Nombre de Usuario"
                                    value={editarUsuario?.nombreUsuario}
                                    onChange={(e) => setEditarUsuario({ ...editarUsuario!, nombreUsuario: e.target.value })}
                                />
                                <Input
                                    label="Correo:"
                                    placeholder="Correo"
                                    value={editarUsuario?.correo}
                                    onChange={(e) => setEditarUsuario({ ...editarUsuario!, correo: e.target.value })}
                                />
                                <Select
                                    label="Tipo de usuario"
                                    placeholder={editarUsuario?.tipoUsuario}
                                    value={editarUsuario?.tipoUsuario}
                                    onChange={(e) => setEditarUsuario({ ...editarUsuario!, tipoUsuario: e.target.value })}
                                >
                                    {["Administrador", "Gerente", "Testing", "Reportes"].map((tipo) => (
                                        <SelectItem key={tipo} value={tipo}>
                                            {tipo}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="default" variant='flat' onPress={onClose}>Cerrar</Button>
                                <Button type="button" color="primary" onPress={() => handleEditarUsuario()}>Guardar cambios</Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export { Usuarios }