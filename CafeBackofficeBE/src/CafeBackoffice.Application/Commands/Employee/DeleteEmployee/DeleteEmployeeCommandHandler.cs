using CafeBackoffice.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace CafeBackoffice.Application.Commands.Employee.DeleteEmployee
{
    public class DeleteEmployeeCommandHandler : IRequestHandler<DeleteEmployeeCommand, DeleteEmployeeCommandVm>
    {
        private readonly IAppDbContext _context;

        public DeleteEmployeeCommandHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<DeleteEmployeeCommandVm> Handle(DeleteEmployeeCommand request, CancellationToken cancellationToken)
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

                employee.IsDeleted = true;
                employee.UpdatedAt = DateTime.Now;

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
