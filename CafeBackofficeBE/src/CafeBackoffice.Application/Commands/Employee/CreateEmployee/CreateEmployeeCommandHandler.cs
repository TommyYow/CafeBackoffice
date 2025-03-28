using CafeBackoffice.Application.Common.Interfaces;
using MediatR;
using System.Net;

namespace CafeBackoffice.Application.Commands.Employee.CreateEmployee
{
    public class CreateEmployeeCommandHandler : IRequestHandler<CreateEmployeeCommand, CreateEmployeeCommandVm>
    {
        private readonly IAppDbContext _context;

        public CreateEmployeeCommandHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<CreateEmployeeCommandVm> Handle(CreateEmployeeCommand request, CancellationToken cancellationToken)
        {
            try
            {
                await _context.Employees.AddAsync(new Domain.Entities.Employee()
                {
                    Id = "UI" + Guid.NewGuid().ToString("N").Substring(0, 7).ToUpper(),
                    Name = request.Name,
                    EmailAddress = request.EmailAddress,
                    PhoneNumber = request.PhoneNumber,
                    Gender = request.Gender,
                    CafeId = request.CafeId,
                    CafeStartDate = request.CafeStartDate
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