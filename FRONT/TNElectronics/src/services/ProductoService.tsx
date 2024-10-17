import axios, { AxiosResponse } from "axios";
import { IProductos } from "../Interfaces/General";

const URL_DEV = import.meta.env.VITE_URL

export async function obtenerProductos() {
    const url = `${URL_DEV}/api/producto/obtenerProducto`;
    const token = localStorage.getItem("token");
    try {
        const respuesta: AxiosResponse = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
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
    const url = `http://localhost:5204/api/producto/editarProducto/${id}`
    try {
        const respuesta: AxiosResponse = await axios.put(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return respuesta.data;
    } catch (error: any) {
        throw error.response;
    }
}

export async function EliminarProducto(id: number) {
    const url = `http://localhost:5204/api/producto/eliminarProducto/${id}`
    try {
        const respuesta: AxiosResponse = await axios.delete(url);
        return respuesta.data;
    } catch (error: any) {
        throw error.response;
    }
}