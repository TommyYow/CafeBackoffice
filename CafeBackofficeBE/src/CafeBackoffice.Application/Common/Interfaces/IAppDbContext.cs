using CafeBackoffice.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CafeBackoffice.Application.Common.Interfaces
{
    public interface IAppDbContext
    {
        public DbSet<Cafe> Cafes { get; set; }
        public DbSet<Employee> Employees { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}