using Microsoft.EntityFrameworkCore;
using GestorAuth.Models;

namespace GestorAuth.Data
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