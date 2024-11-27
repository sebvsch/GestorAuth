import { FC, useEffect, useState } from "react";
import { IProductos } from "../Interfaces/General";
import { EditarProducto, obtenerProductos } from "../services/ProductoService";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure } from "@nextui-org/react";
import { DropdownActionWithModal } from "../Components/DropdownActionWithModal";
import { format } from "@formkit/tempo"
import * as XLSX from 'xlsx'

type RenderRowProps = {
    item: IProductos;
    i: number;
    onEdit: (usuario: IProductos) => void;
}

const RenderRow = ({ item, i, onEdit }: RenderRowProps) => {

    return (
        <tr key={`row-${i}-${Math.random()}`} className="font-medium text-gray-500 text-sm">
            <td className="text-left py-2 min-w-[150px]">
                <div className='flex items-center'>
                    <div className='flex flex-col'>
                        {item.id}
                    </div>
                </div>
            </td>
            <td className="text-left py-2 min-w-[150px]">
                <div className='flex items-center'>
                    <div className='flex flex-col'>
                        {item.nombre}
                    </div>
                </div>
            </td>
            <td className="text-left py-2 min-w-[150px]">
                <div className='flex items-center'>
                    <div className='flex flex-col'>
                        {item.descripcion}
                    </div>
                </div>
            </td>
            <td className="text-left py-2 min-w-[150px]">
                <div className='flex items-center'>
                    <div className='flex flex-col'>
                        {item.precio.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
                    </div>
                </div>
            </td>
            <td className="text-left py-2 min-w-[150px]">
                <div className='flex items-center'>
                    <div className='flex flex-col'>
                        {format(item.fechaCreacion, { date: "medium", time: "medium" })}
                    </div>
                </div>
            </td>
            <td className="text-left py-2 min-w-[150px]">
                <div className='flex items-center'>
                    <div className='flex flex-col'>
                        <DropdownActionWithModal onOpen={() => onEdit(item)} />
                    </div>
                </div>
            </td>
        </tr>
    );
}


const Productos: FC = () => {

    const [productos, setProductos] = useState<Array<IProductos> | null>(null)
    const [editarProducto, setEditarProducto] = useState<IProductos | null>(null);
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const consultarListaProductos = async () => {
        await obtenerProductos().then(respuesta => {
            setProductos(respuesta as Array<IProductos>)
        })
    }

    const handleEditarProducto = async (producto?: IProductos) => {
        if (producto) {
            setEditarProducto(producto)
            onOpen();
        }
        else if (editarProducto) {
            try {
                await EditarProducto(editarProducto.id, editarProducto);
                onClose();
                consultarListaProductos();
            } catch (e: any) {
                console.error(e);
            }
        }
    };

    const exportarProductosExcel = () => {
        if (!productos || productos.length === 0) {
            alert("No hay datos para exportar");
            return;
        }
        const datosParaExportar = productos.map(producto => ({
            ID: producto.id,
            Nombre: producto.nombre,
            Descripción: producto.descripcion,
            Precio: producto.precio,
            'Fecha de Creación': format(producto.fechaCreacion, { date: "medium", time: "medium" })
        }));

        const worksheet = XLSX.utils.json_to_sheet(datosParaExportar);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Productos");

        XLSX.writeFile(workbook, "Productos.xlsx");
    }


    useEffect(() => {
        consultarListaProductos()
    }, [])

    return (
        <>
            <div className="flex items-center">
                <h1 className="font-bold text-2xl p-8" ><i className="fa-solid fa-box mr-2"></i>Pruductos</h1>
                <Button color="success" radius="full" className="text-base font-semibold text-white" onClick={exportarProductosExcel}><i className="fa-solid fa-table"></i>Exportar</Button>
            </div>
            <div className="bg-white rounded px-8 pt-6 pb-8 mb-4">
                <div className='overflow-x-auto'>
                    <table className='min-w-full bg-white'>
                        <thead>
                            <tr className="text-left font-semibold text-base text-gray-700">
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Detalle</th>
                                <th>Precio</th>
                                <th>Fecha de creacion</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {productos && productos?.length > 0 ? (
                                productos.map((row: IProductos, i) => {
                                    return <RenderRow key={`${Math.random()}-${i}`} i={i} item={row} onEdit={handleEditarProducto} />
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
                                    label="Producto"
                                    placeholder="Producto"
                                    value={editarProducto?.nombre}
                                    onChange={(e) => setEditarProducto({ ...editarProducto!, nombre: e.target.value })}
                                />
                                <Textarea
                                    label="Descripción:"
                                    placeholder="Descripción"
                                    value={editarProducto?.descripcion}
                                    onChange={(e) => setEditarProducto({ ...editarProducto!, descripcion: e.target.value })}
                                />
                                <Input
                                    label="Precio:"
                                    placeholder="Precio"
                                    value={editarProducto?.precio ? editarProducto.precio.toString() : ''}
                                    onChange={(e) => setEditarProducto({ ...editarProducto!, precio: parseFloat(e.target.value) })}
                                />

                            </ModalBody>
                            <ModalFooter>
                                <Button color="default" variant='flat' onPress={onClose}>Cerrar</Button>
                                <Button type="button" color="primary" onPress={() => handleEditarProducto()}>Guardar cambios</Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export { Productos }