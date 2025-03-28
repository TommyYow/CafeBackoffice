using MediatR;

namespace CafeBackoffice.Application.Queries.Cafe.GetCafeById
{
    public class GetCafeByIdQuery : IRequest<GetCafeByIdQueryVm>
    {
        public Guid Id { get; set; }
    }
} 