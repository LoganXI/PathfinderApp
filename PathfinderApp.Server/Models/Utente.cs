namespace PathfinderApp.Server.Models
{
    public class Utente
    {
        public int UtenteId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public ICollection<Personaggio> Personaggi { get; set; }
    }
}
