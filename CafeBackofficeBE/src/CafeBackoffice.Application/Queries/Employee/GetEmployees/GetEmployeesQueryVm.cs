using CafeBackoffice.Application.Common.Models;

namespace CafeBackoffice.Application.Queries.Employee.GetEmployees
{
    public class GetEmployeesQueryVm : HandlerStatus
    {
        public IEnumerable<Employee> Data { get; set; } = [];
    }

    public class Employee
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string EmailAddress { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public double? DaysWorked { get; set; }

        public IdName<Guid>? Cafe { get; set; }
    }
}