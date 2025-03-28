using MediatR;
using System.ComponentModel.DataAnnotations;

namespace CafeBackoffice.Application.Commands.Cafe.CreateCafe
{
    public class CreateCafeCommand : IRequest<CreateCafeCommandVm>
    {
        [Required]
        [MinLength(6)]
        [MaxLength(10)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MinLength(1)]
        [MaxLength(256)]
        public string Description { get; set; } = string.Empty;

        [Required]
        [MaxLength(10)]
        public string Location { get; set; } = string.Empty;
    }
}