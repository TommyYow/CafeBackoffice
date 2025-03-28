using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CafeBackoffice.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RenameEmployeeColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_t_employee_t_cafe_CafeId",
                table: "t_employee");

            migrationBuilder.RenameColumn(
                name: "CafeId",
                table: "t_employee",
                newName: "cafe_id");

            migrationBuilder.RenameIndex(
                name: "IX_t_employee_CafeId",
                table: "t_employee",
                newName: "IX_t_employee_cafe_id");

            migrationBuilder.AddForeignKey(
                name: "FK_t_employee_t_cafe_cafe_id",
                table: "t_employee",
                column: "cafe_id",
                principalTable: "t_cafe",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_t_employee_t_cafe_cafe_id",
                table: "t_employee");

            migrationBuilder.RenameColumn(
                name: "cafe_id",
                table: "t_employee",
                newName: "CafeId");

            migrationBuilder.RenameIndex(
                name: "IX_t_employee_cafe_id",
                table: "t_employee",
                newName: "IX_t_employee_CafeId");

            migrationBuilder.AddForeignKey(
                name: "FK_t_employee_t_cafe_CafeId",
                table: "t_employee",
                column: "CafeId",
                principalTable: "t_cafe",
                principalColumn: "id");
        }
    }
}
