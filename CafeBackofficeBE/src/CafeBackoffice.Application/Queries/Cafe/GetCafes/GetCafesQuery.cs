using MediatR;

namespace CafeBackoffice.Application.Queries.Cafe.GetCafes
{
    public class GetCafesQuery : IRequest<GetCafesQueryVm>
    {
        public string? Location { get; set; } = string.Empty;
    }
}