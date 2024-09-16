using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.EntityFrameworkCore;
using PathfinderCharacterAPI.Data;
using PathfinderCharacterAPI.Services;

namespace PathfinderCharacterAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Configure Kestrel to listen on a specific port
            builder.WebHost.ConfigureKestrel(serverOptions =>
            {
                serverOptions.ListenAnyIP(5000); // Change 5001 to your desired port number
            });

            // Add services to the container.
            builder.Services.AddControllers();
            builder.Services.AddSwaggerGen();

            // Configure EF Core to use SQL Server
            builder.Services.AddDbContext<CharacterContext>(options => 
            options.UseSqlServer(builder.Configuration.GetConnectionString("CharacterDatabase")));


            builder.Services.AddScoped<IUserService, UserService>();

            // CORS configuration
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAngular",
                    builder => builder.WithOrigins("http://localhost:4200")
                                      .AllowAnyHeader()
                                      .AllowAnyMethod()
                                      .AllowCredentials());
            });
            // JWT Configuration
            //var key = Encoding.ASCII.GetBytes("YourSecretKeyForJWTEncryption"); // Use a strong key here
            var key = Convert.FromBase64String(builder.Configuration["Jwt:Secret"]);

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),  // Base64-decoded key
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ClockSkew = TimeSpan.FromMinutes(5)
                    };
                    // Adding event handlers for logging authentication failure and success DA TOGLIERE SE NON VAA!!
                    options.Events = new JwtBearerEvents
                    {
                        OnAuthenticationFailed = context =>
                        {
                            Console.WriteLine("Authentication failed: " + context.Exception.Message);
                            return Task.CompletedTask;
                        },
                        OnTokenValidated = context =>
                        {
                            Console.WriteLine("Token validated successfully");
                            return Task.CompletedTask;
                        }
                    };
                });


            var app = builder.Build();

            // Create Database at startup if it doesn't exist
            using (var scope = app.Services.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<CharacterContext>();
                context.Database.EnsureCreated();
            }

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
                    c.RoutePrefix = string.Empty;
                });
            }

            app.UseCors("AllowAngular");
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.MapControllers();
            app.Run();
        }
    }
}
