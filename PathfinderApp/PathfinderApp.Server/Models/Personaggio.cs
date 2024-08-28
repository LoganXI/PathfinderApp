namespace PathfinderApp.Server.Models
{
    public class Personaggio
    {
        public int PersonaggioId { get; set; }
        public string Nome { get; set; }
        public string Classe { get; set; }
        public int Livello { get; set; }
        public string Razza { get; set; }
        public string Allineamento { get; set; }
        public int PuntiFerita { get; set; }
        public int PuntiFeritaMassimi { get; set; }
        public int UtenteId { get; set; }
        public Utente Utente { get; set; }
    }
}
