using CafeBackoffice.Application.Common.Interfaces;
using CafeBackoffice.Application.Common.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace CafeBackoffice.Application.Queries.Cafe.GetCafesForEmployeeSelect
{
    public class GetCafesForEmployeeSelectQueryHandler : IRequestHandler<GetCafesForEmployeeSelectQuery, GetCafesForEmployeeSelectQueryVm>
    {
        private readonly IAppDbContext _context;

        public GetCafesForEmployeeSelectQueryHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<GetCafesForEmployeeSelectQueryVm> Handle(GetCafesForEmployeeSelectQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var data = await _context.Cafes
                    .Where(x => !x.IsDeleted)
                    .Select(x => new IdName<Guid>()
                    {
                        Id = x.Id,
                        Name = x.Name
                    }).ToListAsync(cancellationToken);

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