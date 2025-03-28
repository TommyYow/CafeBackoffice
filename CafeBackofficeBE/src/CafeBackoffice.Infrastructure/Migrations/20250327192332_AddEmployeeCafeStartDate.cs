using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CafeBackoffice.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddEmployeeCafeStartDate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "cafe_start_date",
                table: "t_employee",
                type: "timestamp without time zone",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "cafe_start_date",
                table: "t_employee");
        }
    }
}
