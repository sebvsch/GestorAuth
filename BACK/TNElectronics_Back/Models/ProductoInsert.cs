using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace TNElectronics_Back.Models
{
    public class ProductoInsert
    {
        [Required]
        [StringLength(50)]
        public string Nombre { get; set; } = string.Empty;

        [Required]
        [Column(TypeName = "money")]
        public decimal Precio { get; set; }
        [Required]
        [StringLength(100)]
        public string Descripcion { get; set; } = string.Empty;
    }
}