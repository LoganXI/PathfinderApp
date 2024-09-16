using PathfinderCharacterAPI.Models;

namespace PathfinderCharacterAPI.Services
{
    public interface IUserService
    {
        User GetUserProfileByUsername(string username);
    }
}