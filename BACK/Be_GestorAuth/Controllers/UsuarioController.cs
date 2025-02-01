using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Be_GestorAuth.Data;
using Be_GestorAuth.Models;
using Be_GestorAuth.Models.DTOs;

namespace Be_GestorAuth.Controllers
{
    [ApiController]
    [Route("api/usuario")]
    public class UsuarioController : ControllerBase
    {
        private readonly GAContext _context;

        public UsuarioController(GAContext context)
        {
            _context = context;
        }

        [Authorize(Policy = "TipoUsuario")]
        [Route("obtenerUsuarios")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuarios()
        {
            return await _context.Usuarios.ToListAsync();
        }

        [Authorize(Policy = "TipoUsuario")]
        [Route("editarUsuario/{id}")]
        [HttpPut]
        public async Task<ActionResult<Usuario>> PutUsuarios(int id, UsuarioEditDTO usuarioEditDto)
        {
            if (id <= 0 || usuarioEditDto == null)
                return StatusCode(StatusCodes.Status400BadRequest, new { exito = false, mensaje = "Los datos no fueron completados" });

            var usuarioExistente = await _context.Usuarios.FindAsync(id);
            if (usuarioExistente == null)
                return StatusCode(StatusCodes.Status404NotFound, new { exito = false, mensaje = "El usuario no fue encontrado" });

            usuarioExistente.NombreCompleto = usuarioEditDto.NombreCompleto;
            usuarioExistente.Correo = usuarioEditDto.Correo;
            usuarioExistente.NombreUsuario = usuarioEditDto.NombreUsuario;
            usuarioExistente.TipoUsuario = usuarioEditDto.TipoUsuario;

            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, new { exito = true, mensaje = "Usuario editado correctamente" });

        }
    }
}