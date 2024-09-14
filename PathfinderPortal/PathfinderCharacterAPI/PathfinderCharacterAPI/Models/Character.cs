namespace PathfinderCharacterAPI.Models
{
    public class Character
    {
        // Basic Information
        public int Id { get; set; }
        public string Name { get; set; }
        public string PlayerName { get; set; }
        public string Class { get; set; }
        public int Level { get; set; }
        public string Alignment { get; set; }
        public string Deity { get; set; }
        public int ExperiencePoints { get; set; }

        // Ability Scores
        public int Strength { get; set; }
        public int Dexterity { get; set; }
        public int Constitution { get; set; }
        public int Intelligence { get; set; }
        public int Wisdom { get; set; }
        public int Charisma { get; set; }

        // Combat Statistics
        public int Initiative { get; set; }
        public int ArmorClass { get; set; }
        public int TouchAC { get; set; }
        public int FlatFootedAC { get; set; }
        public int CMD { get; set; }
        public int CMB { get; set; }
        public int BaseAttackBonus { get; set; }

        // Saving Throws
        public int FortitudeSave { get; set; }
        public int ReflexSave { get; set; }
        public int WillSave { get; set; }

        // Weapons and Attacks (Simplified for now, can expand later)
        public string Weapons { get; set; }  // Comma-separated for simplicity, can expand later

        // Skills (Simplified for now, can expand later)
        public string Skills { get; set; }  // Comma-separated for simplicity

        // Special Abilities/Feats
        public string SpecialAbilities { get; set; }  // Comma-separated for simplicity

        public int UserId { get; set; } // Foreign key
        public User User { get; set; }  // Navigation property
    }
}
 