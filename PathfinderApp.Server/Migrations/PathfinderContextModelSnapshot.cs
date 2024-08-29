﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PathfinderApp.Data;

#nullable disable

namespace PathfinderApp.Server.Migrations
{
    [DbContext(typeof(PathfinderContext))]
    partial class PathfinderContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("PathfinderApp.Server.Models.Personaggio", b =>
                {
                    b.Property<int>("PersonaggioId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PersonaggioId"));

                    b.Property<string>("Allineamento")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Classe")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Livello")
                        .HasColumnType("int");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PuntiFerita")
                        .HasColumnType("int");

                    b.Property<int>("PuntiFeritaMassimi")
                        .HasColumnType("int");

                    b.Property<string>("Razza")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UtenteId")
                        .HasColumnType("int");

                    b.HasKey("PersonaggioId");

                    b.HasIndex("UtenteId");

                    b.ToTable("Personaggi");
                });

            modelBuilder.Entity("PathfinderApp.Server.Models.Utente", b =>
                {
                    b.Property<int>("UtenteId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UtenteId"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UtenteId");

                    b.ToTable("Utenti");
                });

            modelBuilder.Entity("PathfinderApp.Server.Models.Personaggio", b =>
                {
                    b.HasOne("PathfinderApp.Server.Models.Utente", "Utente")
                        .WithMany("Personaggi")
                        .HasForeignKey("UtenteId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Utente");
                });

            modelBuilder.Entity("PathfinderApp.Server.Models.Utente", b =>
                {
                    b.Navigation("Personaggi");
                });
#pragma warning restore 612, 618
        }
    }
}
