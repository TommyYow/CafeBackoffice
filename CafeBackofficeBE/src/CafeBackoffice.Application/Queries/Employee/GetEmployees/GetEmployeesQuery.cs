using MediatR;

namespace CafeBackoffice.Application.Queries.Employee.GetEmployees
{
    public class GetEmployeesQuery : IRequest<GetEmployeesQueryVm>
    {
        public Guid? CafeId { get; set; }
    }
}