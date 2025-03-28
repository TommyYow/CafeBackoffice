using System.ComponentModel.DataAnnotations.Schema;

namespace CafeBackoffice.Domain.Common
{
    public class AuditableEntity
    {
        [Column("is_deleted")]
        public bool IsDeleted { get; set; }

        [Column("created_at", TypeName = "timestamp without time zone")]
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        [Column("updated_at", TypeName = "timestamp without time zone")]
        public DateTime? UpdatedAt { get; set; }
    }
}