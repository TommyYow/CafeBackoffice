using CafeBackoffice.Domain.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CafeBackoffice.Domain.Entities
{
    [Table("t_cafe")]
    public class Cafe : AuditableEntity
    {
        [Key]
        [Column("id")]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(10)]
        [Column("name")]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(256)]
        [Column("description")]
        public string Description { get; set; } = string.Empty;

        [Required]
        [MaxLength(10)]
        [Column("location")]
        public string Location { get; set; } = string.Empty;

        public ICollection<Employee> Employees { get; set; } = [];
    }
}