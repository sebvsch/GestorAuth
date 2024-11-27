import axios, { AxiosResponse } from "axios";
import { IAccesoUsuario, IEditarUsuario, IRegistrarUsuario } from "../Interfaces/IUsuario";
import { toast } from "react-toastify";

const URL_DEV = import.meta.env.VITE_URL

export async function RegistrarUsuario(usuarioData: IRegistrarUsuario) {
    const url = `${URL_DEV}/api/usuario/registrarse`
    try {
        const respuesta: AxiosResponse = await axios.post(url, usuarioData);
        return respuesta.data;
    } catch (error: any) {
        throw error.response;
    }
}

export async function AccesoUsuario(dataAcceso: IAccesoUsuario) {
    const url = `${URL_DEV}/api/usuario/acceder`;
    try {
        const respuesta: AxiosResponse = await axios.post(url, dataAcceso);
        if (respuesta.data.exito) {
            localStorage.setItem('token', respuesta.data.token);
            window.location.reload()
        }
        return respuesta.data;
    } catch (error: any) {
        throw error.response;
    }
}

export async function ObtenerUsuarios() {
    const token = localStorage.getItem("token");
    const url = `${URL_DEV}/api/usuario/obtenerUsuarios`
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

export async function EditarUsuario(id: number, data: IEditarUsuario) {
    const token = localStorage.getItem("token");
    const url = `${URL_DEV}/api/usuario/editarUsuario/${id}`
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
        });;
    } catch (error: any) {
        throw error.response;
    }
}