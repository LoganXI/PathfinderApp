using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PathfinderApp.Server.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Utenti",
                columns: table => new
                {
                    UtenteId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Utenti", x => x.UtenteId);
                });

            migrationBuilder.CreateTable(
                name: "Personaggi",
                columns: table => new
                {
                    PersonaggioId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Classe = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Livello = table.Column<int>(type: "int", nullable: false),
                    Razza = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Allineamento = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PuntiFerita = table.Column<int>(type: "int", nullable: false),
                    PuntiFeritaMassimi = table.Column<int>(type: "int", nullable: false),
                    UtenteId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Personaggi", x => x.PersonaggioId);
                    table.ForeignKey(
                        name: "FK_Personaggi_Utenti_UtenteId",
                        column: x => x.UtenteId,
                        principalTable: "Utenti",
                        principalColumn: "UtenteId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Personaggi_UtenteId",
                table: "Personaggi",
                column: "UtenteId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Personaggi");

            migrationBuilder.DropTable(
                name: "Utenti");
        }
    }
}
