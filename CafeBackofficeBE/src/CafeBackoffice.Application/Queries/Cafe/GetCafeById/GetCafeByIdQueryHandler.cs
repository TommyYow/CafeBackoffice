using CafeBackoffice.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace CafeBackoffice.Application.Queries.Cafe.GetCafeById
{
    public class GetCafeByIdQueryHandler : IRequestHandler<GetCafeByIdQuery, GetCafeByIdQueryVm>
    {
        private readonly IAppDbContext _context;

        public GetCafeByIdQueryHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<GetCafeByIdQueryVm> Handle(GetCafeByIdQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var cafe = await _context.Cafes
                    .FirstOrDefaultAsync(c => c.Id == request.Id && !c.IsDeleted, cancellationToken);

                if (cafe == null)
                {
                    return new()
                    {
                        StatusCode = (int)HttpStatusCode.NotFound,
                        StatusMessage = "Not Found"
                    };
                }

                return new()
                {
                    Data = new CafeDetail()
                    {
                        Id = cafe.Id,
                        Name = cafe.Name,
                        Description = cafe.Description,
                        Location = cafe.Location
                    },
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