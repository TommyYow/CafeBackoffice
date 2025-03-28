using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CafeBackoffice.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "t_cafe",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    description = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    location = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    is_deleted = table.Column<bool>(type: "boolean", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_t_cafe", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "t_employee",
                columns: table => new
                {
                    id = table.Column<string>(type: "character varying(9)", maxLength: 9, nullable: false),
                    name = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    email_address = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    phone_number = table.Column<string>(type: "character varying(8)", maxLength: 8, nullable: false),
                    gender = table.Column<int>(type: "integer", nullable: false),
                    CafeId = table.Column<Guid>(type: "uuid", nullable: true),
                    is_deleted = table.Column<bool>(type: "boolean", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_t_employee", x => x.id);
                    table.ForeignKey(
                        name: "FK_t_employee_t_cafe_CafeId",
                        column: x => x.CafeId,
                        principalTable: "t_cafe",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_t_employee_CafeId",
                table: "t_employee",
                column: "CafeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "t_employee");

            migrationBuilder.DropTable(
                name: "t_cafe");
        }
    }
}
