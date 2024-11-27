using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TNElectronics_Back.Data;
using TNElectronics_Back.Models;
using TNElectronics_Back.Models.DTOs;


namespace TNElectronics_Back.Controllers
{
    [ApiController]
    [Route("api/producto")]
    public class ProductoController : ControllerBase
    {
        private readonly TNEDbContext _context;

        public ProductoController(TNEDbContext context)
        {
            _context = context;
        }

        [Route("obtenerProducto")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Producto>>> GetProductos()
        {
            return await _context.Productos.ToListAsync();
        }

        [Route("obtenerProductoById/{id}")]
        [HttpGet]
        public async Task<ActionResult<Producto>> GetProductoById(int id)
        {
            var producto = await _context.Productos.FirstOrDefaultAsync(x => x.Id == id);

            if (producto == null)
            {
                return NotFound();
            }
            return Ok(producto);

        }

        [Authorize(Policy = "TipoUsuario")]
        [Route("crearProducto")]
        [HttpPost]
        public async Task<ActionResult<Producto>> PostProducto(ProductoInsert productoInsert)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var producto = new Producto
            {
                Nombre = productoInsert.Nombre,
                Precio = productoInsert.Precio,
                Descripcion = productoInsert.Descripcion,
            };

            _context.Productos.Add(producto);

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProductos), new { id = producto.Id }, producto);

        }

        [Authorize(Policy = "TipoUsuario")]
        [Route("editarProducto/{id}")]
        [HttpPut]
        public async Task<ActionResult<Producto>> PutProducto(int id, ProductoEditDTO productoDto)
        {
            if (id <= 0 || productoDto == null)
                return StatusCode(StatusCodes.Status400BadRequest, new { exito = false, mensaje = "Los datos no fueron completados" });

            var productoExistente = _context.Productos.Find(id);
            if (productoExistente == null)
                return StatusCode(StatusCodes.Status404NotFound, new { exito = false, mensaje = "El producto no fue encontrado" });

            if (productoDto.Nombre != null)
                productoExistente.Nombre = productoDto.Nombre;


            if (productoDto.Precio.HasValue)
                productoExistente.Precio = productoDto.Precio.Value;

            if (productoDto.Descripcion != null)
                productoExistente.Descripcion = productoDto.Descripcion;

            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, new { exito = true, mensaje = "Producto editado correctamente" });
        }

        [Authorize(Policy = "TipoUsuario")]
        [Route("eliminarProducto/{id}")]
        [HttpDelete]
        public async Task<ActionResult<Producto>> DelateProducto(int id)
        {
            var productosExistentes = _context.Productos.Find(id);
            if (productosExistentes is null)
                return NotFound();

            _context.Productos.Remove(productosExistentes);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}