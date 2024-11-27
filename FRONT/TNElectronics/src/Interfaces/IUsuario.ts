export interface IRegistrarUsuario {
    nombreCompleto: string;
    correo: string;
    nombreUsuario: string;
    contrasenia: string;
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
    tipoUsuario: "Administrador" | "Gerente" | "Testing" | "Reportes" | string
}

export interface IEditarUsuario {
    idUsuario: number;
    nombreCompleto: string;
    correo: string;
    nombreUsuario: string;
    tipoUsuario: "Administrador" | "Gerente" | "Testing" | "Reportes" | string
}
