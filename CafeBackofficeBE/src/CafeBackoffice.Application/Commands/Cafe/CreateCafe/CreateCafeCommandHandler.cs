using CafeBackoffice.Application.Common.Interfaces;
using MediatR;
using System.Net;

namespace CafeBackoffice.Application.Commands.Cafe.CreateCafe
{
    public class CreateCafeCommandHandler : IRequestHandler<CreateCafeCommand, CreateCafeCommandVm>
    {
        private readonly IAppDbContext _context;

        public CreateCafeCommandHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<CreateCafeCommandVm> Handle(CreateCafeCommand request, CancellationToken cancellationToken)
        {
            try
            {
                _context.Cafes.Add(new Domain.Entities.Cafe()
                {
                    Name = request.Name,
                    Description = request.Description,
                    Location = request.Location
                });

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