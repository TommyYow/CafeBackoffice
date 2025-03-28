using MediatR;
using System.ComponentModel.DataAnnotations;

namespace CafeBackoffice.Application.Commands.Employee.DeleteEmployee
{
    public class DeleteEmployeeCommand : IRequest<DeleteEmployeeCommandVm>
    {
        [Required]
        [RegularExpression(@"^UI[a-zA-Z0-9]{7}$", ErrorMessage = "Invalid Employee Id")]
        public string Id { get; set; } = string.Empty;
    }
}
