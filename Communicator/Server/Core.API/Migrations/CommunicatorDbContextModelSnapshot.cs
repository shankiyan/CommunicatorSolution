// <auto-generated />
using System;
using Core.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Core.Infrastructure.Migrations
{
    [DbContext(typeof(CommunicatorDbContext))]
    partial class CommunicatorDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.8");

            modelBuilder.Entity("Core.Domain.Entities.Communication", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTimeOffset?>("DateSent")
                        .HasColumnType("datetimeoffset(0)");

                    b.Property<string>("From")
                        .HasColumnType("TEXT")
                        .HasMaxLength(256);

                    b.Property<string>("Message")
                        .HasColumnType("TEXT");

                    b.Property<string>("Subject")
                        .HasColumnType("TEXT")
                        .HasMaxLength(256);

                    b.Property<string>("To")
                        .HasColumnType("TEXT")
                        .HasMaxLength(1024);

                    b.HasKey("Id");

                    b.ToTable("Communications");
                });
#pragma warning restore 612, 618
        }
    }
}
