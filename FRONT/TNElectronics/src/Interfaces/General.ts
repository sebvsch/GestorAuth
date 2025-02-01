export interface IProductos {
    idProducto: number
    nombre: string
    descripcion: string
    precio: number
    cantidad: number
    fechaCreacion: string
}
export interface IEditarProducto {
    idProducto: number
    nombre: string
    descripcion: string
    precio: number
    cantidad: number
}
export interface IAgregarProductos {
    nombre: string
    descripcion: string
    precio: number
    cantidad: number
}