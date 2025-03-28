using MediatR;
using System.ComponentModel.DataAnnotations;

namespace CafeBackoffice.Application.Queries.Employee.GetEmployeeById
{
    public class GetEmployeeByIdQuery : IRequest<GetEmployeeByIdQueryVm>
    {
        [Required]
        [RegularExpression(@"^UI[a-zA-Z0-9]{7}$", ErrorMessage = "Invalid Employee Id")]
        public string Id { get; set; } = string.Empty;
    }
}
