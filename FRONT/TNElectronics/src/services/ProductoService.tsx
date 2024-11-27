import axios, { AxiosResponse } from "axios";
import { IProductos } from "../Interfaces/General";
import { toast } from "react-toastify";

const URL_DEV = import.meta.env.VITE_URL

export async function obtenerProductos() {
    const url = `${URL_DEV}/api/producto/obtenerProducto`;
    try {
        const respuesta: AxiosResponse = await axios.get(url, {
        });
        return respuesta.data;
    } catch (error: any) {
        throw error.response;
    }
}

export async function obtenerProductosById(id: number) {
    const url = `${URL_DEV}/api/poducto/obtenerProductoById/${id}`
    try {
        const respuesta: AxiosResponse = await axios.get(url);
        return respuesta.data;
    } catch (error: any) {
        throw error.response;
    }
}

export async function agregarNuevoProducto() {
    const url = `${URL_DEV}/api/producto/crearProducto`
    try {
        const respuesta: AxiosResponse = await axios.post(url);
        return respuesta.data;
    } catch (error: any) {
        throw error.response;
    }
}

export async function EditarProducto(id: number, data: IProductos) {
    const token = localStorage.getItem("token");
    const url = `http://localhost:5204/api/producto/editarProducto/${id}`
    try {
        const respuesta: AxiosResponse = await axios.put(url, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return toast.success(respuesta.data.mensaje, {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            className: "text-sm font-bold"
        });
    } catch (error: any) {
        throw error.response;
    }
}

export async function EliminarProducto(id: number) {
    const token = localStorage.getItem("token");
    const url = `http://localhost:5204/api/producto/eliminarProducto/${id}`
    try {
        const respuesta: AxiosResponse = await axios.delete(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return respuesta.data;
    } catch (error: any) {
        throw error.response;
    }
}