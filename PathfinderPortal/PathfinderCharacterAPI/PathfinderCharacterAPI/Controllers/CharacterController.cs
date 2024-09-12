using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace PathfinderCharacterAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CharacterController : Controller
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new { Message = "Character API is running!" });
        }

        [HttpGet("ping")]
        public IActionResult Ping()
        {
            return Ok("Pong");
        }

    }
}
