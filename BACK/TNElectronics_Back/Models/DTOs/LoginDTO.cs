using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TNElectronics_Back.Models.DTOs
{
    public class LoginDTO
    {
        public string UsuarioOCorreo { get; set; }
        public string Contrasenia { get; set; }
    }
}