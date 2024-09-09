using Microsoft.AspNetCore.Mvc;

namespace PathfinderCharacterAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CharacterController : Controller
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new { Message = "Character API is running!" });
        }
    }
}
