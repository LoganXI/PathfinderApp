using Microsoft.EntityFrameworkCore;
using PathfinderApp.Server.Models;
using System.Collections.Generic;

namespace PathfinderApp.Data
{
    public class PathfinderContext : DbContext
    {
        public PathfinderContext(DbContextOptions<PathfinderContext> options) : base(options) { }

        public DbSet<Utente> Utenti { get; set; }
        public DbSet<Personaggio> Personaggi { get; set; }
    }
}
