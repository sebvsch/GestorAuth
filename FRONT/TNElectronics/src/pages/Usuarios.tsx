import { FC, useEffect, useState } from "react";
import { IEditarUsuario, IUsuario } from "../Interfaces/IUsuario";
import { EditarUsuario, ObtenerUsuarios } from "../services/UsuarioServices";
import { DropdownActionWithModal } from "../Components/DropdownActionWithModal";
import { useDisclosure } from "@nextui-org/react";

type RenderRowProps = {
    item: IUsuario;
    i: number;
}

const RenderRow = ({ item, i, }: RenderRowProps) => {

    const [editarUsuario, setEditarUsuario] = useState<IEditarUsuario>({
        nombreCompleto: item.nombreCompleto,
        correo: item.correo,
        nombreUsuario: item.nombreUsuario,
        tipoUsuario: item.tipoUsuario
    })

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();


    const editarUser = async () => {
        try {
            await EditarUsuario(item.idUsuario, editarUsuario);
        } catch (e: any) {
            console.log(e);
        }
    };

    const handleEditar = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await editarUser();
        } catch (e: any) {
            console.log(e);
        }
    };

    const campos = [
        {
            label: "ID Usuario:",
            placeholder: "ID",
            defaultValue: item.idUsuario,
            value: item.idUsuario,
            disabled: true,
        },
        {
            label: "Nombre Completo:",
            placeholder: "Nombre Completo",
            value: editarUsuario.nombreCompleto,
            defaultValue: editarUsuario.nombreCompleto,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEditarUsuario({ ...editarUsuario, nombreCompleto: e.target.value }),
            disabled: false,
        },
        {
            label: "Nombre de Usuario:",
            placeholder: "Nombre de Usuario",
            value: editarUsuario.nombreUsuario,
            defaultValue: editarUsuario.nombreUsuario,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEditarUsuario({ ...editarUsuario, nombreUsuario: e.target.value }),
            disabled: false,
        },
        {
            label: "Correo:",
            placeholder: "Correo",
            value: editarUsuario.correo,
            defaultValue: editarUsuario.correo,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEditarUsuario({ ...editarUsuario, correo: e.target.value }),
            disabled: false,
        },
        {
            label: "Tipo Usuario:",
            placeholder: "Tipo Usuario",
            value: editarUsuario.tipoUsuario,
            defaultValue: editarUsuario.tipoUsuario,
            disabled: true,
        }
    ];

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
                        <DropdownActionWithModal
                            campos={campos}
                            onSubmit={handleEditar}
                            onOpen={onOpen}
                            isOpen={isOpen}
                            onClose={onClose}
                            onOpenChange={onOpenChange}
                        />
                    </div>
                </div>
            </td>
        </tr>
    );
}

const Usuarios: FC = () => {

    const [usuarios, setUsuarios] = useState<Array<IUsuario> | null>(null)

    const consultarListaUsuarios = async () => {
        await ObtenerUsuarios().then(respuesta => {
            setUsuarios(respuesta as Array<IUsuario>)
        })
    }

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
                                    return <RenderRow key={`${Math.random()}-${i}`} i={i} item={row} />
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
        </>
    )
}

export { Usuarios }