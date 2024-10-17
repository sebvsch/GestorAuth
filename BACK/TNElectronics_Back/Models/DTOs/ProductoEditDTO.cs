using System.ComponentModel.DataAnnotations.Schema;

namespace TNElectronics_Back.Models.DTOs
{
    public class ProductoEditDTO
    {
        public string? Nombre { get; set; }

        [Column(TypeName = "money")]
        public decimal? Precio { get; set; }
        public string? Descripcion { get; set; }
    }
}