using CafeBackoffice.Application.Common.Interfaces;
using CafeBackoffice.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CafeBackoffice.Infrastructure
{
    public class AppDbContext : DbContext, IAppDbContext
    {
        public DbSet<Cafe> Cafes { get; set; }
        public DbSet<Employee> Employees { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure entity mappings
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);

            //modelBuilder.Entity<Cafe>().HasIndex(x => x.Location, "ix_cafe_location");

            base.OnModelCreating(modelBuilder);
        }
    }
}