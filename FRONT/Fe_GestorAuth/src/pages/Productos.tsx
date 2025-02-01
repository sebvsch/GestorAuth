import { FC, useEffect, useState } from "react";
import { IAgregarProductos, IEditarProducto, IProductos } from "../Interfaces/General";
import { agregarNuevoProducto, EditarProducto, EliminarProducto, obtenerProductos } from "../services/ProductoService";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure } from "@nextui-org/react";
import { DropdownAction } from "../Components/DropdownAction";
import { format } from "@formkit/tempo"
import * as XLSX from 'xlsx'
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { ModalAdd } from "../Components/ModalAdd";

type RenderRowProps = {
    item: IProductos;
    i: number;
    onEdit: (usuario: IProductos) => void;
    onDelate: (id: number) => void;
}

const RenderRow = ({ item, i, onEdit, onDelate }: RenderRowProps) => {

    return (
        <tr key={`row-${i}-${Math.random()}`} className="font-medium text-gray-500 text-sm">
            <td className="text-left py-2 min-w-[150px]">
                <div className='flex items-center'>
                    <div className='flex flex-col'>
                        {item.idProducto}
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
                        {item.cantidad}
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
                        <DropdownAction
                            onOpen={() => onEdit(item)}
                            onDelete={() => onDelate(item.idProducto)}
                        />
                    </div>
                </div>
            </td>
        </tr>
    );
}


const Productos: FC = () => {

    const [productos, setProductos] = useState<Array<IProductos> | null>(null)
    const [editarProducto, setEditarProducto] = useState<IEditarProducto | null>(null);
    const [buscarProducto, setbuscarProducto] = useState<string>("")
    const [agregarProducto, setAgregarProducto] = useState<IAgregarProductos>({
        nombre: "",
        descripcion: "",
        precio: 0,
        cantidad: 0
    });
    const { isOpen: isOpenEdit, onOpen: onOpenEdit, onOpenChange: onOpenChangeEdit, onClose: onCloseEdit } = useDisclosure();
    const { isOpen: isOpenAdd, onOpen: onOpenAdd, onOpenChange: onOpenChangeAdd, onClose: onCloseAdd } = useDisclosure();

    const consultarListaProductos = async () => {
        await obtenerProductos().then(respuesta => {
            setProductos(respuesta as Array<IProductos>)
        })
    }

    const handleAgregarProducto = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = {
            nombre: agregarProducto.nombre,
            descripcion: agregarProducto.descripcion,
            precio: agregarProducto.precio,
            cantidad: agregarProducto.cantidad
        }
        try {
            await agregarNuevoProducto(data)
            onCloseAdd()
            consultarListaProductos();
            setAgregarProducto({
                nombre: "",
                descripcion: "",
                precio: 0,
                cantidad: 0
            })
        } catch (e: any) {
            console.log(e)
        }
    }

    const handleEditarProducto = async (producto?: IEditarProducto) => {
        if (producto) {
            setEditarProducto(producto)
            onOpenEdit();
        }
        else if (editarProducto) {
            try {
                await EditarProducto(editarProducto.idProducto, editarProducto);
                onCloseEdit();
                consultarListaProductos();
            } catch (e: any) {
                console.error(e);
            }
        }
    };

    const handleEliminarProducto = async (id: number) => {
        try {
            const result = await Swal.fire({
                title: "Eliminar producto",
                text: "¿Estás seguro que deseas eliminar este producto?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3B82F6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Eliminar",
                cancelButtonText: "Cancelar"
            });

            if (result.isConfirmed) {
                await EliminarProducto(id);
                await toast.success("El producto fue eliminado con exito", {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    className: "text-sm font-bold"
                });
                consultarListaProductos();
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "No se pudo eliminar el producto",
                icon: "error"
            });
        }
    };

    const exportarProductosExcel = () => {
        if (!productos || productos.length === 0) {
            alert("No hay datos para exportar");
            return;
        }
        const datosParaExportar = productos.map(producto => ({
            ID: producto.idProducto,
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

    const campos = [
        {
            label: "Nombre del Producto",
            placeholder: "Nombre del Producto",
            value: agregarProducto.nombre,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setAgregarProducto({ ...agregarProducto, nombre: e.target.value })
        },
        {
            label: "Descripción",
            placeholder: "Descripción",
            value: agregarProducto.descripcion,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setAgregarProducto({ ...agregarProducto, descripcion: e.target.value })
        },
        {
            label: "Precio",
            placeholder: "Precio",
            value: agregarProducto?.precio ? agregarProducto.precio.toString() : '',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setAgregarProducto({ ...agregarProducto, precio: parseFloat(e.target.value) }),
            startContent: "$"
        },
        {
            label: "Cantidad",
            placeholder: "Cantidad",
            value: agregarProducto?.cantidad ? agregarProducto.cantidad.toString() : '',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setAgregarProducto({ ...agregarProducto, cantidad: parseInt(e.target.value, 10) }),
        }
    ]

    const productosFiltrados = productos?.filter(producto =>
        producto.nombre.toLowerCase().includes(buscarProducto.toLowerCase()) ||
        producto.descripcion.toLowerCase().includes(buscarProducto.toLowerCase()) ||
        producto.precio.toString().toLowerCase().includes(buscarProducto.toLowerCase())
    );

    useEffect(() => {
        consultarListaProductos()
    }, [])

    return (
        <>
            <div className="flex items-center gap-2">
                <h1 className="font-bold text-2xl p-8" ><i className="fa-solid fa-box mr-2"></i>Pruductos</h1>
                <Button color="success" radius="full" className="text-base font-semibold text-white" onClick={exportarProductosExcel}><i className="fa-solid fa-table"></i>Exportar</Button>
                <Button color="primary" radius="full" className="text-base font-semibold text-white" onClick={onOpenAdd}><i className="fa-solid fa-plus"></i>Agragar producto</Button>
                <ModalAdd
                    titulo="Producto"
                    isOpen={isOpenAdd}
                    onOpenChange={onOpenChangeAdd}
                    onClose={() => {
                        onCloseAdd();
                        setAgregarProducto({
                            nombre: "",
                            descripcion: "",
                            precio: 0,
                            cantidad: 0
                        })
                    }}
                    campos={campos}
                    onSubmit={handleAgregarProducto}

                />
                <Input
                    value={buscarProducto}
                    color="default"
                    className="w-auto border border-gray-200 rounded-full shadow-sm"
                    placeholder="Buscar un producto"
                    radius="full"
                    startContent={<i className="fa-solid fa-magnifying-glass text-xs"></i>}
                    onChange={(e) => setbuscarProducto(e.target.value)}
                >
                </Input>
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
                                <th>Cantidad</th>
                                <th>Fecha de creacion</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {productosFiltrados && productosFiltrados?.length > 0 ? (
                                productosFiltrados.map((row: IProductos, i) => {
                                    return <RenderRow key={`${Math.random()}-${i}`} i={i} item={row} onEdit={handleEditarProducto} onDelate={handleEliminarProducto} />
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
            <Modal isOpen={isOpenEdit} onOpenChange={onOpenChangeEdit}>
                <ModalContent>
                    {onCloseEdit && (
                        <>
                            <ModalHeader>Editar Producto</ModalHeader>
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
                                    startContent={
                                        <div className="pointer-events-none flex items-center">
                                            <span className="text-default-400 text-small">$</span>
                                        </div>
                                    }
                                    value={editarProducto?.precio ? editarProducto.precio.toString() : ''}
                                    onChange={(e) => setEditarProducto({ ...editarProducto!, precio: parseFloat(e.target.value) })}
                                />
                                <Input
                                    label="Cantidad:"
                                    placeholder="Cantidad"
                                    type="number"
                                    value={editarProducto?.cantidad ? editarProducto.cantidad.toString() : ''}
                                    onChange={(e) => setEditarProducto({ ...editarProducto!, cantidad: parseInt(e.target.value, 10) })}
                                />

                            </ModalBody>
                            <ModalFooter>
                                <Button color="default" variant='flat' onPress={onCloseEdit}>Cerrar</Button>
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