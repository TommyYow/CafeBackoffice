using CafeBackoffice.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace CafeBackoffice.Application.Commands.Cafe.DeleteCafe
{
    public class DeleteCafeCommandHandler : IRequestHandler<DeleteCafeCommand, DeleteCafeCommandVm>
    {
        private readonly IAppDbContext _context;

        public DeleteCafeCommandHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<DeleteCafeCommandVm> Handle(DeleteCafeCommand request, CancellationToken cancellationToken)
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

                cafe.IsDeleted = true;
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
