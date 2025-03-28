using CafeBackoffice.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace CafeBackoffice.Application.Queries.Employee.GetEmployees
{
    public class GetEmployeesQueryHandler : IRequestHandler<GetEmployeesQuery, GetEmployeesQueryVm>
    {
        private readonly IAppDbContext _context;

        public GetEmployeesQueryHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<GetEmployeesQueryVm> Handle(GetEmployeesQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var data = await _context.Employees
                    .Include(x => x.Cafe)
                    .Where(x => (request.CafeId == null || (x.CafeId != null && x.CafeId == request.CafeId)) && !x.IsDeleted)
                    .Select(x => new Employee()
                    {
                        Id = x.Id,
                        Name = x.Name,
                        EmailAddress = x.EmailAddress,
                        PhoneNumber = x.PhoneNumber,
                        DaysWorked = x.CafeStartDate.HasValue ? (DateTime.Now.Date - ((DateTime)x.CafeStartDate).Date).TotalDays : null,
                        Cafe = x.Cafe != null ? new Common.Models.IdName<Guid>() { Id = x.Cafe.Id, Name = x.Cafe.Name } : null
                    })
                    .OrderByDescending(x => x.DaysWorked)
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