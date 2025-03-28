using CafeBackoffice.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace CafeBackoffice.Application.Queries.Cafe.GetCafes
{
    public class GetCafesQueryHandler : IRequestHandler<GetCafesQuery, GetCafesQueryVm>
    {
        private readonly IAppDbContext _context;

        public GetCafesQueryHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<GetCafesQueryVm> Handle(GetCafesQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var data = await _context.Cafes
                    .Where(x => x.Location.ToLower().Contains((request.Location ?? "").ToLower()) && !x.IsDeleted)
                    .Select(x => new Cafe()
                    {
                        Id = x.Id,
                        Name = x.Name,
                        Description = x.Description,
                        Location = x.Location,
                        Employees = x.Employees.Count(e => e.CafeId.HasValue && e.CafeId == x.Id && !e.IsDeleted)
                    })
                    .OrderByDescending(x => x.Employees)
                    .ToListAsync(cancellationToken);

                return new()
                {
                    Data = data,
                    StatusCode = (int)HttpStatusCode.OK,
                    StatusMessage = "Success"
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());

                return new()
                {
                    StatusCode = (int)HttpStatusCode.BadRequest,
                    StatusMessage = "Error"
                };
            }
        }
    }
}