using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using TNElectronics_Back.Custom;
using TNElectronics_Back.Models;
using TNElectronics_Back.Models.DTOs;
using TNElectronics_Back.Data;


namespace TNElectronics_Back.Controllers
{
    [Route("api/usuario")]
    [AllowAnonymous]
    [ApiController]
    public class AccesoController : Controller
    {
        private readonly TNEDbContext _context;
        private readonly Utilidades _utilidades;

        public AccesoController(TNEDbContext context, Utilidades utilidades)
        {
            _context = context;
            _utilidades = utilidades;
        }

        [HttpPost]
        [Route("registrarse")]
        public async Task<IActionResult> Registrarse(UsuarioDTO usuario)
        {
            var usuarioModel = new Usuario
            {
                NombreCompleto = usuario.NombreCompleto,
                Correo = usuario.Correo,
                NombreUsuario = usuario.NombreUsuario,
                Contrasenia = _utilidades.encriptarSHA256(usuario.Contrasenia)
            };

            await _context.Usuarios.AddAsync(usuarioModel);
            await _context.SaveChangesAsync();

            if (usuarioModel.IdUsuario != 0)
                return StatusCode(StatusCodes.Status200OK, new { isSuccess = true });
            else
                return StatusCode(StatusCodes.Status200OK, new { isSuccess = false });
        }

        [HttpPost]
        [Route("acceder")]
        public async Task<IActionResult> Acceder(LoginDTO usuario)
        {
            var usarioRegistrado = await _context.Usuarios
                                    .FirstOrDefaultAsync(user =>
                                    user.Correo == usuario.UsuarioOCorreo ||
                                    user.NombreUsuario == usuario.UsuarioOCorreo &&
                                    user.Contrasenia == _utilidades.encriptarSHA256(usuario.Contrasenia)
                                    );
            if (usarioRegistrado == null)
                return StatusCode(StatusCodes.Status400BadRequest, new { exito = false, mensaje = $"No existe usuario registrado con el usuario o correo: {usuario.UsuarioOCorreo}" });
            else
                return StatusCode(StatusCodes.Status200OK, new { exito = true, token = _utilidades.generarJWT(usarioRegistrado) });
        }
    }
}