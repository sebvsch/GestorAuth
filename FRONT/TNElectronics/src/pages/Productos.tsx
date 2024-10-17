import { FC, useEffect, useState } from "react";
import { IProductos } from "../Interfaces/General";
import { obtenerProductos } from "../services/ProductoService";
import { Button } from "@nextui-org/react";
import { DropdownActionWithModal } from "../Components/DropdownActionWithModal";
import { format } from "@formkit/tempo"

type RenderRowProps = {
    item: IProductos;
    i: number;
}

const RenderRow = ({ item, i }: RenderRowProps) => {

    const campos = [
        {
            label: "ID Producto",
            placeholder: "ID",
            defaultValue: item.id,
            disabled: true
        },
        {
            label: "Nombre producto",
            placeholder: "Nombre producto",
            defaultValue: item.nombre,
            disabled: false
        },
        {
            label: "Descripcion",
            placeholder: "Descripcion",
            defaultValue: item.descripcion,
            disabled: false
        },
        {
            label: "Precio producto",
            placeholder: "Precio producto",
            defaultValue: item.precio,
            disabled: false
        }
    ];

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
                        <DropdownActionWithModal
                            campos={campos}
                        />
                    </div>
                </div>
            </td>
        </tr>
    );
}


const Productos: FC = () => {

    const [productos, setProductos] = useState<Array<IProductos> | null>(null)

    const consultarListaProductos = async () => {
        await obtenerProductos().then(respuesta => {
            setProductos(respuesta as Array<IProductos>)
        })
    }

    useEffect(() => {
        consultarListaProductos()
    }, [])

    return (
        <>
            <div className="flex items-center">
                <h1 className="font-bold text-2xl p-8" ><i className="fa-solid fa-box mr-2"></i>Pruductos</h1>
                <Button color="success" radius="full" className="text-base font-semibold text-white"><i className="fa-solid fa-table"></i>Exportar</Button>
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

export { Productos }