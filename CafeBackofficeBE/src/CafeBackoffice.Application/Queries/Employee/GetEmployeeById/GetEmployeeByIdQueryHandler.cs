using CafeBackoffice.Application.Common.Interfaces;
using CafeBackoffice.Application.Common.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace CafeBackoffice.Application.Queries.Employee.GetEmployeeById
{
    public class GetEmployeeByIdQueryHandler : IRequestHandler<GetEmployeeByIdQuery, GetEmployeeByIdQueryVm>
    {
        private readonly IAppDbContext _context;

        public GetEmployeeByIdQueryHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<GetEmployeeByIdQueryVm> Handle(GetEmployeeByIdQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var employee = await _context.Employees
                    .Include(x => x.Cafe)
                    .FirstOrDefaultAsync(c => c.Id == request.Id && !c.IsDeleted, cancellationToken);

                if (employee == null)
                {
                    return new()
                    {
                        StatusCode = (int)HttpStatusCode.NotFound,
                        StatusMessage = "Not Found"
                    };
                }

                return new()
                {
                    Data = new EmployeeDetail()
                    {
                        Id = employee.Id,
                        Name = employee.Name,
                        EmailAddress = employee.EmailAddress,
                        PhoneNumber = employee.PhoneNumber,
                        Gender = employee.Gender,
                        Cafe = employee.Cafe == null ? null : new IdName<Guid>() { Id = employee.Cafe.Id, Name = employee.Name },
                        CafeStartDate = employee.CafeStartDate
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
