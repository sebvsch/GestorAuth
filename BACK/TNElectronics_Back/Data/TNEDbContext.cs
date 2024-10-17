using Microsoft.EntityFrameworkCore;
using TNElectronics_Back.Models;

namespace TNElectronics_Back.Data
{
    public class TNEDbContext : DbContext
    {
        public TNEDbContext(DbContextOptions<TNEDbContext> options)
            : base(options)
        {
        }

        public DbSet<Producto> Productos { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
    }
}