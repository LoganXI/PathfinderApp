using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PathfinderCharacterAPI.Data;
using PathfinderCharacterAPI.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;
using Microsoft.AspNetCore.Authorization;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly CharacterContext _context;
    private readonly IConfiguration _configuration;

    public AuthController(CharacterContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }


    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterUserDTO registerUser)
    {
        // Check if username already exists
        if (await _context.Users.AnyAsync(u => u.Username == registerUser.Username))
        {
            return BadRequest("Username already exists.");
        }

        // Create a new User object
        var user = new User
        {
            Username = registerUser.Username,
            Email = registerUser.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(registerUser.Password) // Hash the password
        };

        // Add the new user to the database
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok(new { message = "User registered successfully" });
    }



    // Login and generate JWT token
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel login)
    {
        // Find user by username
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == login.Username);
        if (user == null || !BCrypt.Net.BCrypt.Verify(login.Password, user.PasswordHash))
        {
            return Unauthorized("Invalid username or password.");
        }

        // Generate JWT token
        var tokenHandler = new JwtSecurityTokenHandler();
        var jwtSecret = _configuration.GetSection("Jwt:Secret").Value;
        if (string.IsNullOrEmpty(jwtSecret))
        {
            throw new InvalidOperationException("JWT secret is missing.");
        }
        var key = Convert.FromBase64String(_configuration["Jwt:Secret"]);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, user.Username) }),
            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        var tokenString = tokenHandler.WriteToken(token);

        return Ok(new { Token = tokenString });
    }



}
