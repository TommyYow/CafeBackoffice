namespace CafeBackoffice.Application.Common.Models
{
    public class IdName<TKey>
    {
        public TKey Id { get; set; } = default!;
        public string Name { get; set; } = string.Empty;
    }
}
