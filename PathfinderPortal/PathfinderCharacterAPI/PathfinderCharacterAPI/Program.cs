using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.EntityFrameworkCore;
using PathfinderCharacterAPI.Data;
using PathfinderCharacterAPI.Services;
using Microsoft.Extensions.Options;
using System.IdentityModel.Tokens.Jwt;

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
            builder.Services.AddControllers()
                .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
                options.JsonSerializerOptions.WriteIndented = true;
            });
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

            builder.Services.AddAuthentication(options => {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                }).AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero,
                        ValidateIssuerSigningKey = true,
                        //ValidIssuer = builder.Configuration["Jwt:Issuer"],
                        //ValidAudience = builder.Configuration["Jwt:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(key)
        
                    };
                    // Adding event handlers for logging authentication failure and success DA TOGLIERE SE NON VAA!!
                    options.Events = new JwtBearerEvents
                    {
                        OnAuthenticationFailed = context =>
                        {
                            // Get the token from the Authorization header
                            var token = context.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
                            Console.WriteLine("Authentication failed: " + context.Exception.Message);
                            Console.WriteLine("Received token: " + token);
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
