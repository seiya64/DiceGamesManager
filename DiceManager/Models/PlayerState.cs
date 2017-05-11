using System.Collections.Generic;

namespace DiceManager.Models
{
    public class PlayerState 
    {
        public List<Dice> Unused { get; set; } // Bolsa
        public List<Dice> Active { get; set; } // Active pool
        public List<Dice> Ready { get; set; } // Minions
        public List<Dice> Used { get; set; } // Usados
    }
}