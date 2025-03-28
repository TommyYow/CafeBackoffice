using CafeBackoffice.Application.Common.Models;

namespace CafeBackoffice.Application.Queries.Cafe.GetCafesForEmployeeSelect
{
    public class GetCafesForEmployeeSelectQueryVm : HandlerStatus
    {
        public IEnumerable<IdName<Guid>> Data { get; set; } = [];
    }
}