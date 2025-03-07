using Microsoft.EntityFrameworkCore;
using Be_GestorAuth.Models;

namespace Be_GestorAuth.Data
{
    public class GAContext : DbContext
    {
        public GAContext(DbContextOptions<GAContext> options)
            : base(options)
        {
        }

        public DbSet<Producto> Productos { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
    }
}