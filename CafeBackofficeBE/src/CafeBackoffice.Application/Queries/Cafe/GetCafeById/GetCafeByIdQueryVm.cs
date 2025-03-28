using CafeBackoffice.Application.Common.Models;

namespace CafeBackoffice.Application.Queries.Cafe.GetCafeById
{
    public class GetCafeByIdQueryVm : HandlerStatus
    {
        public CafeDetail? Data { get; set; }
    }

    public class CafeDetail
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
    }
}