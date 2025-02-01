using System.ComponentModel.DataAnnotations;

namespace GestorAuth.Models
{
    public class Usuario
    {
        [Key]
        public int IdUsuario { get; set; }
        public string? NombreCompleto { get; set; }
        public string? Correo { get; set; }
        public string? NombreUsuario { get; set; }
        public string? TipoUsuario { get; set; }
        public string? Contrasenia { get; set; }
    }
}