namespace TNElectronics_Back.Models.DTOs
{
    public class RegisterDTO
    {
        public string NombreCompleto { get; set; }
        public string Correo { get; set; }
        public string NombreUsuario { get; set; }
        public string Contrasenia { get; set; }
        public string ConfirmarContrasenia { get; set; }
        public string TipoUsuario { get; set; }

    }
}