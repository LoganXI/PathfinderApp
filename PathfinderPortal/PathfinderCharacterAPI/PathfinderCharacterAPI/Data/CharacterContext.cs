using Microsoft.EntityFrameworkCore;
using PathfinderCharacterAPI.Models;

namespace PathfinderCharacterAPI.Data
{
    public class CharacterContext : DbContext
    {
        public CharacterContext(DbContextOptions<CharacterContext> options) : base(options) { }

        public DbSet<Character> Characters { get; set; }
        public DbSet<User> Users { get; set; } // Add User table

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Character>().HasData(
            // Existing seed data
            );
        }
    }
}