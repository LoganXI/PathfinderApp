using PathfinderCharacterAPI.Data;
using PathfinderCharacterAPI.Models;
using System.Linq;

namespace PathfinderCharacterAPI.Services
{
    public class UserService : IUserService
    {
        private readonly CharacterContext _context;

        public UserService(CharacterContext context)
        {
            _context = context;
        }

        public User GetUserProfileByUsername(string username)
        {
            return _context.Users
                .Where(u => u.Username == username)
                .FirstOrDefault();
        }

    }
}
