using MediatR;

namespace CafeBackoffice.Application.Commands.Cafe.DeleteCafe
{
    public class DeleteCafeCommand : IRequest<DeleteCafeCommandVm>
    {
        public Guid Id { get; set; }
    }
}
