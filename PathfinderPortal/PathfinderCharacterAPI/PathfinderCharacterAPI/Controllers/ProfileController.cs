using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PathfinderCharacterAPI.Models;
using PathfinderCharacterAPI.Services;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ProfileController : ControllerBase
{
    private readonly IUserService _userService;

    public ProfileController(IUserService userService)
    {
        _userService = userService;
    }
    [HttpGet]
    public IActionResult GetProfile()
    {
        var username = User.Identity.Name;
        var userProfile = _userService.GetUserProfileByUsername(username);

        if (userProfile == null)
        {
            return NotFound("Profile not found.");
        }

        return Ok(userProfile);
    }

}
