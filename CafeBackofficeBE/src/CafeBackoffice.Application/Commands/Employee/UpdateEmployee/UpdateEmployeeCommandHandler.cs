using CafeBackoffice.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace CafeBackoffice.Application.Commands.Employee.UpdateEmployee
{
    public class UpdateEmployeeCommandHandler : IRequestHandler<UpdateEmployeeCommand, UpdateEmployeeCommandVm>
    {
        private readonly IAppDbContext _context;

        public UpdateEmployeeCommandHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<UpdateEmployeeCommandVm> Handle(UpdateEmployeeCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var employee = await _context.Employees
                    .FirstOrDefaultAsync(e => e.Id == request.Id && !e.IsDeleted, cancellationToken);

                if (employee == null)
                {
                    return new()
                    {
                        StatusCode = (int)HttpStatusCode.NotFound,
                        StatusMessage = "Not Found"
                    };
                }

                employee.Name = request.Name;
                employee.EmailAddress = request.EmailAddress;
                employee.PhoneNumber = request.PhoneNumber;
                employee.Gender = request.Gender;
                employee.CafeId = request.CafeId;
                employee.UpdatedAt = DateTime.Now;
                employee.CafeStartDate = request.CafeStartDate;

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
