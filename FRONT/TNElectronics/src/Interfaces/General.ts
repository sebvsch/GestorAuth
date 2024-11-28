export interface IProductos {
    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
    fechaCreacion: string;
}
export interface IAgregarProductos {
    nombre: string;
    precio: number;
    descripcion: string;
}