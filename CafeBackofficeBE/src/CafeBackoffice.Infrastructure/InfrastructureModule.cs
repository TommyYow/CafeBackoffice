using Autofac;
using CafeBackoffice.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace CafeBackoffice.Infrastructure
{
    public class InfrastructureModule : Module
    {
        private readonly IConfiguration _configuration;

        public InfrastructureModule(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        protected override void Load(ContainerBuilder builder)
        {
            // Register DbContext
            builder.Register(context =>
            {
                var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();
                optionsBuilder.UseNpgsql(
                    _configuration.GetConnectionString("DefaultConnection"),
                    sqlOptions => sqlOptions.EnableRetryOnFailure(3)
                                           .CommandTimeout(30)
                                           .MigrationsAssembly(typeof(AppDbContext).Assembly.FullName));

                return new AppDbContext(optionsBuilder.Options);
            })
            .AsSelf()
            .As<IAppDbContext>()
            .InstancePerLifetimeScope(); // Scoped lifetime
        }
    }
}
