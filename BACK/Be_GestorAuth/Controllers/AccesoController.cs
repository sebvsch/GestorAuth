using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Be_GestorAuth.Custom;
using Be_GestorAuth.Models;
using Be_GestorAuth.Models.DTOs;
using Be_GestorAuth.Data;
using System.Security.Claims;


namespace Be_GestorAuth.Controllers
{
    [Route("api/usuario")]
    [AllowAnonymous]
    [ApiController]
    public class AccesoController : Controller
    {
        private readonly GAContext _context;
        private readonly Utilidades _utilidades;

        public AccesoController(GAContext context, Utilidades utilidades)
        {
            _context = context;
            _utilidades = utilidades;
        }

        [HttpPost]
        [Route("registrarse")]
        public async Task<IActionResult> Registrarse(RegisterDTO usuario)
        {
            if (usuario.Contrasenia != usuario.ConfirmarContrasenia)
            {
                return BadRequest(new { exito = false, mensaje = "Las contraseñas no coinciden." });
            }

            var usuarioModel = new Usuario
            {
                NombreCompleto = usuario.NombreCompleto,
                Correo = usuario.Correo,
                NombreUsuario = usuario.NombreUsuario,
                Contrasenia = _utilidades.encriptarSHA256(usuario.Contrasenia),
                TipoUsuario = "Usuario Nuevo"
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
            var usuarioRegistrado = await _context.Usuarios
                        .FirstOrDefaultAsync(user =>
                         (user.Correo == usuario.UsuarioOCorreo || user.NombreUsuario == usuario.UsuarioOCorreo) &&
                          user.Contrasenia == _utilidades.encriptarSHA256(usuario.Contrasenia)
                         );
            if (usuarioRegistrado == null)
                return StatusCode(StatusCodes.Status400BadRequest, new { exito = false, mensaje = $"No existe usuario registrado con el usuario o correo: {usuario.UsuarioOCorreo}" });
            else
                return StatusCode(StatusCodes.Status200OK, new { exito = true, token = _utilidades.generarJWT(usuarioRegistrado) });
        }

        [HttpGet]
        // [Authorize(Policy = "TipoUsuario")]
        [Route("currentUser")]
        public IActionResult GetCurrentUser()
        {

            if (User.Identity == null || !User.Identity.IsAuthenticated)
            {
                return Unauthorized(new { mensaje = "Usuario no autenticado" });
            }


            var nombreCompleto = User.FindFirst(ClaimTypes.Name)?.Value;
            var correo = User.FindFirst(ClaimTypes.Email)?.Value;
            var nombreUsuario = User.FindFirst("NombreUsuario")?.Value;
            var tipoUsuario = User.FindFirst("TipoUsuario")?.Value;


            return Ok(new
            {
                nombreCompleto,
                correo,
                nombreUsuario,
                tipoUsuario
            });
        }

    }
}
