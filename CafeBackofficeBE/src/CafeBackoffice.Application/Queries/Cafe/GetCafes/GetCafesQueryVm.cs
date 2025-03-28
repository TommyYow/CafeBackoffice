using CafeBackoffice.Application.Common.Models;

namespace CafeBackoffice.Application.Queries.Cafe.GetCafes
{
    public class GetCafesQueryVm : HandlerStatus
    {
        public IEnumerable<Cafe> Data { get; set; } = [];
    }

    public class Cafe
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public int Employees { get; set; }
    }
}