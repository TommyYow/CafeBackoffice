using CafeBackoffice.Application.Common.Models;
using CafeBackoffice.Domain.Entities;

namespace CafeBackoffice.Application.Queries.Employee.GetEmployeeById
{
    public class GetEmployeeByIdQueryVm : HandlerStatus
    {
        public EmployeeDetail? Data { get; set; }
    }

    public class EmployeeDetail
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string EmailAddress { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public Gender Gender { get; set; }

        public IdName<Guid>? Cafe { get; set; }
        public DateTime? CafeStartDate { get; set; }
    }
}
