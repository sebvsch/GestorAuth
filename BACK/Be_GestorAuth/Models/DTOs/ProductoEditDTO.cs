using System.ComponentModel.DataAnnotations.Schema;

namespace GestorAuth.Models.DTOs
{
    public class ProductoEditDTO
    {
        public string? Nombre { get; set; }

        public string? Descripcion { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal? Precio { get; set; }

        public int? Cantidad { get; set; }
    }
}