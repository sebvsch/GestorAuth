export interface IRegistrarUsuario {
    nombreCompleto: string;
    correo: string;
    nombreUsuario: string;
    contrasenia: string;
    confirmarContrasenia: string;
    tipoUsuario: string
}

export interface IAccesoUsuario {
    usuarioOCorreo: string;
    contrasenia: string;
}
export interface IUsuario {
    idUsuario: number;
    nombreCompleto: string;
    correo: string;
    nombreUsuario: string;
    contrasenia: string;
    tipoUsuario: "Administrador" | "Gerente" | "Testing" | "Reportes" | "Usuario Nuevo" | string
}
export interface IEditarUsuario {
    idUsuario: number;
    nombreCompleto: string;
    correo: string;
    nombreUsuario: string;
    tipoUsuario: "Administrador" | "Gerente" | "Testing" | "Reportes" | string
}
export interface ICurrentUser {
    idUsuario: number;
    nombreCompleto: string;
    correo: string;
    nombreUsuario: string;
    tipoUsuario: string;
}
