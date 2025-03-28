using CafeBackoffice.Domain.Entities;
using MediatR;
using System.ComponentModel.DataAnnotations;

namespace CafeBackoffice.Application.Commands.Employee.UpdateEmployee
{
    public class UpdateEmployeeCommand : IRequest<UpdateEmployeeCommandVm>
    {
        public string Id { get; set; } = string.Empty;

        [Required]
        [MinLength(6)]
        [MaxLength(10)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [MaxLength(50)]
        public string EmailAddress { get; set; } = string.Empty;

        [Required]
        [RegularExpression(@"^[89]\d{7}$", ErrorMessage = "Phone number must start with 8 or 9 and have 8 digits.")]
        public string PhoneNumber { get; set; } = string.Empty;

        [Required]
        public Gender Gender { get; set; }

        public Guid? CafeId { get; set; }

        public DateTime? CafeStartDate { get; set; }
    }
}