using CafeBackoffice.Domain.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CafeBackoffice.Domain.Entities
{
    [Table("t_employee")]
    public class Employee : AuditableEntity
    {
        [Key]
        [Required]
        [MaxLength(9)]
        [Column("id")]
        public string Id { get; set; } = string.Empty;

        [Required]
        [MaxLength(10)]
        [Column("name")]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        [Column("email_address")]
        public string EmailAddress { get; set; } = string.Empty;

        [Required]
        [MaxLength(8)]
        [Column("phone_number")]
        public string PhoneNumber { get; set; } = string.Empty;

        [Required]
        [Column("gender")]
        public Gender Gender { get; set; }

        [ForeignKey("Cafe")]
        [Column("cafe_id")]
        public Guid? CafeId { get; set; }

        public Cafe? Cafe { get; set; }

        [Column("cafe_start_date", TypeName = "timestamp without time zone")]
        public DateTime? CafeStartDate { get; set; }
    }

    public enum Gender
    {
        Male,
        Female
    }
}