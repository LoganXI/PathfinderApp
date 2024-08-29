
using PathfinderApp.Data;
using Microsoft.EntityFrameworkCore;



namespace PathfinderApp.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.


            builder.Services.AddDbContext<PathfinderContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            // Aggiungi il middleware per l'uso delle API
            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();  // Assicura che i controller API siano mappati
            });


            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
