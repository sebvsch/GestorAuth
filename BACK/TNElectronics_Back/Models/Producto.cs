using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TNElectronics_Back.Models
{
    public class Producto
    {
        [Key] 
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Nombre { get; set; } = string.Empty;

        [Required]
        [Column(TypeName = "money")]
        public decimal Precio { get; set; }

        [StringLength(100)]
        public string Descripcion { get; set; } = string.Empty;

        [DataType(DataType.DateTime)]
        public DateTime FechaCreacion { get; set; } = DateTime.Now;
    }
}