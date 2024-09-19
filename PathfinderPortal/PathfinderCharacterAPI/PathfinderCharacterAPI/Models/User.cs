using System.Text.Json.Serialization;

namespace PathfinderCharacterAPI.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }

        // Navigation property to link with characters
        [JsonIgnore]  // Prevent circular reference
        public ICollection<Character> Characters { get; set; }
    }
}
