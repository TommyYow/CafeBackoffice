using CafeBackoffice.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace CafeBackoffice.Application.Commands.Cafe.UpdateCafe
{
    public class UpdateCafeCommandHandler : IRequestHandler<UpdateCafeCommand, UpdateCafeCommandVm>
    {
        private readonly IAppDbContext _context;

        public UpdateCafeCommandHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<UpdateCafeCommandVm> Handle(UpdateCafeCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var cafe = await _context.Cafes
                    .FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken);

                if (cafe == null)
                {
                    return new()
                    {
                        StatusCode = (int)HttpStatusCode.NotFound,
                        StatusMessage = "Not Found"
                    };
                }

                cafe.Name = request.Name;
                cafe.Description = request.Description;
                cafe.Location = request.Location;
                cafe.UpdatedAt = DateTime.Now;

                await _context.SaveChangesAsync(cancellationToken);

                return new()
                {
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